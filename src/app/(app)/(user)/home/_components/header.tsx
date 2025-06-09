'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';
import { ModeToggle } from '@/components/theme-switch';
import { usePathname, useRouter } from 'next/navigation';
import { ProfileDropdown } from '@/components/profile-dropdown';
import { NotificationDropdown } from '@/components/notifications/notification-dropdown';

export function DashboardHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const isHomeActive = pathname === '/home';

  const handleLogoClick = () => {
    router.push('/');
  };

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Tagline */}
          <div
            className="flex items-center cursor-pointer group"
            onClick={handleLogoClick}
          >
            <Image
              src="/logo-nias-selatan.svg"
              alt="Logo Nias Selatan"
              width={40}
              height={40}
              className="mr-3"
            />
            <div className="flex flex-col">
              <span className="font-bold text-primary text-lg">
                Dinas Pendidikan
              </span>
              <span className="text-xs text-muted-foreground">
                Bidang Sarana dan Prasarana SMP
              </span>
            </div>
          </div>

          {/* Center Navigation Items */}
          <div className="hidden md:flex items-center space-x-1">
            <Link href="/home">
              <Button
                variant="ghost"
                size="sm"
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isHomeActive
                    ? 'text-primary-foreground bg-primary shadow-lg'
                    : 'text-foreground hover:text-primary hover:bg-background/50'
                }`}
              >
                Formulir
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 text-foreground hover:text-primary hover:bg-background/50 flex items-center gap-2"
            >
              <HelpCircle className="w-4 h-4" />
              Bantuan
            </Button>
          </div>

          {/* Right Navigation Items */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu for Formulir and Bantuan */}
            <div className="md:hidden flex items-center space-x-2">
              <Link href="/home">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`text-sm font-medium transition-all duration-200 ${
                    isHomeActive
                      ? 'text-primary-foreground bg-primary'
                      : 'text-foreground hover:text-primary'
                  }`}
                >
                  Formulir
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 text-sm font-medium transition-all duration-200 text-foreground hover:text-primary"
              >
                <HelpCircle className="w-4 h-4" />
                <span className="hidden sm:inline">Bantuan</span>
              </Button>
            </div>

            <NotificationDropdown />

            <ModeToggle />

            <ProfileDropdown />
          </div>
        </div>
      </div>
    </header>
  );
}
