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
      className="py-24 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-orange-400/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-green-500/5 rounded-full blur-xl"></div>
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
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-400/10 border border-orange-400/20 rounded-full text-orange-600 font-medium text-sm mb-6 backdrop-blur-sm"
          >
            <Target className="w-4 h-4" />
            <span>Proses Terstruktur</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Proses Analisis Prioritas
            <span className="block text-2xl md:text-3xl text-muted-foreground mt-2">
              yang Sistematis dan Akurat
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Data yang dikumpulkan melalui proses yang terstruktur untuk
            menghasilkan rekomendasi prioritas kebutuhan yang akurat dan dapat
            diandalkan
          </p>
        </motion.div>

        {/* Process Steps */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Connection Line for Desktop */}
          <div className="hidden lg:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                    y: -10,
                    transition: { duration: 0.3 },
                  }}
                  className="text-center relative group"
                >
                  {/* Connection Dots for Desktop */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-20 right-0 w-8 h-0.5 bg-primary/30 z-10">
                      <motion.div
                        className="absolute right-0 top-[-2px] w-2 h-2 bg-primary/50 rounded-full"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.5,
                        }}
                      />
                    </div>
                  )}

                  {/* Step Card */}
                  <div
                    className={`relative p-8 bg-gradient-to-br ${step.bgColor} border ${step.borderColor} rounded-2xl backdrop-blur-sm shadow-lg group-hover:shadow-2xl transition-all duration-500`}
                  >
                    {/* Background Glow */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${step.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}
                    ></div>

                    <div className="relative z-10">
                      {/* Step Number */}
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
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
                          scale: 1.1,
                          rotate: 5,
                        }}
                        transition={{ duration: 0.3 }}
                        className="relative mb-6"
                      >
                        <div
                          className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.bgColor} border ${step.borderColor} flex items-center justify-center mx-auto shadow-lg`}
                        >
                          <StepIcon
                            className={`bg-gradient-to-r ${step.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}
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
                    </div>
                  </div>

                  {/* Mobile Connection Line */}
                  {index < processSteps.length - 1 && (
                    <div className="block lg:hidden w-0.5 h-12 bg-gradient-to-b from-primary/30 to-transparent mx-auto mt-4"></div>
                  )}
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
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Proses yang Transparan dan Akuntabel
            </h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Setiap tahap dalam proses analisis dirancang untuk memastikan
              akurasi data dan transparansi dalam penentuan prioritas kebutuhan
              sarana prasarana.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <a
                href="#statistics"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
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
