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
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden animate-[fadeIn_0.2s_ease-out]"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 opacity-0 animate-[slideDown_0.6s_ease-out_forwards] ${
          isScrolled
            ? 'bg-background/95 backdrop-blur-xl shadow-xl border-b border-border/50'
            : 'bg-background/60 backdrop-blur-md'
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
              className="flex items-center cursor-pointer group opacity-0 animate-[slideInLeft_0.6s_ease-out_0.1s_forwards] hover:scale-105 transition-transform duration-150"
              onClick={handleLogoClick}
            >
              <div className="relative mr-3 rounded-lg">
                <Image
                  src="/logo-nias-selatan.png"
                  alt="Logo Nias Selatan"
                  width={isScrolled ? 40 : 44}
                  height={isScrolled ? 40 : 44}
                  className="object-cover transition-all duration-150 rounded-lg"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span
                  className={`font-bold text-primary-brand tracking-tight transition-all duration-150 ${
                    isScrolled ? 'text-lg' : 'text-xl'
                  }`}
                >
                  Dinas Pendidikan
                </span>
                <span
                  className={`text-secondary-brand font-medium leading-tight transition-all duration-150 ${
                    isScrolled ? 'text-[10px]' : 'text-xs'
                  }`}
                >
                  Bidang Sarana dan Prasarana SMP
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-150 hover:scale-105 opacity-0 animate-[fadeInUp_0.4s_ease-out_forwards] ${
                    activeTab === item.id
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                  style={{ animationDelay: `${0.2 + index * 0.05}s` }}
                >
                  <span className="relative z-10 text-sm">{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Desktop Auth Buttons */}
            <div className="hidden lg:flex items-center space-x-3 opacity-0 animate-[slideInRight_0.6s_ease-out_0.3s_forwards]">
              <div className="transition-transform duration-150 hover:scale-105">
                <ModeToggle />
              </div>
              <Link href="/sign-up">
                <Button
                  variant="outline"
                  className="border-primary/20 hover:border-primary hover:bg-primary/5 transition-all duration-150 hover:scale-105 hover:shadow-md"
                >
                  Daftar
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-150 hover:scale-105">
                  <LogIn className="mr-2 h-4 w-4" />
                  Masuk
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-xl hover:bg-muted/50 transition-all duration-150 hover:scale-105"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <div className="transition-transform duration-150">
                {mobileMenuOpen ? (
                  <X className="text-foreground" size={24} />
                ) : (
                  <Menu className="text-foreground" size={24} />
                )}
              </div>
            </button>
          </div>{' '}
          {/* Mobile Menu */}
          <div
            className={`lg:hidden transition-all duration-300 overflow-hidden ${
              mobileMenuOpen ? 'max-h-[35rem] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            {' '}
            <div className="pb-6 pt-4 bg-background/95 backdrop-blur-xl rounded-xl mt-2 border border-border/50 shadow-xl">
              <nav className="flex flex-col space-y-1 mt-2 px-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`text-left px-4 py-3 rounded-lg font-medium transition-all duration-150 hover:translate-x-1 ${
                      activeTab === item.id
                        ? 'text-primary bg-primary/10 border-l-4 border-primary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              <div className="flex flex-col space-y-3 mt-5 pt-4 px-4 border-t border-border/50">
                <div className="flex justify-center mb-1">
                  <ModeToggle />
                </div>
                <Link href="/sign-up">
                  <Button
                    variant="outline"
                    className="w-full h-11 transition-all duration-150 hover:scale-[1.02] hover:shadow-md"
                  >
                    Daftar
                  </Button>
                </Link>
                <Link href="/sign-in">
                  <Button className="w-full h-11 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 transition-all duration-150 hover:scale-[1.02] hover:shadow-lg">
                    <LogIn className="mr-2 h-4 w-4" />
                    Masuk
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
