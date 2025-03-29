"use server"

import { api } from '@/lib/api-client';
import { revalidatePath } from 'next/cache';

/**
 * Format returned by the API
 */
export interface ExpertBalance {
  success: boolean;
  message: string;
  data: {
    totalBalance: number;
    pendingWithdrawals: number;
    availableForWithdrawal: number;
  };
}

/**
 * Format expected by components
 */
export interface ExpertBalanceData {
  balance: number;
  pendingWithdrawals: number;
  available: number;
  currency: string;
}

export interface WithdrawalHistory {
  success: boolean;
  message: string;
  data: {
    withdrawals: Withdrawal[];
  };
}

export interface Withdrawal {
  id: number;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
  completed_at?: string;
  // The API might return these fields directly rather than nested
  bank_name?: string;
  bank_account?: string;
  account_holder?: string;
  // Or it might return them nested
  bank_account_details?: {
    bank_name: string;
    account_number: string;
    account_name: string;
  };
}

export interface WithdrawalDataForUI {
  id: string;
  amount: string;
  status: 'pending' | 'completed' | 'failed';
  requestDate: string;
  completedDate?: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
}

/**
 * API response for withdrawal request
 */
export interface WithdrawalRequestResponse {
  success: boolean;
  message: string;
  data?: any;
}

/**
 * Get the current expert's balance
 */
export async function getExpertBalance(): Promise<ExpertBalanceData> {
  try {
    const response = await api.fetch<ExpertBalance>('/experts/financial', {
      auth: true,
      cache: 'no-store'
    });

    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch balance');
    }

    // Map the API response to the format expected by components
    return {
      balance: response.data.totalBalance, 
      pendingWithdrawals: response.data.pendingWithdrawals,
      available: response.data.availableForWithdrawal,
      currency: 'USD'
    };
  } catch (error) {
    console.error('Error fetching expert balance:', error);
    return {
      balance: 0,
      pendingWithdrawals: 0,
      available: 0,
      currency: 'USD'
    };
  }
}

/**
 * Get withdrawal history for the expert
 */
export async function getWithdrawalHistory(): Promise<WithdrawalDataForUI[]> {
  try {
    const response = await api.fetch<WithdrawalHistory>('/experts/withdrawals', {
      auth: true,
      cache: 'no-store'
    });

    if (!response.success || !response.data.withdrawals) {
      return [];
    }

    // Map the API response to the format expected by the UI
    return response.data.withdrawals.map(withdrawal => {
      // Format date string
      const requestDate = new Date(withdrawal.created_at);
      const formattedRequestDate = requestDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });

      let formattedCompletedDate = undefined;
      if (withdrawal.completed_at) {
        const completedDate = new Date(withdrawal.completed_at);
        formattedCompletedDate = completedDate.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });
      }

      // Based on the curl response, the API returns a flat structure
      // with account_holder, bank_account, and bank_name directly on the withdrawal object
      return {
        id: `WD-${withdrawal.id}`,
        amount: (withdrawal.amount).toFixed(2),
        status: withdrawal.status,
        requestDate: formattedRequestDate,
        completedDate: formattedCompletedDate,
        bankName: withdrawal.bank_name || '',
        accountNumber: withdrawal.bank_account || '',
        accountName: withdrawal.account_holder || ''
      };
    });
  } catch (error) {
    console.error('Error fetching withdrawal history:', error);
    return [];
  }
}

/**
 * Submit a withdrawal request
 */
export async function requestWithdrawal(formData: FormData) {
  try {
    const amount = parseFloat(formData.get('amount') as string); // Don't convert to cents anymore
    const bankName = formData.get('bankName') as string;
    const accountNumber = formData.get('accountNumber') as string;
    const accountName = formData.get('accountName') as string;

    // Validate inputs
    if (isNaN(amount) || amount <= 0) {
      throw new Error('Please enter a valid amount');
    }

    if (!bankName || !accountNumber || !accountName) {
      throw new Error('Please provide all bank account details');
    }
    
    const response = await api.fetch<WithdrawalRequestResponse>('/experts/withdrawals', {
      method: 'POST',
      auth: true,
      body: {
        amount,
        bank_account: accountNumber,
        bank_name: bankName,
        account_holder: accountName,
        notes: "" // Optional notes field
      }
    });

    if (!response.success) {
      throw new Error(response.message || 'Failed to submit withdrawal request');
    }
    
    revalidatePath('/dashboard/withdrawals');
    
    return {
      success: true,
      message: 'Withdrawal request submitted successfully'
    };
  } catch (error: any) {
    console.error('Error submitting withdrawal request:', error);
    throw new Error(error.message || 'Failed to submit withdrawal request');
  }
} 