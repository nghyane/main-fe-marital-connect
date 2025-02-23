"use server";

import { cookies } from 'next/headers';
import { AUTH_COOKIES } from '@/constants/auth';
import { UserResponse } from '@/types/user';

export async function getProfile(): Promise<UserResponse> {
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
} 