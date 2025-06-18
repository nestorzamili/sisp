'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { LogIn, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ModeToggle } from '@/components/theme-switch';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

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
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
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
            {' '}
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center cursor-pointer group"
              onClick={handleLogoClick}
            >
              <div className="relative mr-3 rounded-lg">
                <Image
                  src="/logo-nias-selatan.png"
                  alt="Logo Nias Selatan"
                  width={isScrolled ? 40 : 44}
                  height={isScrolled ? 40 : 44}
                  className="object-cover transition-all duration-150 rounded-lg"
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
            </motion.div>{' '}
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-2 rounded-lg font-medium transition-colors duration-150 ${
                    activeTab === item.id
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <span className="relative z-10 text-sm">{item.label}</span>
                </motion.button>
              ))}
            </nav>{' '}
            {/* Desktop Auth Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <div className="transition-transform duration-150 hover:scale-105">
                <ModeToggle />
              </div>
              <Link href="/sign-up">
                <Button
                  variant="outline"
                  className="no-text-blur border-primary/20 hover:border-primary hover:bg-primary/5 transition-[border-color,background-color,box-shadow,transform] duration-150 hover:scale-105 hover:shadow-md"
                >
                  <span className="no-text-blur">Daftar</span>
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button className="no-text-blur bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white font-semibold shadow-lg hover:shadow-xl transition-[background-color,box-shadow,transform] duration-150 hover:scale-105">
                  <LogIn className="mr-2 h-4 w-4" />
                  <span className="no-text-blur">Masuk</span>
                </Button>
              </Link>
            </div>{' '}
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
          </div>
          {/* Mobile Menu */}
          <div
            className={`lg:hidden transition-all duration-300 overflow-hidden ${
              mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="pb-4 pt-2 bg-background/95 backdrop-blur-xl rounded-xl mt-2 border border-border/50 shadow-xl">
              {' '}
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
              </nav>{' '}
              <div className="flex flex-col space-y-3 mt-4 pt-4 px-4 border-t border-border/50">
                <div className="flex justify-center">
                  <ModeToggle />
                </div>
                <Link href="/sign-up">
                  <Button
                    variant="outline"
                    className="no-text-blur w-full transition-[background-color,border-color,box-shadow,transform] duration-150 hover:scale-[1.02] hover:shadow-md"
                  >
                    <span className="no-text-blur">Daftar</span>
                  </Button>
                </Link>
                <Link href="/sign-in">
                  <Button className="no-text-blur w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 transition-[background-color,box-shadow,transform] duration-150 hover:scale-[1.02] hover:shadow-lg">
                    <LogIn className="mr-2 h-4 w-4" />
                    <span className="no-text-blur">Masuk</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>{' '}
        </div>
      </motion.header>
    </>
  );
};

export default Header;
