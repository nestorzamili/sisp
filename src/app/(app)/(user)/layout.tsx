import { AppHeader } from '@/components/layout/app-header';
import { AppFooter } from '@/components/layout/app-footer';

interface UserLayoutProps {
  children: React.ReactNode;
}

export default function UserLayout({ children }: UserLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader />
      <main className="flex-1 w-full">{children}</main>
      <AppFooter />
    </div>
  );
}
