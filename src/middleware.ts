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

  // Handle unauthenticated users
  if (!sessionCookie) {
    if (isPublicRoute) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // Get session for authenticated users
  let session = null;
  try {
    session = await getCookieCache(request);
  } catch (error) {
    console.error('Failed to get session from cookie cache:', error);
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // Invalid session
  if (!session?.user) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  const { role } = session.user;
  const isAdminRoute = pathname.startsWith('/admin');
  const isAuthPath = AUTH_PATHS.has(pathname);
  const isRootPath = pathname === '/';

  // Redirect authenticated users away from auth pages
  if (isAuthPath) {
    const redirectUrl = role === 'admin' ? '/admin/home' : '/home';
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  // Role-based access control
  if (role === 'admin') {
    // Admin can access root path and admin routes
    if (isRootPath || isAdminRoute) {
      return NextResponse.next();
    }
    // Redirect admin from non-admin routes (except root) to admin home
    return NextResponse.redirect(new URL('/admin/home', request.url));
  } else {
    // Regular user
    if (isAdminRoute) {
      // Redirect regular users away from admin routes
      return NextResponse.redirect(new URL('/home', request.url));
    }
    // Regular users can access all other routes including root
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots|sitemap|.*\\.(?:png|jpg|jpeg|webp|txt|xml)$).*)',
  ],
};
