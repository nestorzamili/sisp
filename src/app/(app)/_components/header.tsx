'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { LogIn, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ModeToggle } from '@/components/theme-switch';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { transition } from '@/lib/animations';

const navItems = [
  { id: 'home', label: 'Beranda' },
  { id: 'benefits', label: 'Keuntungan' },
  { id: 'features', label: 'Fitur' },
  { id: 'facilities', label: 'Data' },
  { id: 'process', label: 'Proses' },
  { id: 'statistics', label: 'Statistik' },
  { id: 'contact', label: 'Kontak' },
];

const Header: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  // Scroll Spy Logic
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      // Use viewport center to determine active section
      const scrollPosition = window.scrollY + (window.innerHeight / 2);

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveTab(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
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
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-background/80 backdrop-blur-lg border-b border-border/50 py-3 shadow-sm'
          : 'bg-transparent py-5'
          }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={transition}
      >
        <div className="container mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              className="flex items-center cursor-pointer gap-3"
              onClick={() => router.push('/')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative rounded-xl overflow-hidden shadow-sm">
                <Image
                  src="/logo-nias-selatan.png"
                  alt="Logo Nias Selatan"
                  width={44}
                  height={44}
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg tracking-tight text-foreground leading-none">
                  Dinas Pendidikan
                </span>
                <span className="text-xs text-muted-foreground font-medium">
                  Bidang Sarana & Prasarana
                </span>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-background/50 border border-border/40 backdrop-blur-sm">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`
                    relative px-4 py-2 rounded-full text-sm font-medium transition-colors
                    ${activeTab === item.id ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}
                  `}
                >
                  {activeTab === item.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-secondary rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <ModeToggle />
              <div className="h-6 w-px bg-border/50" />
              <Link href="/sign-in">
                <Button variant="ghost" className="rounded-full">
                  Masuk
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="rounded-full px-6 shadow-lg shadow-primary/20">
                  Daftar
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-[70px] left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border z-40 lg:hidden overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left text-lg font-medium p-2 rounded-lg ${activeTab === item.id ? 'bg-secondary text-primary' : 'text-muted-foreground'
                    }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="h-px bg-border my-2" />
              <div className="flex gap-4">
                <Link href="/sign-in" className="flex-1">
                  <Button variant="outline" className="w-full">Masuk</Button>
                </Link>
                <Link href="/sign-up" className="flex-1">
                  <Button className="w-full">Daftar</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
