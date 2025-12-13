'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, School, Users, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { transition, staggerContainer, fadeUp } from '@/lib/animations';

const HeroSection: React.FC = () => {
  const highlights = [
    { icon: School, text: '138+ Sekolah Terhubung' },
    { icon: Users, text: 'Platform Terintegrasi' },
    { icon: BarChart3, text: 'Real-time Monitoring' },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-orange-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pt-20 lg:pt-0">
      {/* Abstract Background Shapes */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Main gradient orb */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", type: "tween" }}
          className="absolute -top-[20%] -right-[15%] w-[700px] h-[700px] bg-gradient-to-br from-blue-400/20 to-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 40, 0],
            x: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1, type: "tween" }}
          className="absolute top-[50%] -left-[15%] w-[500px] h-[500px] bg-gradient-to-tr from-orange-300/15 to-yellow-200/10 rounded-full blur-3xl"
        />
        {/* Decorative grid */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-30 dark:opacity-10" />
      </div>

      <div className="container mx-auto px-6 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Left Content (Typography) */}
          <motion.div
            className="flex-1 max-w-2xl text-center lg:text-left"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >

            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
              Sistem Informasi{' '}
              <span className="bg-gradient-to-r from-primary via-blue-600 to-primary bg-clip-text text-transparent">
                Sarana & Prasarana
              </span>{' '}
              yang Terintegrasi
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              Platform digital terpusat untuk monitoring, pendataan, dan pelaporan infrastruktur pendidikan SMP <strong className="text-foreground">Nias Selatan</strong> yang transparan dan akuntabel.
            </motion.p>

            {/* Highlight Pills */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-8">
              {highlights.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3 py-2 rounded-full bg-white dark:bg-slate-800 border border-border/50 shadow-sm text-sm font-medium"
                >
                  <item.icon className="w-4 h-4 text-primary" />
                  <span>{item.text}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center sm:gap-4 justify-center lg:justify-start gap-4">
              <Link href="/sign-in" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full h-14 rounded-full text-base px-8 shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:scale-105 transition-all duration-300 bg-gradient-to-r from-primary to-blue-600"
                >
                  Mulai Input Data
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="#features" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full h-14 rounded-full text-base px-8 border-2 border-primary/30 hover:bg-primary/5 hover:border-primary text-foreground"
                >
                  Pelajari Fitur
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Content (Illustration) */}
          <motion.div
            className="flex-1 w-full max-w-[600px] relative"
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {/* Main Illustration Container */}
            <div className="relative">
              {/* Glow Effect Behind */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-blue-500/20 to-orange-400/20 rounded-3xl blur-3xl scale-110" />

              {/* Illustration */}
              <motion.div
                className="relative z-10"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", type: "tween" }}
              >
                <Image
                  src="/hero-illustration.png"
                  alt="Platform Pendidikan Digital SISP"
                  width={600}
                  height={500}
                  className="w-full h-auto object-contain drop-shadow-2xl"
                  priority
                />
              </motion.div>

              {/* Floating Card - Total Sekolah */}
              <motion.div
                className="absolute -left-4 md:-left-8 top-1/4 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-border/30 z-20"
                initial={{ opacity: 0, x: -30, y: 0 }}
                whileInView={{ opacity: 1, x: 0 }}
                animate={{ y: [0, -8, 0] }}
                transition={{
                  opacity: { delay: 0.6, duration: 0.5 },
                  x: { delay: 0.6, duration: 0.5 },
                  y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-primary flex items-center justify-center">
                    <School className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground font-medium">Sekolah Terdata</div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">138+</div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Card - Data Updated */}
              <motion.div
                className="absolute -right-4 md:-right-8 bottom-1/4 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-border/30 z-20"
                initial={{ opacity: 0, x: 30, y: 0 }}
                whileInView={{ opacity: 1, x: 0 }}
                animate={{ y: [0, 8, 0] }}
                transition={{
                  opacity: { delay: 0.8, duration: 0.5 },
                  x: { delay: 0.8, duration: 0.5 },
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                      Data Real-time
                    </div>
                    <div className="text-sm font-semibold text-foreground">Monitoring Aktif</div>
                  </div>
                </div>
              </motion.div>


            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
