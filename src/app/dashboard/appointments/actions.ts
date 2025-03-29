"use server"

import { api } from '@/lib/api-client';

export interface Expert {
  id: number;
  user_id: number;
  title: string;
  about: string;
  experience: number;
  location: string;
  availability_status: "online" | "offline";
  specialties: string[];
  google_meet_link: string;
}

export interface Service {
  id: number;
  expert_id: number;
  name: string;
  description: string;
  duration: string;
  price: number;
  created_at: string;
  updated_at: string;
}

export interface Appointment {
  id: number;
  user_id: number;
  expert_id: number;
  service_id: number;
  expert: Expert;
  service: Service;
  scheduled_time: string;
  end_time: string;
  status: "pending" | "scheduled" | "completed" | "canceled" | "confirmed";
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface AppointmentsResponse {
  success: boolean;
  data: Appointment[];
  error?: string;
}

export interface CancelAppointmentResponse {
  success: boolean;
  error?: string;
}

export async function getUserAppointments(): Promise<AppointmentsResponse> {
  try {
    const data = await api.fetch<AppointmentsResponse>('/appointments/user', {
      auth: true,
      cache: 'no-store'
    });
    return data;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return {
      success: false,
      data: [],
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    };
  }
}

export async function cancelAppointment(appointmentId: number): Promise<CancelAppointmentResponse> {
  try {
    const data = await api.fetch<CancelAppointmentResponse>(`/appointments/${appointmentId}/cancel`, {
      method: 'POST',
      auth: true,
      cache: 'no-store'
    });
    return data;
  } catch (error) {
    console.error('Error canceling appointment:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    };
  }
} 