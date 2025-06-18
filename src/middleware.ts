import { NextRequest, NextResponse } from 'next/server';
import type { auth } from '@/lib/auth';
import { betterFetch } from '@better-fetch/fetch';

type Session = typeof auth.$Infer.Session;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const publicRoutes = [
    '/',
    '/sign-in',
    '/sign-up',
    '/forgot-password',
    '/reset-password',
  ];

  const authPaths = [
    '/sign-in',
    '/sign-up',
    '/forgot-password',
    '/reset-password',
  ];

  const isPublicRoute =
    publicRoutes.includes(pathname) ||
    authPaths.some((authPath) => pathname.startsWith(authPath + '/'));

  let session: Session | null = null;

  try {
    const { data } = await betterFetch<Session>('/api/auth/get-session', {
      baseURL:
        process.env.NODE_ENV === 'production'
          ? process.env.BETTER_AUTH_URL // Use the explicit URL from env in production
          : request.nextUrl.origin,
      headers: {
        cookie: request.headers.get('cookie') || '',
      },
    });
    session = data;
  } catch (error) {
    // Log error if needed, but continue with null session
    console.error('Failed to fetch session:', error);
    session = null;
  }

  // Jika tidak ada session dan bukan public route, redirect ke sign-in
  if (!session && !isPublicRoute) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // Jika ada session dan mencoba akses auth pages, redirect ke home yang sesuai
  if (session && authPaths.includes(pathname)) {
    const redirectUrl = session.user.role === 'admin' ? '/admin/home' : '/home';
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  // Role-based redirects untuk authenticated users
  if (session) {
    const isAdminRoute = pathname.startsWith('/admin');
    const isAdminUser = session.user.role === 'admin';

    // Admin mencoba akses non-admin routes (kecuali root path)
    if (isAdminUser && !isAdminRoute && pathname !== '/') {
      return NextResponse.redirect(new URL('/admin/home', request.url));
    }

    // Non-admin mencoba akses admin routes
    if (!isAdminUser && isAdminRoute) {
      return NextResponse.redirect(new URL('/home', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(png|jpg|jpeg|webp)$).*)',
  ],
};
