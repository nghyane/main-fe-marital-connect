"use client";

import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { LoginRequest, RegisterRequest } from '@/types/auth';
import { login, logout, register, refreshToken } from '@/app/actions/auth';
import { ROUTES } from '@/constants/routes';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';


interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;
  setIsAuthenticated: (value: boolean) => void;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
  register: (credentials: RegisterRequest) => Promise<void>;
  refreshToken: (token: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function to handle errors consistently
const handleAuthError = (err: unknown): string => {
  if (err instanceof Error) {
    return err.message;
  }
  return 'An unexpected error occurred';
};

export function AuthProvider({ 
  children, 
  token 
}: { 
  children: ReactNode;
  token: RequestCookie | undefined;
}) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();


  useEffect(() => {
    const initializeAuth = async () => {
      if (token?.value) {
        try {
          setIsAuthenticated(true);
          // await refreshToken();
        } catch (err) {
          setIsAuthenticated(false);
        }
      }
      setIsInitialized(true);
    };

    initializeAuth();
  }, [token]);

  // Memoized error handler
  const handleError = useCallback((err: unknown, defaultMessage: string) => {
    const errorMessage = handleAuthError(err);
    setError(errorMessage);
    toast.error(errorMessage, {
      duration: 3000,
    });
  }, []);

  // Memoized async operation wrapper
  const withAsyncOperation = useCallback(async <T,>(
    operation: () => Promise<T>,
    errorMessage: string
  ): Promise<T | void> => {
    try {
      setIsLoading(true);
      setError(null);
      return await operation();
    } catch (err) {
      handleError(err, errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [handleError]);

  const handleLogin = useCallback(async (credentials: LoginRequest) => {
    const result = await withAsyncOperation(async () => {
      await login(credentials);
      toast.success('Successfully logged in!', {
        duration: 3000,
      });
      
      setIsAuthenticated(true);

      router.push(ROUTES.HOME);
    }, 'An error occurred during login');
    
    return result;
  }, [withAsyncOperation, router]);

  const handleLogout = useCallback(async () => {
    await withAsyncOperation(async () => {
      await logout();
      setIsAuthenticated(false);
      router.push(ROUTES.LOGIN);
    }, 'Error during logout');
  }, [withAsyncOperation, router]);

  const handleRegister = useCallback(async (credentials: RegisterRequest) => {
    await withAsyncOperation(async () => {
      const response = await register(credentials);
      setIsAuthenticated(true);
      toast.success(response.message || 'Registration successful!', {
        duration: 3000,
      });

      router.push('/dashboard/profile');
    }, 'An error occurred during registration');
  }, [withAsyncOperation]);
  
  const handleRefreshToken = useCallback(async (token: string) => {
    await withAsyncOperation(async () => {
      await refreshToken();
    }, 'An error occurred while refreshing token');
  }, [withAsyncOperation]);

  // Update context value
  const contextValue = {
    isAuthenticated,
    isLoading,
    isInitialized,
    error,
    setIsAuthenticated,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
    refreshToken: handleRefreshToken,
  };

  // Show loading state while initializing
  if (!isInitialized) {
    return null; // Or a loading spinner
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 