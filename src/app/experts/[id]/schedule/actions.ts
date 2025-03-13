'use server';

import { api } from '@/lib/api-client';

interface TimeSlot {
  start_time: string;
  end_time: string;
  duration: number;
  is_available: boolean;
}

interface AvailabilityResponse {
  success: boolean;
  data: {
    date: string;
    time_slots: TimeSlot[];
  };
  error?: string;
}

/**
 * Server action to fetch available time slots for a specific expert, date, and service
 */
export async function getAvailableTimeSlots(
  expertId: string,
  date: string,
  serviceId: string
): Promise<AvailabilityResponse> {
  try {
    // Use the api client utility to fetch data
    const endpoint = `/appointments/availability?expert_id=${expertId}&date=${date}&service_id=${serviceId}`;
    
    const data = await api.fetch<AvailabilityResponse>(endpoint, {
      method: 'GET',
      auth: true, // No authentication required for availability
      cache: 'no-store' // Ensure fresh data
    });
    
    return data;
  } catch (error) {
    console.error('Error fetching time slots:', error);
    return {
      success: false,
      data: { date, time_slots: [] },
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    };
  }
} 

interface CreateAppointmentPayload {
  expert_id: number;
  service_id: number;
  scheduled_time: string;
  end_time: string;
  notes?: string;
}

interface CreateAppointmentResponse {
  success: boolean;
  data?: {
    id: number;
    expert_id: number;
    user_id: number;
    service_id: number;
    scheduled_time: string;
    end_time: string;
    status: string;
    created_at: string;
    updated_at: string;
  };
  error?: string;
}

/**
 * Server action to create a new appointment
 */
export async function createAppointment(
  payload: CreateAppointmentPayload
): Promise<CreateAppointmentResponse> {
  try {
    const endpoint = '/appointments';
    
    // Convert payload to a plain object that satisfies Record<string, unknown>
    const requestBody = {
      expert_id: payload.expert_id,
      service_id: payload.service_id,
      scheduled_time: payload.scheduled_time,
      end_time: payload.end_time,
      notes: payload.notes || ''
    };
    
    const data = await api.fetch<CreateAppointmentResponse>(endpoint, {
      method: 'POST',
      body: requestBody,
      auth: true, // Authentication required for creating appointments
      cache: 'no-store'
    });
    
    return data;
  } catch (error) {
    console.error('Error creating appointment:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    };
  }
}

interface CreatePaymentPayload {
  appointmentId: number;
  returnUrl: string;
  cancelUrl: string;
  description: string;
}

interface CreatePaymentResponse {
  success: boolean;
  message: string;
  data: {
    checkoutUrl: string;
    paymentId: number;
  };
  error?: string;
}

/**
 * Server action to create a payment for an appointment
 */
export async function createPayment(
  payload: CreatePaymentPayload
): Promise<CreatePaymentResponse> {
  try {
    const endpoint = '/payments/create';
    
    // Convert payload to a plain object that satisfies Record<string, unknown>
    const requestBody = {
      appointmentId: payload.appointmentId,
      description: payload.description,
      returnUrl: payload.returnUrl,
      cancelUrl: payload.cancelUrl
    };
    
    const data = await api.fetch<CreatePaymentResponse>(endpoint, {
      method: 'POST',
      body: requestBody,
      auth: true, // Authentication required for creating payments
      cache: 'no-store'
    });
    
    return data;
  } catch (error) {
    console.error('Error creating payment:', error);
    return {
      success: false,
      message: 'Failed to create payment',
      data: { checkoutUrl: '', paymentId: 0 },
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    };
  }
} 

