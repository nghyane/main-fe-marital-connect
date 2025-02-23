import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AUTH_COOKIES } from '@/constants/auth';
import { ROUTES } from '@/constants/routes';

// Define route configurations
const ROUTE_CONFIG = {
  public: [ROUTES.LOGIN, ROUTES.REGISTER, ROUTES.HOME, ROUTES.BLOG],
  protected: [ROUTES.DASHBOARD, ROUTES.PROFILE],
  auth: [ROUTES.LOGIN, ROUTES.REGISTER]
} as const;

export function middleware(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIES.ACCESS_TOKEN);
  const { pathname } = request.nextUrl;

  // Check if route requires authentication
  const isProtectedRoute = ROUTE_CONFIG.protected.includes(pathname as any);
  const isAuthRoute = ROUTE_CONFIG.auth.includes(pathname as any);
  
  // Handle authentication redirects
  if (isProtectedRoute && !token) {
    const redirectUrl = new URL(ROUTES.LOGIN, request.url);
    redirectUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (isAuthRoute && token) {
    const from = request.nextUrl.searchParams.get('from') || ROUTES.DASHBOARD;
    return NextResponse.redirect(new URL(from, request.url));
  }

  // Add security headers
  const response = NextResponse.next();
  response.headers.set('x-auth-status', token ? 'authenticated' : 'unauthenticated');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 