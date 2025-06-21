import { NextRequest, NextResponse } from 'next/server';
import { getSessionCookie, getCookieCache } from 'better-auth/cookies';

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

  if (!sessionCookie && !isPublicRoute) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (!sessionCookie && isPublicRoute) {
    return NextResponse.next();
  }

  let session = null;
  try {
    session = await getCookieCache(request);
  } catch (error) {
    console.error('Failed to get session from cookie cache:', error);
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (!session?.user) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  const { role } = session.user;
  const isAdminRoute = pathname.startsWith('/admin');
  const isAuthPath = AUTH_PATHS.has(pathname);
  const isRootPath = pathname === '/';

  if (isAuthPath) {
    const redirectUrl = role === 'admin' ? '/admin/home' : '/home';
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  // Role-based access control
  if (role === 'admin') {
    if (!isRootPath && !isAdminRoute) {
      return NextResponse.redirect(new URL('/admin/home', request.url));
    }
  } else {
    if (isAdminRoute) {
      return NextResponse.redirect(new URL('/home', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots|sitemap|.*\\.(?:png|jpg|jpeg|webp|txt|xml)$).*)',
  ],
};
