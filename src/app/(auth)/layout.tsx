import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user) {
    const redirectUrl = session.user.role === 'admin' ? '/admin/home' : '/home';
    redirect(redirectUrl);
  }

  return <>{children}</>;
}
