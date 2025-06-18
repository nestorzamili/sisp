'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Users, TrendingUp, Sparkles } from 'lucide-react';
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
      icon: Users,
      label: '138 Sekolah',
      description: 'Sudah terdaftar',
    },
    {
      icon: TrendingUp,
      label: 'Analisis Akurat',
      description: 'Hasil terpercaya',
    },
  ];

  return (
    <>
      {/* Call to Action */}
      <section className="relative py-24 bg-gradient-to-br from-primary via-primary/95 to-blue-600 text-primary-foreground overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-current rounded-full animate-pulse"></div>
          <div
            className="absolute bottom-20 right-20 w-24 h-24 border-2 border-current rounded-full animate-pulse"
            style={{ animationDelay: '1s' }}
          ></div>
          <div
            className="absolute top-1/2 left-1/4 w-16 h-16 border-2 border-current rounded-full animate-pulse"
            style={{ animationDelay: '2s' }}
          ></div>

          {/* Floating Elements */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-20 right-1/3 w-20 h-20 bg-white/10 rounded-2xl backdrop-blur-sm"
          />
          <motion.div
            animate={{
              y: [0, 15, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 3,
            }}
            className="absolute bottom-32 left-1/3 w-16 h-16 bg-white/5 rounded-full backdrop-blur-sm"
          />
        </div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-transparent to-blue-600/90"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

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
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3 px-6 py-3 bg-white/10 rounded-full backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/15 transition-all duration-300"
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
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 border border-white/30 rounded-full text-white font-medium text-sm mb-8 backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>Bergabunglah dengan Sistem Terdepan</span>
            </motion.div>

            <motion.h2
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
            </motion.h2>

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
              <Link href="/sign-up">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="group relative overflow-hidden bg-white text-primary hover:bg-white/95 font-bold text-lg px-10 py-6 rounded-2xl shadow-2xl hover:shadow-white/20 transition-all duration-300 min-w-[250px]">
                    {/* Button Background Animation */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                      whileHover={{ x: ['100%', '-100%'] }}
                      transition={{ duration: 0.8, ease: 'easeInOut' }}
                    />

                    <span className="relative flex items-center gap-3 justify-center">
                      Daftarkan Sekolah Anda
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </Button>
                </motion.div>
              </Link>

              <Link href="/sign-in">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold text-lg px-10 py-6 rounded-2xl backdrop-blur-sm transition-all duration-300 min-w-[200px]"
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
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <a
                  href="#contact"
                  className="hover:underline opacity-80 hover:opacity-100 transition-opacity"
                >
                  📞 Hubungi Support
                </a>
                <a
                  href="#process"
                  className="hover:underline opacity-80 hover:opacity-100 transition-opacity"
                >
                  📖 Panduan Penggunaan
                </a>
                <a
                  href="#features"
                  className="hover:underline opacity-80 hover:opacity-100 transition-opacity"
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
