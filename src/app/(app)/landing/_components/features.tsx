'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import {
  Building2,
  TrendingUp,
  ClipboardList,
  FolderOpen,
  Bell,
  LucideIcon,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Feature {
  id: number;
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    id: 1,
    icon: Building2,
    title: 'Pendataan Sarana',
    description:
      'Input data kondisi sarana sekolah untuk analisis prioritas kebutuhan.',
  },
  {
    id: 2,
    icon: ClipboardList,
    title: 'Pendataan Prasarana',
    description:
      'Input data kondisi prasarana untuk evaluasi prioritas perbaikan dan pengadaan.',
  },
  {
    id: 3,
    icon: TrendingUp,
    title: 'Analisis Prioritas Otomatis',
    description:
      'Sistem menganalisis data untuk menentukan prioritas kebutuhan berdasarkan kondisi terkini.',
  },
  {
    id: 4,
    icon: Building2,
    title: 'Data Rombongan Belajar dan Siswa',
    description:
      'Kelola data rombongan belajar dan siswa untuk analisis kebutuhan yang lebih mendalam.',
  },
  {
    id: 5,
    icon: FolderOpen,
    title: 'Laporan Prioritas',
    description:
      'Generate laporan prioritas kebutuhan untuk mendukung pengambilan keputusan Dinas Pendidikan.',
  },
  {
    id: 6,
    icon: Bell,
    title: 'Monitoring Kebutuhan',
    description:
      'Pantau dan update prioritas kebutuhan dari seluruh SMP di Nias Selatan secara real-time.',
  },
];

const Features: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15,
      },
    },
  };
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  return (
    <>
      {/* Features Section */}
      <section
        id="features"
        className="py-24 relative overflow-hidden bg-background"
      >
        {/* Enhanced background graphics inspired by auth design */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Base background layer */}
          <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-background dark:from-muted/10 dark:via-background dark:to-background"></div>{' '}
          {/* Animated gradient orbs for depth */}
          <div className="absolute top-20 left-12 w-40 h-40 bg-gradient-to-br from-primary/40 to-blue-600/20 dark:from-primary/25 dark:to-blue-600/15 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute top-60 right-16 w-32 h-32 bg-gradient-to-br from-blue-600/30 to-primary/15 dark:from-blue-600/20 dark:to-primary/12 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: '2s', animationDuration: '4s' }}
          ></div>
          <div
            className="absolute bottom-40 left-20 w-36 h-36 bg-gradient-to-br from-slate-600/25 to-slate-700/15 dark:from-slate-500/15 dark:to-slate-600/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: '4s', animationDuration: '6s' }}
          ></div>{' '}
          {/* Educational geometric grid */}
          <div className="absolute top-32 left-16">
            <div className="grid grid-cols-3 gap-8 opacity-60 dark:opacity-35">
              <div className="w-3 h-3 border-2 border-primary/50 dark:border-primary/30 rounded-sm"></div>
              <div className="w-3 h-3 border-2 border-blue-600/40 dark:border-blue-500/25"></div>
              <div className="w-3 h-3 border-2 border-primary/50 dark:border-primary/30 rounded-full"></div>
              <div className="w-3 h-3 border-2 border-blue-600/40 dark:border-blue-500/25"></div>
              <div className="w-3 h-3 bg-primary/30 dark:bg-primary/20 rounded-sm"></div>
              <div className="w-3 h-3 border-2 border-blue-600/50 dark:border-blue-500/30 rounded-sm"></div>
              <div className="w-3 h-3 border-2 border-primary/40 dark:border-primary/25 rounded-full"></div>
              <div className="w-3 h-3 border-2 border-blue-600/40 dark:border-blue-500/25 rounded-sm"></div>
              <div className="w-3 h-3 bg-blue-600/25 dark:bg-blue-500/18"></div>
            </div>
          </div>{' '}
          {/* Circular tech elements */}
          <div className="absolute top-1/4 right-20">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 w-24 h-24 border-2 border-primary/30 dark:border-primary/25 rounded-full"></div>
              <div className="absolute inset-3 w-18 h-18 border border-primary/25 dark:border-primary/20 rounded-full"></div>
              <div className="absolute inset-6 w-12 h-12 border border-blue-600/25 dark:border-blue-500/20 rounded-full"></div>
              <div className="absolute inset-9 w-6 h-6 bg-primary/25 dark:bg-primary/18 rounded-full"></div>
            </div>
          </div>{' '}
          {/* School building/infrastructure representations */}
          <div className="absolute bottom-1/3 left-1/4">
            <div className="relative opacity-40 dark:opacity-25">
              {/* Building blocks */}
              <div className="w-8 h-6 bg-primary/50 dark:bg-primary/30 rounded-sm mb-4 shadow-sm"></div>
              <div className="w-6 h-4 bg-blue-600/40 dark:bg-blue-500/25 rounded-sm ml-2 mb-3 shadow-sm"></div>
              <div className="w-10 h-7 bg-slate-600/40 dark:bg-slate-500/25 rounded-sm shadow-sm"></div>
              {/* Windows */}
              <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-background/60 rounded-xs"></div>
              <div className="absolute top-1 left-4 w-1.5 h-1.5 bg-background/60 rounded-xs"></div>
            </div>
          </div>
          {/* Data flow lines */}
          <div className="absolute top-1/3 left-1/3 opacity-35 dark:opacity-25">
            <div className="w-24 h-1 bg-gradient-to-r from-primary/50 dark:from-primary/30 to-transparent mb-3 rotate-12 rounded-full shadow-sm"></div>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600/40 dark:from-blue-500/25 to-transparent mb-3 rotate-12 ml-2 rounded-full shadow-sm"></div>
            <div className="w-16 h-1 bg-gradient-to-r from-slate-600/35 dark:from-slate-500/20 to-transparent rotate-12 ml-4 rounded-full shadow-sm"></div>
          </div>
          {/* Education and infrastructure symbols */}
          <div className="absolute bottom-1/4 right-1/3">
            <div className="relative opacity-35 dark:opacity-25">
              {/* School symbol */}
              <div className="w-8 h-2 bg-primary/50 dark:bg-primary/30 rounded-full mb-1 shadow-sm"></div>
              <div className="w-6 h-6 bg-primary/40 dark:bg-primary/25 transform rotate-45 mx-1 shadow-sm"></div>
            </div>
          </div>{' '}
          {/* Infrastructure/facility icons */}
          <div className="absolute top-2/3 right-16">
            <div className="relative opacity-35 dark:opacity-25">
              {/* Facility/room representation */}
              <div className="w-6 h-8 border-2 border-blue-600/40 dark:border-blue-500/25 rounded-sm shadow-sm"></div>
              <div className="absolute inset-1 w-4 h-6 bg-blue-600/30 dark:bg-blue-500/18 rounded-sm"></div>
              <div className="absolute top-2 left-1.5 w-3 h-1 bg-background/70 rounded-xs"></div>
            </div>
          </div>
          {/* System connectivity lines */}
          <div className="absolute top-1/2 left-1/4 w-32 h-0.5 bg-gradient-to-r from-primary/35 dark:from-primary/20 via-primary/20 dark:via-primary/12 to-transparent rotate-6 opacity-50 dark:opacity-35 shadow-sm"></div>
          <div className="absolute top-3/5 right-1/4 w-28 h-0.5 bg-gradient-to-l from-blue-600/35 dark:from-blue-500/20 via-blue-600/20 dark:via-blue-500/12 to-transparent -rotate-6 opacity-50 dark:opacity-35 shadow-sm"></div>
          {/* Abstract data symbols */}
          <div className="absolute top-1/6 right-1/5 text-primary/25 dark:text-primary/15 text-xl font-light select-none">
            📊
          </div>
          <div className="absolute bottom-1/5 left-1/6 text-blue-600/25 dark:text-blue-500/15 text-xl font-light select-none">
            🏫
          </div>
          {/* Additional scattered tech elements */}
          <div className="absolute top-1/2 right-1/3">
            <div className="w-4 h-4 border-2 border-primary/30 dark:border-primary/20 rotate-45"></div>
          </div>
          <div className="absolute bottom-1/2 left-1/3">
            <div className="w-3 h-3 bg-blue-600/30 dark:bg-blue-500/20 rounded-full"></div>
          </div>
          <div className="absolute top-3/4 left-1/2">
            <div className="w-5 h-5 border border-slate-600/25 dark:border-slate-500/18 rounded-sm rotate-12"></div>
          </div>
          {/* Enhanced depth overlays */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/4 dark:via-primary/3 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-100/3 dark:from-slate-600/3 via-transparent to-blue-100/4 dark:to-blue-600/3"></div>
        </div>
        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          {' '}
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/15 dark:bg-primary/20 border border-primary/30 dark:border-primary/40 rounded-full text-primary dark:text-primary font-medium text-sm mb-6 backdrop-blur-sm shadow-lg dark:shadow-primary/20">
              <TrendingUp className="w-4 h-4" />
              <span>Fitur Unggulan</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-foreground mb-6 drop-shadow-sm">
              Solusi Lengkap Analisis
              <span className="block bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent drop-shadow-sm">
                Prioritas Sarana Prasarana
              </span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Sistem terintegrasi untuk mengumpulkan data, menganalisis
              prioritas kebutuhan, dan melaporkan rekomendasi pembangunan sarana
              prasarana SMP di Nias Selatan.
            </p>
          </motion.div>
          {/* Features Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {features.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={feature.id}
                  variants={itemVariants}
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.15, ease: 'easeOut' },
                  }}
                  className="group h-full"
                >
                  <Card className="no-text-blur p-6 h-full border border-border/50 hover:border-primary/40 bg-background/80 dark:bg-background/90 backdrop-blur-md shadow-lg hover:shadow-2xl dark:shadow-primary/5 dark:hover:shadow-primary/10 transition-[border-color,box-shadow,background-color] duration-150 relative overflow-hidden">
                    {/* Hover Background Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-blue-500/8 opacity-0 group-hover:opacity-100 transition-opacity duration-150"></div>

                    {/* Dark mode specific gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-background/20 to-transparent dark:from-foreground/5 dark:to-transparent opacity-50 dark:opacity-30"></div>

                    <div className="relative z-10 flex flex-col h-full">
                      {/* Icon */}
                      <div className="mb-6">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/15 to-primary/8 dark:from-primary/20 dark:to-primary/10 flex items-center justify-center group-hover:from-primary/20 group-hover:to-primary/15 dark:group-hover:from-primary/25 dark:group-hover:to-primary/15 transition-colors duration-150 shadow-md dark:shadow-primary/20">
                          <IconComponent
                            className="text-primary transition-transform duration-150 group-hover:scale-110"
                            size={28}
                          />
                        </div>
                      </div>{' '}
                      {/* Content */}
                      <div className="flex-grow">
                        <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-150">
                          {feature.title}
                        </h3>

                        <p className="text-muted-foreground leading-relaxed text-sm">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Features;
