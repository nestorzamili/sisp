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

  const { data: session } = await betterFetch<Session>(
    '/api/auth/get-session',
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get('cookie') || '',
      },
    },
  );

  // role check
  if (session?.user.role === 'admin' && pathname.startsWith('/admin')) {
    return NextResponse.next();
  }
  if (session?.user.role === 'user' && pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  if (session?.user.role === 'admin' && !pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/admin/home', request.url));
  }

  if (!session && !isPublicRoute) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (session && (pathname === '/sign-in' || pathname === '/sign-up')) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|.*\\.svg$).*)'],
};
