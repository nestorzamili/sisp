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

const STATIC_ROUTES = new Set(['/robots.txt', '/sitemap.xml']);

function getClientIP(request: NextRequest): string {
  return (
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    request.headers.get('x-client-ip') ||
    'unknown'
  );
}

interface LogContext {
  method: string;
  pathname: string;
  ip: string;
  userAgent: string | null;
  referer: string | null;
  authenticated: boolean;
  isPublicRoute: boolean;
  [key: string]: unknown;
}

function createLogContext(
  request: NextRequest,
  extra: Record<string, unknown> = {},
): LogContext {
  const { pathname } = request.nextUrl;
  return {
    method: request.method,
    pathname,
    ip: getClientIP(request),
    userAgent: request.headers.get('user-agent'),
    referer: request.headers.get('referer'),
    authenticated: false,
    isPublicRoute: false,
    ...extra,
  };
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const startTime = Date.now();

  if (STATIC_ROUTES.has(pathname)) {
    return NextResponse.next();
  }

  const isPublicRoute =
    PUBLIC_ROUTES.has(pathname) ||
    Array.from(AUTH_PATHS).some((authPath) =>
      pathname.startsWith(`${authPath}/`),
    );

  const sessionCookie = getSessionCookie(request);
  const isAuthenticated = !!sessionCookie;

  const logContext = createLogContext(request, {
    authenticated: isAuthenticated,
    isPublicRoute,
  });

  if (!isAuthenticated) {
    if (isPublicRoute) {
      if (process.env.NODE_ENV !== 'production') {
        logger.debug(logContext);
      }
      return NextResponse.next();
    }

    logger.info({ ...logContext, action: 'redirect', redirectTo: '/sign-in' });
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  const response = NextResponse.next();
  response.headers.set('x-pathname', pathname);

  const duration = Date.now() - startTime;
  logger.info({
    ...logContext,
    duration,
    action: 'success',
    statusCode: response.status,
  });

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots|sitemap|.*\\.(?:png|jpg|jpeg|webp|txt|xml)$).*)',
  ],
};
