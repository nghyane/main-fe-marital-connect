"use server";

import { AUTH_COOKIES } from "@/constants/auth";
import { LoginRequest, RegisterRequest } from "@/types/auth";

import { cookies } from 'next/headers';
import { validateEmail, validateName, validatePassword } from '@/utils/validation';


export async function logout() {    
    const cookieStore = await cookies();

    cookieStore.delete(AUTH_COOKIES.ACCESS_TOKEN);
    cookieStore.delete(AUTH_COOKIES.REFRESH_TOKEN);

    return {
        message: 'Logged out successfully'
    };
}

export async function login(credentials: LoginRequest) {
    const cookieStore = await cookies();
    const existingAccessToken = cookieStore.get(AUTH_COOKIES.ACCESS_TOKEN);
    
    if (existingAccessToken) {
        throw new Error('You are already logged in');
    }

    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    })
    
    const json = await response.json();

    if (!json.data) {
        throw new Error(json.message);
    }

    cookieStore.set(AUTH_COOKIES.ACCESS_TOKEN, json.data.accessToken);
    cookieStore.set(AUTH_COOKIES.REFRESH_TOKEN, json.data.refreshToken);
   
    return json;
}

export async function register(credentials: RegisterRequest) {
    const cookieStore = await cookies();
    const existingAccessToken = cookieStore.get(AUTH_COOKIES.ACCESS_TOKEN);
    
    if (existingAccessToken) {
        throw new Error('You are already logged in');
    }

    // Validate credentials
    const emailValidation = validateEmail(credentials.email);
    if (!emailValidation.isValid) {
        throw new Error(emailValidation.error);
    }

    const passwordValidation = validatePassword(credentials.password);
    if (!passwordValidation.isValid) {
        throw new Error(passwordValidation.error);
    }

    const nameValidation = validateName(credentials.name);
    if (!nameValidation.isValid) {
        throw new Error(nameValidation.error);
    }

    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/register', {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(credentials),
    })

    const json = await response.json()

    if (!json.data) {
        throw new Error(json.message);
    }

    cookieStore.set(AUTH_COOKIES.ACCESS_TOKEN, json.data.accessToken);
    cookieStore.set(AUTH_COOKIES.REFRESH_TOKEN, json.data.refreshToken);

    return json;
}

export async function refreshToken() {
    try {
        const cookieStore = await cookies();
        const refreshToken = cookieStore.get(AUTH_COOKIES.REFRESH_TOKEN)?.value;

        if (!refreshToken) {
            throw new Error('No refresh token found');
        }

        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/refresh-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ refreshToken }),
        });

        const json = await response.json();

        // Log the response for debugging
        console.log('Refresh token response:', json);

        // Check if the response is successful and has the expected data
        if (!response.ok || !json.data) {
            throw new Error(json.message || 'Failed to refresh token');
        }


        if (json.data.accessToken) {
            cookieStore.set(AUTH_COOKIES.ACCESS_TOKEN, json.data.accessToken);
        }
        if (json.data.refreshToken) {
            cookieStore.set(AUTH_COOKIES.REFRESH_TOKEN, json.data.refreshToken);
        }

        return json;
    } catch (error) {
        console.error('Error refreshing token:', error);
        throw error;
    }
}


