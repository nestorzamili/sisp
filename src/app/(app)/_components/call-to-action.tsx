'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/animations';

const CallToAction: React.FC = () => {
  const benefits = [
    'Dashboard monitoring real-time',
    'Laporan komprehensif otomatis',
    'Dukungan teknis penuh',
  ];

  return (
    <section id="contact" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-blue-600 to-blue-700" />

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

        {/* Animated Orbs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear", type: "tween" }}
          className="absolute -top-[30%] -right-[10%] w-[800px] h-[800px] bg-blue-400/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], x: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", type: "tween" }}
          className="absolute -bottom-[30%] -left-[10%] w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-tight text-white"
          >
            Siap Tingkatkan Kualitas{' '}
            <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 via-yellow-200 to-orange-300">
              Pendidikan Nias Selatan?
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Bergabunglah dalam transformasi digital pendidikan. Kelola dan monitor
            sarana prasarana sekolah Anda dengan mudah, akurat, dan transparan.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up">
              <Button
                size="lg"
                className="w-full sm:w-auto h-14 px-10 text-lg rounded-full bg-white text-primary hover:bg-white/95 shadow-2xl shadow-black/25 hover:scale-105 transition-all duration-300 font-semibold"
              >
                Daftarkan Sekolah
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto h-14 px-10 text-lg rounded-full border-2 border-white/30 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                Masuk Sekarang
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
