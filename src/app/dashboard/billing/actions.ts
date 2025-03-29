"use server"

import { api } from '@/lib/api-client';

export interface PaymentHistory {
  success: boolean;
  message: string;
  data: {
    payments: Payment[];
  };
}

export interface Payment {
  id: number;
  amount: number;
  appointment_id: number;
  created_at: string;
  expertName: string;
  serviceName: string;
  payment_method: string;
  status: 'paid' | 'pending' | 'refunded';
}

export interface TransactionDataForUI {
  id: string;
  description: string;
  date: string;
  amount: string;
  type: 'debit' | 'credit';
  status: string;
  paymentMethod: string;
  category: string;
  expertName?: string;
}

export async function getPaymentHistory(): Promise<TransactionDataForUI[]> {
  try {
    const response = await api.fetch<PaymentHistory>('/payments/history', {
      auth: true,
      cache: 'no-store'
    });

    if (!response.success || !response.data.payments) {
      return [];
    }

    // Map the API response to the format expected by the UI
    return response.data.payments.map(payment => {
      // Format date string
      const date = new Date(payment.created_at);
      const formattedDate = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });

      // Determine if this is a credit (refund) or debit (payment)
      const isRefund = payment.status === 'refunded';
      
      return {
        id: `TX-${payment.id}`,
        description: payment.serviceName,
        date: formattedDate,
        amount: (payment.amount).toFixed(2), 
        type: isRefund ? 'credit' : 'debit',
        status: payment.status,
        paymentMethod: formatPaymentMethod(payment.payment_method),
        category: getCategoryFromService(payment.serviceName),
        expertName: payment.expertName
      };
    });
  } catch (error) {
    console.error('Error fetching payment history:', error);
    return [];
  }
}

// Helper function to format payment method strings
function formatPaymentMethod(method: string): string {
  switch (method.toLowerCase()) {
    case 'payos':
      return 'PayOS';
    case 'stripe':
      return 'Credit Card';
    case 'paypal':
      return 'PayPal';
    default:
      return method;
  }
}

// Helper function to determine category based on service name
function getCategoryFromService(serviceName: string): string {
  const lowerName = serviceName.toLowerCase();
  if (lowerName.includes('therapy') || lowerName.includes('counseling') || lowerName.includes('session')) {
    return 'session';
  }
  if (lowerName.includes('consult')) {
    return 'consultation';
  }
  if (lowerName.includes('package')) {
    return 'package';
  }
  if (lowerName.includes('membership') || lowerName.includes('subscription')) {
    return 'subscription';
  }
  return 'other';
} 