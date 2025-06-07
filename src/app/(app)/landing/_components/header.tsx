'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { LogIn, Menu, X } from 'lucide-react';
import Image from 'next/image';

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
            ? 'bg-white/90 backdrop-blur-xl shadow-lg'
            : 'bg-white/40 backdrop-blur-md'
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
              onClick={() => handleNavClick('home')}
            >
              <Image
                src="/logo-nias-selatan.svg"
                alt="Logo Nias Selatan"
                width={isScrolled ? 40 : 44}
                height={isScrolled ? 40 : 44}
                className="mr-3 transition-all duration-300"
              />
              <div className="flex flex-col">
                <span
                  className={`font-bold text-red-600 tracking-tight transition-all duration-300 ${
                    isScrolled ? 'text-lg' : 'text-xl'
                  }`}
                >
                  Dinas Pendidikan
                </span>
                <span
                  className={`text-gray-600 font-medium transition-all duration-300 ${
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
                      ? 'text-white bg-red-600 shadow-lg'
                      : 'text-gray-700 hover:text-red-600 hover:bg-white/50'
                  }`}
                  onClick={() => handleNavClick(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Desktop Auth Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <Button
                variant="ghost"
                size={isScrolled ? 'sm' : 'default'}
                className="text-gray-700 hover:text-red-600 hover:bg-white/50 font-medium"
              >
                Daftar
              </Button>
              <Button
                size={isScrolled ? 'sm' : 'default'}
                className="bg-red-600 hover:bg-red-700 text-white font-medium shadow-lg"
              >
                <LogIn className="mr-2" size={16} />
                Masuk
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-xl hover:bg-white/50 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="text-gray-700" size={24} />
              ) : (
                <Menu className="text-gray-700" size={24} />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden transition-all duration-300 overflow-hidden ${
              mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="pb-4 pt-2 bg-white/90 backdrop-blur-xl rounded-xl mt-2 border border-white/20">
              <nav className="flex flex-col space-y-1 mt-2 px-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    className={`px-4 py-3 rounded-lg text-sm font-medium text-left transition-all duration-200 ${
                      activeTab === item.id
                        ? 'text-white bg-red-600'
                        : 'text-gray-700 hover:bg-white/50 hover:text-red-600'
                    }`}
                    onClick={() => handleNavClick(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              {/* Mobile Auth Buttons */}
              <div className="flex flex-col space-y-3 mt-4 pt-4 px-4 border-t border-gray-200">
                <Button
                  variant="ghost"
                  className="justify-start text-gray-700 hover:text-red-600 hover:bg-white/50 font-medium"
                >
                  Daftar
                </Button>
                <Button className="justify-start bg-red-600 hover:bg-red-700 text-white font-medium">
                  <LogIn className="mr-2" size={16} />
                  Login Sekolah
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
