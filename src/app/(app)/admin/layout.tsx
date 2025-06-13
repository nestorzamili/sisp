'use client';

import { SearchProvider } from '@/context/search-context';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/header';
import { Main } from '@/components/layout/main';
import { ProfileDropdown } from '@/components/profile-dropdown';
import { Search } from '@/components/search';
import { ModeToggle } from '@/components/theme-switch';
import { AppFooter } from '@/components/layout/app-footer';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <SidebarProvider>
        <SearchProvider>
          <SidebarProvider defaultOpen={true}>
            <AppSidebar />
            <div
              id="content"
              className={cn(
                'max-w-full w-full ml-auto',
                'peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]',
                'peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]',
                'transition-[width] ease-linear duration-200',
                'h-svh flex flex-col',
                'group-data-[scroll-locked=1]/body:h-full',
                'group-data-[scroll-locked=1]/body:has-[main.fixed-main]:h-svh',
              )}
            >
              <Header fixed>
                <Search />
                <div className="ml-auto flex items-center gap-2">
                  <ModeToggle />
                  <ProfileDropdown />
                </div>
              </Header>
              <Main>{children}</Main>
              <AppFooter />
            </div>
          </SidebarProvider>
        </SearchProvider>
      </SidebarProvider>
    </div>
  );
}
