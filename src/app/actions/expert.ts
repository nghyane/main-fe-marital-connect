"use server";

import { cookies } from 'next/headers';
import { cache } from 'react';
import { AUTH_COOKIES } from '@/constants/auth';
import { Expert } from '@/types/expert';

interface ExpertProfileResponse {
  success: boolean;
  message: string;
  data: Expert;
}

export const getExpertProfile = cache(async (): Promise<ExpertProfileResponse> => {
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