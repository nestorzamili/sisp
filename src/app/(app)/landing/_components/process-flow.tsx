'use client';

import React from 'react';
import { Building2, Target, CheckCircle, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

const ProcessFlow: React.FC = () => {
  const processSteps = [
    {
      icon: Building2,
      title: 'Input Data',
      description: 'Sekolah menginput kondisi sarana dan prasarana',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-500/10 to-blue-500/5',
      borderColor: 'border-blue-500/20',
    },
    {
      icon: CheckCircle,
      title: 'Verifikasi Data',
      description: 'Tim verifikasi melakukan validasi data yang diinput',
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-500/10 to-green-500/5',
      borderColor: 'border-green-500/20',
    },
    {
      icon: Target,
      title: 'Analisis Sistem',
      description: 'Sistem menganalisis dan menentukan prioritas',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'from-orange-500/10 to-orange-500/5',
      borderColor: 'border-orange-500/20',
    },
    {
      icon: BarChart3,
      title: 'Laporan',
      description: 'Dinas Pendidikan mendapat laporan prioritas',
      color: 'from-primary to-blue-600',
      bgColor: 'from-primary/10 to-primary/5',
      borderColor: 'border-primary/20',
    },
  ];

  return (
    <section
      id="process"
      className="py-24 relative overflow-hidden bg-background"
    >
      {/* Enhanced background graphics consistent with features/facilities */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Base background layer */}
        <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/15 dark:from-background dark:to-muted/8"></div>

        {/* Animated gradient orbs for depth */}
        <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-br from-orange-500/35 to-primary/20 dark:from-orange-500/20 dark:to-primary/12 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-br from-green-500/30 to-blue-600/15 dark:from-green-500/18 dark:to-blue-600/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '2s', animationDuration: '5s' }}
        ></div>
        <div
          className="absolute top-1/2 right-1/4 w-32 h-32 bg-gradient-to-br from-blue-600/25 to-orange-500/15 dark:from-blue-600/15 dark:to-orange-500/10 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: '1s', animationDuration: '4s' }}
        ></div>

        {/* Process flow themed elements */}
        <div className="absolute top-1/4 left-1/6">
          <div className="flex items-center gap-3 opacity-40 dark:opacity-20">
            <div className="w-4 h-4 bg-green-500/50 dark:bg-green-500/25 rounded-full"></div>
            <div className="w-8 h-0.5 bg-gradient-to-r from-green-500/50 dark:from-green-500/25 to-orange-500/50 dark:to-orange-500/25 rounded-full"></div>
            <div className="w-4 h-4 bg-orange-500/50 dark:bg-orange-500/25 rounded-full"></div>
          </div>
        </div>

        {/* Workflow arrows/connections */}
        <div className="absolute bottom-1/3 left-1/4">
          <div className="opacity-25 dark:opacity-15">
            <div className="w-16 h-0.5 bg-gradient-to-r from-primary/60 dark:from-primary/30 to-transparent rotate-12 rounded-full mb-1"></div>
            <div className="w-20 h-0.5 bg-gradient-to-r from-blue-600/50 dark:from-blue-600/25 to-transparent rotate-12 ml-2 rounded-full"></div>
          </div>
        </div>

        {/* Process steps indicators */}
        <div className="absolute top-1/6 right-1/6">
          <div className="grid grid-cols-2 gap-2 opacity-30 dark:opacity-18">
            <div className="w-3 h-3 border border-green-500/60 dark:border-green-500/30 rounded-full"></div>
            <div className="w-3 h-3 bg-orange-500/60 dark:bg-orange-500/30 rounded-full"></div>
            <div className="w-3 h-3 bg-primary/60 dark:bg-primary/30 rounded-full"></div>
            <div className="w-3 h-3 border border-blue-600/60 dark:border-blue-600/30 rounded-full"></div>
          </div>
        </div>

        {/* Abstract process symbols */}
        <div className="absolute bottom-1/4 right-1/5 text-primary/20 dark:text-primary/12 text-lg font-light select-none">
          ⚙️
        </div>
        <div className="absolute top-1/5 left-1/3 text-orange-500/20 dark:text-orange-500/12 text-lg font-light select-none">
          📈
        </div>

        {/* Subtle depth overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-orange-500/3 dark:via-orange-500/2 to-transparent"></div>
      </div>

      <div className="container mx-auto max-w-[1440px] px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          {' '}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/15 dark:bg-orange-500/20 border border-orange-500/30 dark:border-orange-500/40 rounded-full text-orange-600 dark:text-orange-500 font-medium text-sm mb-6 backdrop-blur-sm shadow-lg dark:shadow-orange-500/20"
          >
            <Target className="w-4 h-4" />
            <span>Proses Terstruktur</span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-foreground mb-6 drop-shadow-sm">
            Proses Analisis Prioritas
            <span className="block text-2xl md:text-3xl text-slate-600 dark:text-slate-300 mt-2">
              yang Sistematis dan Akurat
            </span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Data yang dikumpulkan melalui proses yang terstruktur untuk
            menghasilkan rekomendasi prioritas kebutuhan yang akurat dan dapat
            diandalkan
          </p>
        </motion.div>{' '}
        {/* Process Steps */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {processSteps.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.2,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  whileHover={{
                    y: -5,
                    transition: { duration: 0.15 },
                  }}
                  className="text-center relative group"
                >
                  {/* Step Card */}
                  <div
                    className={`relative p-8 bg-gradient-to-br ${step.bgColor} border ${step.borderColor} rounded-2xl backdrop-blur-sm shadow-lg group-hover:shadow-2xl transition-all duration-500`}
                  >
                    {/* Background Glow */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${step.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}
                    ></div>
                    <div className="relative z-10">
                      {' '}
                      {/* Step Number */}
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.15 }}
                        className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-white to-white/90 text-primary rounded-full text-lg font-bold mb-6 shadow-lg relative z-20"
                      >
                        {index + 1}

                        {/* Animated Ring */}
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-primary/30"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.7, 0.3],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: index * 0.5,
                          }}
                        />
                      </motion.div>
                      {/* Icon */}
                      <motion.div
                        whileHover={{
                          scale: 1.05,
                        }}
                        transition={{ duration: 0.15 }}
                        className="relative mb-6"
                      >
                        {' '}
                        <div
                          className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.bgColor} border ${step.borderColor} flex items-center justify-center mx-auto shadow-lg`}
                        >
                          <StepIcon
                            className="text-primary group-hover:scale-105 transition-transform duration-150"
                            size={32}
                          />
                        </div>
                      </motion.div>
                      {/* Content */}
                      <h4 className="font-bold text-foreground mb-3 text-xl group-hover:text-primary transition-colors duration-300">
                        {step.title}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>{' '}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-20"
        >
          {' '}
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground dark:text-foreground mb-4">
              Proses yang Transparan dan Akuntabel
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              Setiap tahap dalam proses analisis dirancang untuk memastikan
              akurasi data dan transparansi dalam penentuan prioritas kebutuhan
              sarana prasarana.
            </p>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="inline-block"
            >
              <a
                href="#statistics"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-150"
              >
                Lihat Statistik
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessFlow;
