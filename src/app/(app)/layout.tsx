'use client';

import { useSession } from '@/lib/auth-client';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useMemo } from 'react';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const roleChecks = useMemo(() => {
    const isRootPath = pathname === '/';

    if (isRootPath) {
      return { isPublic: true };
    }

    if (!session?.user) return null;

    const role = session.user.role;
    const isAdminRoute = pathname.startsWith('/admin');

    return {
      role,
      isAdminRoute,
      isRootPath: false,
      shouldRedirect: role === 'admin' ? !isAdminRoute : isAdminRoute,
      shouldHide: role === 'admin' ? !isAdminRoute : isAdminRoute,
    };
  }, [session?.user, pathname]);

  useEffect(() => {
    if (pathname === '/') {
      return;
    }

    if (!session?.user && !isPending) {
      router.replace('/sign-in');
      return;
    }

    if (roleChecks?.shouldRedirect) {
      const redirectUrl = roleChecks.role === 'admin' ? '/admin/home' : '/home';
      router.replace(redirectUrl);
    }
  }, [session?.user, isPending, router, roleChecks, pathname]);

  if (pathname === '/') {
    return <>{children}</>;
  }

  if (isPending || !session?.user) {
    return null;
  }

  if (roleChecks?.shouldHide) {
    return null;
  }

  return <>{children}</>;
}
