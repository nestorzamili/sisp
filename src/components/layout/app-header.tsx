'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HelpCircle, Home, FileText } from 'lucide-react';
import { ModeToggle } from '@/components/theme-switch';
import { usePathname, useRouter } from 'next/navigation';
import { ProfileDropdown } from '@/components/profile-dropdown';
import { NotificationDropdown } from '@/components/notifications/notification-dropdown';

export function AppHeader() {
  const pathname = usePathname();
  const router = useRouter();

  const isHomeActive = pathname === '/home';
  const isFormulirActive = pathname === '/formulir';

  const handleLogoClick = () => {
    router.push('/');
  };

  const navigationItems = [
    {
      href: '/home',
      label: 'Home',
      icon: Home,
      isActive: isHomeActive,
    },
    {
      href: '/formulir',
      label: 'Formulir',
      icon: FileText,
      isActive: isFormulirActive,
    },
  ];

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

          {/* Center Navigation Items - Desktop */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                      item.isActive
                        ? 'text-primary-foreground bg-primary shadow-lg'
                        : 'text-foreground hover:text-primary hover:bg-background/50'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}

            {/* Bantuan Button */}
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
            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center space-x-2">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`text-sm font-medium transition-all duration-200 flex items-center gap-1 ${
                        item.isActive
                          ? 'text-primary-foreground bg-primary'
                          : 'text-foreground hover:text-primary'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span className="hidden sm:inline">{item.label}</span>
                    </Button>
                  </Link>
                );
              })}

              {/* Mobile Bantuan */}
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 text-sm font-medium transition-all duration-200 text-foreground hover:text-primary"
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
