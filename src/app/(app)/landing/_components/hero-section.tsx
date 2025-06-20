'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const HeroSection: React.FC = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ contain: 'layout style paint' }}
    >
      {' '}
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{ transform: 'translate3d(0, 0, 0)' }}
      >
        <Image
          src="/school.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
          quality={50}
          sizes="100vw"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          loading="eager"
          decoding="async"
        />
        {/* Simplified overlay for better performance */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/75 to-background/30"></div>
      </div>
      {/* Content - Immediately visible for better LCP */}
      <div className="container mx-auto max-w-[1440px] px-6 relative z-20">
        <div className="max-w-4xl">
          {' '}
          {/* Main Heading - Immediately visible, no animation delay */}
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight will-change-auto"
            style={{
              textRendering: 'optimizeSpeed',
              WebkitFontSmoothing: 'antialiased',
            }}
          >
            <span className="block text-foreground font-bold">
              Sistem Informasi
            </span>
            <span className="block bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent font-bold">
              Sarana & Prasarana
            </span>
            <span className="block text-3xl md:text-4xl lg:text-5xl text-muted-foreground font-medium">
              SMP Nias Selatan
            </span>
          </h1>
          {/* Description - Slightly delayed */}
          <p className="text-lg md:text-xl text-slate-700 dark:text-slate-200 mb-10 max-w-2xl leading-relaxed font-medium animate-[fadeInDelayed_0.3s_ease-out_0.1s_both]">
            Platform digital untuk pendataan dan monitoring sarana prasarana SMP
            di Kabupaten Nias Selatan.
          </p>
          {/* CTA Button - More delayed */}{' '}
          <div className="animate-[fadeInDelayed_0.3s_ease-out_0.2s_both]">
            <Link
              href="/sign-in"
              aria-label="Mulai input data sarana prasarana sekolah"
            >
              <Button
                size="lg"
                className="group bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                aria-label="Mulai Input Data - Masuk ke sistem untuk input data sekolah"
              >
                <span className="flex items-center gap-2 text-lg">
                  Mulai Input Data
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
