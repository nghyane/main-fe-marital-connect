import { cookies } from 'next/headers';
import { AUTH_COOKIES } from '@/constants/auth';
import { AppError } from '@/utils/error-handler';

type FetchOptions = {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    body?: Record<string, unknown>;
    cache?: RequestCache;
    tags?: string[];
    auth?: boolean;
};

export const api = {
    async fetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };

        if (options.auth) {
            const cookieStore = await cookies();
            const token = cookieStore.get(AUTH_COOKIES.ACCESS_TOKEN);
            if (!token) {
                throw new AppError('Unauthorized', 'AUTH_REQUIRED', 401);
            }

            headers.Authorization = `Bearer ${token.value}`;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
                method: options.method || 'GET',
                headers,
                body: options.body ? JSON.stringify(options.body) : undefined,
                cache: options.cache,
                next: options.tags ? { tags: options.tags } : undefined,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new AppError(
                    data.message || 'An error occurred',
                    data.code || 'UNKNOWN_ERROR',
                    response.status
                );
            }

            return data;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            
            throw new AppError(
                'Failed to fetch data',
                'FETCH_ERROR',
                500
            );
        }
    }
}; 