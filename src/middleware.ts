import { NextRequest, NextResponse } from 'next/server';
import { getSessionCookie } from 'better-auth/cookies';

const PUBLIC_ROUTES = new Set([
  '/',
  '/sign-in',
  '/sign-up',
  '/forgot-password',
  '/reset-password',
]);

const AUTH_PATHS = new Set([
  '/sign-in',
  '/sign-up',
  '/forgot-password',
  '/reset-password',
]);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files and special routes
  if (pathname === '/robots.txt' || pathname === '/sitemap.xml') {
    return NextResponse.next();
  }

  // Check if route is public
  const isPublicRoute =
    PUBLIC_ROUTES.has(pathname) ||
    Array.from(AUTH_PATHS).some((authPath) =>
      pathname.startsWith(`${authPath}/`),
    );

  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    if (isPublicRoute) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots|sitemap|.*\\.(?:png|jpg|jpeg|webp|txt|xml)$).*)',
  ],
};
