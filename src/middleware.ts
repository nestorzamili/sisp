import { NextRequest, NextResponse } from 'next/server';
import { getSessionCookie } from 'better-auth/cookies';
import logger from './lib/logger';

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
  const method = request.method;

  const ip =
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-forwarded-for') ||
    request.headers.get('x-real-ip') ||
    request.headers.get('x-client-ip') ||
    'unknown';

  if (pathname === '/robots.txt' || pathname === '/sitemap.xml') {
    logger.debug(
      { method, pathname, ip, skip: true },
      'Skip static/special route',
    );
    return NextResponse.next();
  }

  const isPublicRoute =
    PUBLIC_ROUTES.has(pathname) ||
    Array.from(AUTH_PATHS).some((authPath) =>
      pathname.startsWith(`${authPath}/`),
    );

  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    logger.info(
      { method, pathname, ip, authenticated: false },
      isPublicRoute ? 'Public route access' : 'Redirect to sign-in',
    );
    if (isPublicRoute) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  logger.debug(
    { method, pathname, ip, authenticated: true },
    'Authenticated request',
  );

  const response = NextResponse.next();
  response.headers.set('x-pathname', pathname);

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots|sitemap|.*\\.(?:png|jpg|jpeg|webp|txt|xml)$).*)',
  ],
};
