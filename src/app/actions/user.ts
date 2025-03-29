"use server";

import { cache } from 'react';
import { cookies } from 'next/headers';
import { AUTH_COOKIES } from '@/constants/auth';
import { UserResponse } from '@/types/user';

// Sử dụng cache để tránh gọi lại API nhiều lần
export const getProfile = cache(async (): Promise<UserResponse> => {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIES.ACCESS_TOKEN);

  if (!token) {
    throw new Error('No access token found');
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile`, {
    headers: {
      'Authorization': `Bearer ${token.value}`,
      'Content-Type': 'application/json',
    },
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message || 'Failed to fetch profile');
  }

  return json;
});

export type ProfileFormData = {
  name: string;
  bio: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
};

export async function saveProfile(formData: ProfileFormData): Promise<{ success: boolean; message: string }> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIES.ACCESS_TOKEN);

    if (!token) {
      throw new Error('No access token found');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message || 'Failed to update profile');
    }

    return {
      success: true,
      message: 'Profile updated successfully',
    };
  } catch (error) {
    console.error('Error saving profile:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
}

export const getExpertProfile = cache(async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIES.ACCESS_TOKEN);

  if (!token) {
    throw new Error('No access token found');
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/experts/profile`, {
    headers: {
      'Authorization': `Bearer ${token.value}`,
      'Content-Type': 'application/json',
    },
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message || 'Failed to fetch expert profile');
  }

  return json;
});

export type ExpertProfileFormData = {
  title: string;
  about: string;
  location: string;
  experience: number;
  google_meet_link: string;
  specialties: string[];
  availability_status: string;
};

export async function saveExpertProfile(formData: ExpertProfileFormData): Promise<{ success: boolean; message: string }> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIES.ACCESS_TOKEN);

    if (!token) {
      throw new Error('No access token found');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/experts/profile`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message || 'Failed to update expert profile');
    }

    return {
      success: true,
      message: 'Expert profile updated successfully',
    };
  } catch (error) {
    console.error('Error saving expert profile:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
} 