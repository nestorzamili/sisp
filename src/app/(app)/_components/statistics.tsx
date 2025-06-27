'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Target, MapPin } from 'lucide-react';

const Statistics: React.FC = () => {
  const stats = [
    {
      icon: Users,
      value: '138',
      label: 'Total SMP',
      description: 'Se-Nias Selatan',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-500/10 to-blue-500/5',
      borderColor: 'border-blue-500/20',
    },
    {
      icon: Target,
      value: '13',
      label: 'Kategori Data',
      description: 'Sarana & Prasarana',
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-500/10 to-green-500/5',
      borderColor: 'border-green-500/20',
    },
    {
      icon: TrendingUp,
      value: '3',
      label: 'Level Prioritas',
      description: 'Sistem Analisis',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'from-orange-500/10 to-orange-500/5',
      borderColor: 'border-orange-500/20',
    },
    {
      icon: MapPin,
      value: '100%',
      label: 'Cakupan Analisis',
      description: 'Seluruh Wilayah',
      color: 'from-primary to-blue-600',
      bgColor: 'from-primary/10 to-primary/5',
      borderColor: 'border-primary/20',
    },
  ];

  return (
    <>
      {' '}
      {/* Statistics Section */}
      <section
        id="statistics"
        className="py-24 relative overflow-hidden bg-background"
      >
        {/* Enhanced background graphics consistent with other sections */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Base background layer */}
          <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/15 dark:from-background dark:to-muted/8"></div>

          {/* Animated gradient orbs for depth */}
          <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-primary/35 to-blue-600/20 dark:from-primary/20 dark:to-blue-600/12 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-br from-blue-500/30 to-green-500/15 dark:from-blue-500/18 dark:to-green-500/10 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: '2s', animationDuration: '5s' }}
          ></div>
          <div
            className="absolute top-1/2 left-1/4 w-32 h-32 bg-gradient-to-br from-green-500/25 to-orange-500/15 dark:from-green-500/15 dark:to-orange-500/10 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: '1s', animationDuration: '4s' }}
          ></div>

          {/* Statistics themed elements */}
          <div className="absolute top-1/4 left-1/6">
            <div className="grid grid-cols-3 gap-2 opacity-40 dark:opacity-20">
              <div className="w-3 h-8 bg-primary/50 dark:bg-primary/25 rounded-sm"></div>
              <div className="w-3 h-6 bg-blue-600/50 dark:bg-blue-600/25 rounded-sm"></div>
              <div className="w-3 h-10 bg-green-500/50 dark:bg-green-500/25 rounded-sm"></div>
            </div>
          </div>

          {/* Data visualization elements */}
          <div className="absolute bottom-1/3 right-1/6">
            <div className="opacity-25 dark:opacity-15">
              <div className="flex items-end gap-1 mb-2">
                <div className="w-2 h-6 bg-gradient-to-t from-primary/60 dark:from-primary/30 to-transparent rounded-sm"></div>
                <div className="w-2 h-8 bg-gradient-to-t from-blue-600/60 dark:from-blue-600/30 to-transparent rounded-sm"></div>
                <div className="w-2 h-4 bg-gradient-to-t from-green-500/60 dark:from-green-500/30 to-transparent rounded-sm"></div>
              </div>
            </div>
          </div>

          {/* Geographic/mapping elements */}
          <div className="absolute top-1/6 right-1/3">
            <div className="opacity-30 dark:opacity-18">
              <div className="w-8 h-8 border-2 border-primary/50 dark:border-primary/25 rounded-full relative">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary/60 dark:bg-primary/30 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Abstract statistics symbols */}
          <div className="absolute bottom-1/4 left-1/5 text-green-500/20 dark:text-green-500/12 text-lg font-light select-none">
            📊
          </div>
          <div className="absolute top-1/5 right-1/5 text-primary/20 dark:text-primary/12 text-lg font-light select-none">
            🎯
          </div>

          {/* Subtle depth overlays */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/3 dark:via-primary/2 to-transparent"></div>
        </div>

        <div className="container mx-auto max-w-[1440px] px-6 relative z-10">
          {' '}
          <div className="grid grid-cols-1 gap-16">
            {/* Header Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              {' '}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary/15 dark:bg-primary/20 border border-primary/30 dark:border-primary/40 rounded-full text-primary dark:text-primary font-medium text-sm mb-6 backdrop-blur-sm shadow-lg dark:shadow-primary/20"
              >
                <TrendingUp className="w-4 h-4" />
                <span>Target & Pencapaian</span>
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-foreground mb-6 drop-shadow-sm">
                Target Analisis Prioritas
                <span className="block text-2xl md:text-3xl text-slate-600 dark:text-slate-300 mt-2">
                  SMP Nias Selatan
                </span>
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-10 leading-relaxed">
                Sistem menganalisis prioritas kebutuhan sarana prasarana dari
                seluruh SMP di Kabupaten Nias Selatan untuk perencanaan
                pembangunan yang efektif dan berkelanjutan.
              </p>{' '}
              {/* Statistics Grid */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
              >
                {stats.map((stat, index) => {
                  const StatIcon = stat.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.6,
                        delay: index * 0.1 + 0.3,
                      }}
                      whileHover={{
                        scale: 1.02,
                        transition: { duration: 0.15 },
                      }}
                      className={`p-6 bg-gradient-to-br ${stat.bgColor} border ${stat.borderColor} rounded-2xl backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-150 group text-center`}
                    >
                      {/* Icon and Value - Side by Side */}
                      <div className="flex items-center justify-center gap-4 mb-4">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.15 }}
                          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.bgColor} border ${stat.borderColor} flex items-center justify-center`}
                        >
                          <StatIcon
                            className="text-primary group-hover:scale-105 transition-transform duration-150"
                            size={20}
                          />
                        </motion.div>

                        <div className="text-4xl font-bold text-foreground group-hover:text-primary transition-colors duration-150">
                          {stat.value}
                        </div>
                      </div>

                      {/* Label and Description */}
                      <div className="font-semibold text-foreground dark:text-foreground mb-1">
                        {stat.label}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-300">
                        {stat.description}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>{' '}
            </motion.div>
          </div>
          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-20"
          >
            {' '}
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-foreground dark:text-foreground mb-4">
                Analisis Menyeluruh untuk Pembangunan Berkelanjutan
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                Dengan cakupan 100% SMP di Nias Selatan, sistem ini memberikan
                gambaran lengkap kondisi sarana prasarana untuk mendukung
                pengambilan keputusan yang tepat dalam alokasi anggaran
                pembangunan.
              </p>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="inline-block"
              >
                {' '}
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-150"
                  aria-label="Hubungi tim Dinas Pendidikan untuk informasi lebih lanjut"
                >
                  Hubungi Kami
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Statistics;
