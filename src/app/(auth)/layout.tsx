'use client';

import { useSession } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const redirectUrl = useMemo(() => {
    if (!session?.user) return null;
    return session.user.role === 'admin' ? '/admin/home' : '/home';
  }, [session?.user]);

  useEffect(() => {
    if (session?.user && !isPending && redirectUrl) {
      router.replace(redirectUrl);
    }
  }, [session?.user, isPending, router, redirectUrl]);

  if (isPending || session?.user) {
    return null;
  }

  return <>{children}</>;
}
