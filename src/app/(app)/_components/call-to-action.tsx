'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const CallToAction: React.FC = () => {
  const trustIndicators = [
    {
      icon: Shield,
      label: 'Data Aman',
      description: 'Keamanan terjamin',
    },
    {
      icon: TrendingUp,
      label: 'Analisis Akurat',
      description: 'Hasil terpercaya',
    },
  ];

  return (
    <>
      {' '}
      {/* Call to Action */}
      <section className="relative py-24 bg-gradient-to-br from-primary via-primary/95 to-blue-600 text-primary-foreground overflow-hidden">
        {' '}
        {/* Enhanced background graphics consistent with other sections */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Animated gradient orbs for depth - increased visibility */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/25 rounded-full blur-2xl animate-pulse"></div>
          <div
            className="absolute bottom-20 right-20 w-24 h-24 bg-white/20 rounded-full blur-xl animate-pulse"
            style={{ animationDelay: '2s', animationDuration: '4s' }}
          ></div>
          <div
            className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/15 rounded-full blur-lg animate-pulse"
            style={{ animationDelay: '1s', animationDuration: '3s' }}
          ></div>

          {/* CTA themed elements - increased visibility */}
          <div className="absolute top-1/4 right-1/4">
            <div className="opacity-40">
              <div className="w-8 h-8 border-2 border-white/50 rounded-lg rotate-12"></div>
            </div>
          </div>

          {/* Action indicators - increased visibility */}
          <div className="absolute bottom-1/3 left-1/6">
            <div className="opacity-35">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-white/60 rounded-full"></div>
                <div className="w-6 h-0.5 bg-white/50 rounded-full"></div>
                <div className="w-3 h-3 border border-white/60 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Additional CTA graphics - more visible */}
          <div className="absolute top-1/6 left-1/3">
            <div className="opacity-30">
              <div className="grid grid-cols-2 gap-1">
                <div className="w-2 h-6 bg-white/40 rounded-sm"></div>
                <div className="w-2 h-4 bg-white/30 rounded-sm"></div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-1/4 right-1/5">
            <div className="opacity-35">
              <div className="w-6 h-6 border-2 border-white/50 rounded-full relative">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white/60 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Subtle depth overlays */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
        </div>
        <div className="container mx-auto max-w-[1440px] px-6 text-center relative z-10">
          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="flex flex-wrap justify-center items-center gap-8 mb-12"
          >
            {trustIndicators.map((indicator, index) => {
              const IndicatorIcon = indicator.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.2 + 0.2,
                  }}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.15 },
                  }}
                  className="flex items-center gap-3 px-6 py-3 bg-white/10 rounded-full backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/15 transition-all duration-150"
                >
                  <IndicatorIcon className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-semibold text-sm">
                      {indicator.label}
                    </div>
                    <div className="text-xs opacity-80">
                      {indicator.description}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            {' '}
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
            >
              Bantu Tentukan Prioritas
              <span className="block text-2xl md:text-3xl lg:text-4xl opacity-90 mt-2">
                Kebutuhan Sekolah Anda
              </span>
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed opacity-95"
            >
              Daftarkan sekolah Anda dan input data sarana prasarana untuk
              analisis prioritas kebutuhan yang akan mendukung perencanaan
              pembangunan pendidikan yang berkelanjutan di Nias Selatan.
            </motion.p>
            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              {' '}
              <Link
                href="/sign-up"
                aria-label="Daftarkan sekolah Anda untuk pendataan sarana prasarana"
              >
                {' '}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                >
                  <Button
                    className="group relative overflow-hidden bg-white text-primary hover:bg-white/95 font-bold text-lg px-10 py-6 rounded-2xl shadow-2xl hover:shadow-white/20 transition-all duration-150 min-w-[250px]"
                    aria-label="Daftarkan Sekolah Anda - Mulai proses pendaftaran sekolah"
                  >
                    {/* Button Background Animation */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                      whileHover={{ x: ['100%', '-100%'] }}
                      transition={{ duration: 0.8, ease: 'easeInOut' }}
                    />

                    <span className="relative flex items-center gap-3 justify-center">
                      Daftarkan Sekolah Anda
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-150" />
                    </span>
                  </Button>
                </motion.div>
              </Link>{' '}
              <Link
                href="/sign-in"
                aria-label="Masuk ke sistem SISP untuk sekolah yang sudah terdaftar"
              >
                {' '}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                >
                  {' '}
                  <Button
                    variant="outline"
                    className="border-2 border-white bg-white/15 text-white hover:bg-white hover:text-primary font-semibold text-lg px-10 py-6 rounded-2xl backdrop-blur-sm transition-all duration-150 min-w-[200px]"
                    aria-label="Masuk Sistem - Login ke platform SISP"
                  >
                    Masuk Sistem
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-12 text-center"
            >
              <p className="text-sm opacity-80 mb-4">
                Butuh bantuan? Tim support kami siap membantu Anda
              </p>{' '}
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <a
                  href="#contact"
                  className="hover:underline opacity-80 hover:opacity-100 transition-opacity"
                  aria-label="Hubungi tim support untuk bantuan teknis"
                >
                  📞 Hubungi Support
                </a>
                <a
                  href="#process"
                  className="hover:underline opacity-80 hover:opacity-100 transition-opacity"
                  aria-label="Lihat panduan lengkap penggunaan sistem"
                >
                  📖 Panduan Penggunaan
                </a>
                <a
                  href="#features"
                  className="hover:underline opacity-80 hover:opacity-100 transition-opacity"
                  aria-label="Jelajahi fitur-fitur yang tersedia di sistem"
                >
                  ⚡ Lihat Fitur
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default CallToAction;
