"use server";

import { cookies } from 'next/headers';
import { AUTH_COOKIES } from '@/constants/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function uploadCertification(formData: FormData): Promise<{ success: boolean; message: string; data?: any }> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIES.ACCESS_TOKEN);

    if (!token) {
      throw new Error('No access token found');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/experts/certifications/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token.value}`,
      },
      body: formData,
    });

    const json = await response.json();
    
    if (!response.ok) {
      throw new Error(json.message || 'Failed to upload certification');
    }

    // Revalidate the certifications page
    revalidatePath('/dashboard/certifications');
    
    return {
      success: true,
      message: 'Certification uploaded successfully',
      data: json.data,
    };
  } catch (error) {
    console.error('Error uploading certification:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
}


export async function requestCertificationVerification(): Promise<{ success: boolean; message: string }> {
  // simulate a delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  return {
    success: true,
    message: 'Verification request submitted successfully',
  };
}

export async function deleteCertification(certificationId: number): Promise<{ success: boolean; message: string }> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIES.ACCESS_TOKEN);

    if (!token) {
      throw new Error('No access token found');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/experts/certifications/${certificationId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();
    
    if (!response.ok) {
      throw new Error(json.message || 'Failed to delete certification');
    }

    // Revalidate the certifications page
    revalidatePath('/dashboard/certifications');
    
    return {
      success: true,
      message: 'Certification deleted successfully',
    };
  } catch (error) {
    console.error('Error deleting certification:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
}

export interface UpdateCertificationData {
  name: string;
  issuer: string;
  year: string;
  expiry_date: string;
}

export async function updateCertification(
  certificationId: number, 
  data: UpdateCertificationData
): Promise<{ success: boolean; message: string; data?: any }> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIES.ACCESS_TOKEN);

    if (!token) {
      throw new Error('No access token found');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/experts/certifications/${certificationId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();
    
    if (!response.ok) {
      throw new Error(json.message || 'Failed to update certification');
    }

    // Revalidate the certifications page
    revalidatePath('/dashboard/certifications');
    
    return {
      success: true,
      message: 'Certification updated successfully',
      data: json.data,
    };
  } catch (error) {
    console.error('Error updating certification:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
}
