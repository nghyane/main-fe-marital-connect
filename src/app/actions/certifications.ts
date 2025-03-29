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
