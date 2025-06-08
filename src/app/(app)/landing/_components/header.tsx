'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { LogIn, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ModeToggle } from '@/components/theme-switch';
import { useRouter } from 'next/navigation';

const navItems = [
  { id: 'home', label: 'Beranda' },
  { id: 'features', label: 'Fitur' },
  { id: 'facilities', label: 'Data yang Dikumpulkan' },
  { id: 'process', label: 'Proses Pendataan' },
  { id: 'statistics', label: 'Statistik' },
  { id: 'contact', label: 'Kontak' },
];

const Header: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  const handleNavClick = useCallback((id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);

    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  }, []);

  const handleLogoClick = useCallback(() => {
    // Navigate to home page
    router.push('/');
  }, [router]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);

      // Update active section
      const sections = navItems
        .map((item) => ({
          id: item.id,
          element: document.getElementById(item.id),
        }))
        .filter((section) => section.element);

      const scrollOffset = scrollPosition + 120;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Check if we're at the bottom of the page (within 50px)
      if (scrollPosition + windowHeight >= documentHeight - 50) {
        setActiveTab('contact');
        return;
      }

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element && section.element.offsetTop <= scrollOffset) {
          setActiveTab(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Mobile menu backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/90 backdrop-blur-xl shadow-lg'
            : 'bg-background/40 backdrop-blur-md'
        }`}
      >
        <div className="container mx-auto max-w-[1440px] px-6">
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              isScrolled ? 'py-3' : 'py-4'
            }`}
          >
            {/* Logo */}
            <div
              className="flex items-center cursor-pointer group"
              onClick={handleLogoClick}
            >
              <Image
                src="/logo-nias-selatan.svg"
                alt="Logo Nias Selatan"
                width={44}
                height={44}
                className="mr-3 transition-all duration-300"
                style={{
                  width: isScrolled ? '40px' : '44px',
                  height: 'auto',
                }}
              />
              <div className="flex flex-col">
                <span
                  className={`font-bold text-primary-brand tracking-tight transition-all duration-300 ${
                    isScrolled ? 'text-lg' : 'text-xl'
                  }`}
                >
                  Dinas Pendidikan
                </span>
                <span
                  className={`text-secondary-brand font-medium transition-all duration-300 ${
                    isScrolled ? 'text-[10px]' : 'text-xs'
                  }`}
                >
                  Bidang Sarana dan Prasarana SMP
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeTab === item.id
                      ? 'text-primary-foreground bg-primary shadow-lg'
                      : 'text-foreground hover:text-primary hover:bg-background/50'
                  }`}
                  onClick={() => handleNavClick(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Desktop Auth Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <ModeToggle />
              <Link href="/sign-up">
                <Button
                  variant="ghost"
                  size={isScrolled ? 'sm' : 'default'}
                  className="btn-ghost"
                >
                  Daftar
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button
                  size={isScrolled ? 'sm' : 'default'}
                  className="btn-primary"
                >
                  <LogIn className="mr-2" size={16} />
                  Masuk
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-xl hover:bg-background/50 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="text-foreground" size={24} />
              ) : (
                <Menu className="text-foreground" size={24} />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden transition-all duration-300 overflow-hidden ${
              mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="pb-4 pt-2 bg-background/90 backdrop-blur-xl rounded-xl mt-2 border border-border">
              <nav className="flex flex-col space-y-1 mt-2 px-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    className={`px-4 py-3 rounded-lg text-sm font-medium text-left transition-all duration-200 ${
                      activeTab === item.id
                        ? 'text-primary-foreground bg-primary'
                        : 'text-foreground hover:bg-background/50 hover:text-primary'
                    }`}
                    onClick={() => handleNavClick(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              {/* Mobile Auth Buttons */}
              <div className="flex flex-col space-y-3 mt-4 pt-4 px-4 border-t border-border">
                <Link href="/sign-up">
                  <Button
                    variant="ghost"
                    className="w-full justify-start btn-ghost"
                  >
                    Daftar
                  </Button>
                </Link>
                <Link href="/sign-in">
                  <Button className="w-full justify-start btn-primary">
                    <LogIn className="mr-2" size={16} />
                    Login Sekolah
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
