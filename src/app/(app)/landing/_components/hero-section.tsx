'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Star } from 'lucide-react';
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
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/school.png"
            alt="Sekolah SMP"
            fill
            priority
            className="object-cover"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/30"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 z-10">
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-20 right-20 w-16 h-16 bg-primary/10 rounded-full backdrop-blur-sm border border-primary/20"
          />
          <motion.div
            animate={{
              y: [0, 15, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
            className="absolute bottom-32 right-32 w-24 h-24 bg-blue-500/10 rounded-2xl backdrop-blur-sm border border-blue-500/20"
          />
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, -3, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
            className="absolute top-1/3 right-1/4 w-12 h-12 bg-orange-400/10 rounded-full backdrop-blur-sm border border-orange-400/20"
          />
        </div>

        {/* Content */}
        <div className="container mx-auto max-w-[1440px] px-6 relative z-20">
          <div className="max-w-3xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary font-medium text-sm mb-6 backdrop-blur-sm"
            >
              <Star className="w-4 h-4 fill-current" />
              <span>Sistem Resmi Dinas Pendidikan Nias Selatan</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
            >
              <span className="block">Sistem Informasi</span>
              <span className="block bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Sarana & Prasarana
              </span>
              <span className="block text-3xl md:text-4xl lg:text-5xl text-muted-foreground">
                SMP Nias Selatan
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed"
            >
              Platform digital terpadu untuk pendataan, analisis, dan pelaporan
              kondisi sarana prasarana SMP. Mendukung perencanaan pembangunan
              pendidikan yang efektif dan tepat sasaran.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-8 mb-10"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary font-bold text-lg">138</span>
                </div>
                <div>
                  <div className="font-semibold text-foreground">Total SMP</div>
                  <div className="text-sm text-muted-foreground">
                    Se-Nias Selatan
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-lg">13+</span>
                </div>
                <div>
                  <div className="font-semibold text-foreground">
                    Kategori Data
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Sarana & Prasarana
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/home">
                <Button
                  size="lg"
                  className="group relative overflow-hidden bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white font-semibold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ x: ['100%', '-100%'] }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                  />
                  <span className="relative z-10 flex items-center gap-2 text-lg">
                    Mulai Input Data
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Button>
              </Link>

              <Button
                variant="outline"
                size="lg"
                className="group border-2 border-primary/20 hover:border-primary hover:bg-primary/5 font-semibold px-8 py-4 rounded-xl transition-all duration-300"
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-lg">Lihat Demo</span>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-1 h-3 bg-primary/50 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default HeroSection;
