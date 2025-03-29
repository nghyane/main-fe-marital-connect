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

export interface Client {
  id: number;
  name: string;
  email: string;
  profile_image?: string;
}

export interface ExpertAppointment extends Appointment {
  client: Client;
}

export interface AppointmentsResponse {
  success: boolean;
  data: Appointment[];
  error?: string;
}

export interface ExpertAppointmentsResponse {
  success: boolean;
  data: ExpertAppointment[];
  error?: string;
}

export interface CancelAppointmentResponse {
  success: boolean;
  error?: string;
}

export interface UpdateStatusResponse {
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

export async function getExpertAppointments(): Promise<ExpertAppointmentsResponse> {
  try {
    const data = await api.fetch<any>('/appointments/expert', {
      auth: true,
      cache: 'no-store'
    });

    // Transform the API response to match our interface
    if (data.success && Array.isArray(data.data)) {
      const transformedData: ExpertAppointment[] = data.data.map((appointment: any) => {
        return {
          ...appointment,
          // Map the user field to client field for consistency with our interface
          client: {
            id: appointment.user.id,
            name: appointment.user.name,
            email: appointment.user.email,
            profile_image: appointment.user.profile_image || `https://api.dicebear.com/7.x/lorelei/svg?seed=${appointment.user.name}`
          },
          // Keep original field for compatibility
          user_id: appointment.user_id
        };
      });

      return {
        success: true,
        data: transformedData
      };
    }
    
    return data as ExpertAppointmentsResponse;
  } catch (error) {
    console.error('Error fetching expert appointments:', error);
    
    // For development purposes, return mock data if API fails
    // This should be removed in production
    const mockAppointments: ExpertAppointment[] = [
      {
        id: 101,
        user_id: 201,
        expert_id: 1,
        service_id: 1,
        expert: {
          id: 1,
          user_id: 1,
          title: "Relationship Counselor",
          about: "Experienced relationship expert",
          experience: 5,
          location: "Ho Chi Minh City",
          availability_status: "online",
          specialties: ["Couples Therapy", "Marriage Counseling"],
          google_meet_link: "https://meet.google.com/abc-defg-hij"
        },
        service: {
          id: 1,
          expert_id: 1,
          name: "Relationship Assessment",
          description: "Initial assessment session",
          duration: "60",
          price: 500000,
          created_at: "2023-12-15T09:00:00Z",
          updated_at: "2023-12-15T09:00:00Z"
        },
        client: {
          id: 201,
          name: "Nguyen Van A",
          email: "nguyenvana@example.com",
          profile_image: "https://api.dicebear.com/7.x/lorelei/svg?seed=Nguyen"
        },
        scheduled_time: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 days from now
        end_time: new Date(Date.now() + 86400000 * 2 + 3600000).toISOString(), // 2 days + 1 hour from now
        status: "confirmed",
        notes: "First session to discuss relationship issues",
        created_at: "2023-12-18T10:00:00Z",
        updated_at: "2023-12-18T10:00:00Z"
      },
      {
        id: 102,
        user_id: 202,
        expert_id: 1,
        service_id: 2,
        expert: {
          id: 1,
          user_id: 1,
          title: "Relationship Counselor",
          about: "Experienced relationship expert",
          experience: 5,
          location: "Ho Chi Minh City",
          availability_status: "online",
          specialties: ["Couples Therapy", "Marriage Counseling"],
          google_meet_link: "https://meet.google.com/abc-defg-hij"
        },
        service: {
          id: 2,
          expert_id: 1,
          name: "Marriage Counseling",
          description: "Counseling session for married couples",
          duration: "90",
          price: 750000,
          created_at: "2023-12-15T09:00:00Z",
          updated_at: "2023-12-15T09:00:00Z"
        },
        client: {
          id: 202,
          name: "Tran Thi B",
          email: "tranthib@example.com",
          profile_image: "https://api.dicebear.com/7.x/lorelei/svg?seed=Tran"
        },
        scheduled_time: new Date(Date.now() + 86400000).toISOString(), // 1 day from now
        end_time: new Date(Date.now() + 86400000 + 5400000).toISOString(), // 1 day + 1.5 hours from now
        status: "scheduled",
        notes: "Needs help with communication in marriage",
        created_at: "2023-12-19T11:00:00Z",
        updated_at: "2023-12-19T11:00:00Z"
      },
      {
        id: 103,
        user_id: 203,
        expert_id: 1,
        service_id: 1,
        expert: {
          id: 1,
          user_id: 1,
          title: "Relationship Counselor",
          about: "Experienced relationship expert",
          experience: 5,
          location: "Ho Chi Minh City",
          availability_status: "online",
          specialties: ["Couples Therapy", "Marriage Counseling"],
          google_meet_link: "https://meet.google.com/abc-defg-hij"
        },
        service: {
          id: 1,
          expert_id: 1,
          name: "Relationship Assessment",
          description: "Initial assessment session",
          duration: "60",
          price: 500000,
          created_at: "2023-12-15T09:00:00Z",
          updated_at: "2023-12-15T09:00:00Z"
        },
        client: {
          id: 203,
          name: "Le Van C",
          email: "levanc@example.com",
          profile_image: "https://api.dicebear.com/7.x/lorelei/svg?seed=Le"
        },
        scheduled_time: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
        end_time: new Date(Date.now() - 86400000 * 2 + 3600000).toISOString(), // 2 days ago + 1 hour
        status: "completed",
        notes: "First session completed successfully",
        created_at: "2023-12-16T14:00:00Z",
        updated_at: "2023-12-16T14:00:00Z"
      },
      {
        id: 104,
        user_id: 204,
        expert_id: 1,
        service_id: 2,
        expert: {
          id: 1,
          user_id: 1,
          title: "Relationship Counselor",
          about: "Experienced relationship expert",
          experience: 5,
          location: "Ho Chi Minh City",
          availability_status: "online",
          specialties: ["Couples Therapy", "Marriage Counseling"],
          google_meet_link: "https://meet.google.com/abc-defg-hij"
        },
        service: {
          id: 2,
          expert_id: 1,
          name: "Marriage Counseling",
          description: "Counseling session for married couples",
          duration: "90",
          price: 750000,
          created_at: "2023-12-15T09:00:00Z",
          updated_at: "2023-12-15T09:00:00Z"
        },
        client: {
          id: 204,
          name: "Pham Thi D",
          email: "phamthid@example.com",
          profile_image: "https://api.dicebear.com/7.x/lorelei/svg?seed=Pham"
        },
        scheduled_time: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        end_time: new Date(Date.now() - 86400000 + 5400000).toISOString(), // 1 day ago + 1.5 hours
        status: "canceled",
        notes: "Client canceled due to scheduling conflict",
        created_at: "2023-12-17T16:00:00Z",
        updated_at: "2023-12-17T16:00:00Z"
      }
    ];

    return {
      success: true,
      data: mockAppointments
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

export async function confirmAppointment(appointmentId: number): Promise<UpdateStatusResponse> {
  try {
    const data = await api.fetch<UpdateStatusResponse>(`/appointments/${appointmentId}/status`, {
      method: 'PATCH',
      body: { status: "confirmed" },
      auth: true,
      cache: 'no-store'
    });
    return data;
  } catch (error) {
    console.error('Error confirming appointment:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    };
  }
}

export async function completeAppointment(appointmentId: number): Promise<UpdateStatusResponse> {
  try {
    const data = await api.fetch<UpdateStatusResponse>(`/appointments/${appointmentId}/status`, {
      method: 'PATCH',
      body: { status: "completed" },
      auth: true,
      cache: 'no-store'
    });
    return data;
  } catch (error) {
    console.error('Error completing appointment:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    };
  }
} 