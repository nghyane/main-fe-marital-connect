export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 400
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const handleAuthError = (error: unknown): string => {
  if (error instanceof AppError) {
    return error.message;
  }
  
  if (error instanceof Error) {
    // Handle specific error types
    if (error.name === 'NetworkError') {
      return 'Unable to connect to the server. Please check your internet connection.';
    }
    if (error.name === 'TimeoutError') {
      return 'Request timed out. Please try again.';
    }
    return error.message;
  }
  
  return 'An unexpected error occurred';
}; 