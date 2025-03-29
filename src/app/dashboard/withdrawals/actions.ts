"use server"

import { api } from '@/lib/api-client';
import { revalidatePath } from 'next/cache';

export interface ExpertBalance {
  success: boolean;
  message: string;
  data: {
    balance: number;
    pendingWithdrawals: number;
    available: number;
    currency: string;
  };
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
  bank_account: {
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
 * Get the current expert's balance
 * Temporarily using mock data until API endpoint is available
 */
export async function getExpertBalance(): Promise<ExpertBalance['data']> {
  // Mock data since endpoint doesn't exist yet
  // In a real application, this would be an API call
  return {
    balance: 325000, // $3,250.00
    pendingWithdrawals: 75000, // $750.00
    available: 250000, // $2,500.00
    currency: 'USD'
  };
  
  // Original implementation - keep for when API is ready
  /*
  try {
    const response = await api.fetch<ExpertBalance>('/expert/balance', {
      auth: true,
      cache: 'no-store'
    });

    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch balance');
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching expert balance:', error);
    return {
      balance: 0,
      pendingWithdrawals: 0,
      available: 0,
      currency: 'USD'
    };
  }
  */
}

/**
 * Get withdrawal history for the expert
 * Temporarily using mock data until API endpoint is available
 */
export async function getWithdrawalHistory(): Promise<WithdrawalDataForUI[]> {
  // Mock data since endpoint doesn't exist yet
  const mockWithdrawals = [
    {
      id: 1,
      amount: 150000, // $1,500.00
      status: 'completed' as const,
      created_at: '2024-02-15T10:30:00Z',
      completed_at: '2024-02-17T14:20:00Z',
      bank_account: {
        bank_name: 'VietCombank',
        account_number: '1234567890123',
        account_name: 'Nguyen Van A'
      }
    },
    {
      id: 2,
      amount: 75000, // $750.00
      status: 'pending' as const,
      created_at: '2024-03-10T08:45:00Z',
      bank_account: {
        bank_name: 'TPBank',
        account_number: '9876543210987',
        account_name: 'Nguyen Van A'
      }
    }
  ];

  // Map mock data to UI format
  return mockWithdrawals.map(withdrawal => {
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
    
    return {
      id: `WD-${withdrawal.id}`,
      amount: (withdrawal.amount / 100).toFixed(2),
      status: withdrawal.status,
      requestDate: formattedRequestDate,
      completedDate: formattedCompletedDate,
      bankName: withdrawal.bank_account.bank_name,
      accountNumber: withdrawal.bank_account.account_number,
      accountName: withdrawal.bank_account.account_name
    };
  });
  
  // Original implementation - keep for when API is ready
  /*
  try {
    const response = await api.fetch<WithdrawalHistory>('/expert/withdrawals', {
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
      
      return {
        id: `WD-${withdrawal.id}`,
        amount: (withdrawal.amount / 100).toFixed(2),
        status: withdrawal.status,
        requestDate: formattedRequestDate,
        completedDate: formattedCompletedDate,
        bankName: withdrawal.bank_account.bank_name,
        accountNumber: withdrawal.bank_account.account_number,
        accountName: withdrawal.bank_account.account_name
      };
    });
  } catch (error) {
    console.error('Error fetching withdrawal history:', error);
    return [];
  }
  */
}

/**
 * Submit a withdrawal request
 * Currently using mock implementation until API endpoint is available
 */
export async function requestWithdrawal(formData: FormData) {
  try {
    const amount = parseFloat(formData.get('amount') as string) * 100; // Convert to cents
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
    
    // Mock implementation - simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Withdrawal request submitted:', {
      amount,
      bank_account: {
        bank_name: bankName,
        account_number: accountNumber,
        account_name: accountName
      }
    });
    
    revalidatePath('/dashboard/withdrawals');
    
    return {
      success: true,
      message: 'Withdrawal request submitted successfully'
    };
    
    // Original implementation - keep for when API is ready
    /*
    const response = await api.fetch('/expert/withdrawals/request', {
      method: 'POST',
      body: {
        amount,
        bank_account: {
          bank_name: bankName,
          account_number: accountNumber,
          account_name: accountName
        }
      },
      auth: true
    });

    return response;
    */
  } catch (error) {
    console.error('Error requesting withdrawal:', error);
    throw error;
  }
} 