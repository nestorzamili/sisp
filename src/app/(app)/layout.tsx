import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '/';

  if (pathname === '/') {
    return <>{children}</>;
  }

  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session?.user) {
    redirect('/sign-in');
  }

  const role = session.user.role;
  const isAdminRoute = pathname.startsWith('/admin');

  if (role === 'admin' && !isAdminRoute) {
    redirect('/admin/home');
  }

  if (role === 'user' && isAdminRoute) {
    redirect('/home');
  }

  return <>{children}</>;
}
