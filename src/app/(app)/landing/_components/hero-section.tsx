'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        {' '}
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/school.png"
            alt="Sekolah SMP"
            fill
            priority
            className="object-cover object-center"
            quality={90}
          />
          {/* Multi-layer overlay for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/75 to-background/30"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20"></div>
          <div className="absolute inset-0 bg-black/10"></div>
        </div>{' '}
        {/* Content */}
        <div className="container mx-auto max-w-[1440px] px-6 relative z-20">
          <div className="max-w-4xl">
            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              <span className="block text-foreground drop-shadow-sm">
                Sistem Informasi
              </span>
              <span className="block bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent drop-shadow-sm">
                Sarana & Prasarana
              </span>
              <span className="block text-3xl md:text-4xl lg:text-5xl text-muted-foreground font-medium drop-shadow-sm">
                SMP Nias Selatan
              </span>
            </motion.h1>{' '}
            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-slate-700 dark:text-slate-200 mb-10 max-w-2xl leading-relaxed font-medium"
            >
              Platform digital untuk pendataan dan monitoring sarana prasarana
              SMP di Kabupaten Nias Selatan.
            </motion.p>
            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {' '}
              <Link href="/sign-in">
                <Button
                  size="lg"
                  className="group no-text-blur bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-[background-color,box-shadow,transform] duration-300 hover:scale-[1.02]"
                >
                  <span className="flex items-center gap-2 text-lg no-text-blur">
                    Mulai Input Data
                    <ArrowRight className="w-5 h-5 smooth-transform transition-transform duration-700 ease-out group-hover:translate-x-1" />
                  </span>
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
