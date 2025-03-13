import { cache } from 'react';
import { api } from '@/lib/api-client';
import { ExpertResponse } from './type';

/**
 * Hàm được cache để lấy dữ liệu expert theo ID
 * Sử dụng React cache để tránh các API calls trùng lặp trong cùng một request
 */
export const getExpertById = cache(async (id: string) => {
  try {
    const response = await api.fetch<ExpertResponse>(`/experts/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching expert data:', error);
    throw new Error('Failed to fetch expert data');
  }
}); 