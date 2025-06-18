'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import {
  Building2,
  TrendingUp,
  ClipboardList,
  FolderOpen,
  Bell,
  ChevronRight,
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
  return (
    <>
      {/* Features Section */}
      <section
        id="features"
        className="py-24 bg-gradient-to-b from-muted/50 to-background relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-blue-500/5 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-orange-400/5 rounded-full blur-xl"></div>
        </div>

        <div className="container mx-auto max-w-[1440px] px-6 relative z-10">
          {' '}
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
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary font-medium text-sm mb-6 backdrop-blur-sm"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Fitur Unggulan</span>
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Solusi Lengkap Analisis
              <span className="block bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Prioritas Sarana Prasarana
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Sistem terintegrasi untuk mengumpulkan data, menganalisis
              prioritas kebutuhan, dan melaporkan rekomendasi pembangunan sarana
              prasarana SMP di Nias Selatan dengan teknologi terdepan.
            </p>
          </motion.div>{' '}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.2, delayChildren: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{
                    y: -10,
                    transition: { duration: 0.3 },
                  }}
                  className="group"
                >
                  <Card className="feature-card p-8 h-full border-2 border-transparent hover:border-primary/20 bg-gradient-to-br from-background to-muted/30 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                    {/* Background Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative z-10 flex flex-col h-full">
                      {/* Icon */}
                      <motion.div
                        whileHover={{
                          scale: 1.1,
                          rotate: 5,
                        }}
                        transition={{ duration: 0.3 }}
                        className="relative mb-6"
                      >
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center relative">
                          <IconComponent
                            className="text-primary group-hover:scale-110 transition-transform duration-300"
                            size={32}
                          />

                          {/* Animated Ring */}
                          <motion.div
                            className="absolute inset-0 rounded-2xl border-2 border-primary/20"
                            animate={{
                              scale: [1, 1.1, 1],
                              opacity: [0.5, 0.8, 0.5],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }}
                          />
                        </div>
                      </motion.div>

                      {/* Content */}
                      <h3 className="text-xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                        {feature.title}
                      </h3>

                      <p className="text-muted-foreground mb-6 flex-grow leading-relaxed">
                        {feature.description}
                      </p>

                      {/* Learn More Link */}
                      <motion.div
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center text-primary font-medium hover:text-primary/80 cursor-pointer transition-colors duration-300"
                      >
                        <span>Pelajari Lebih Lanjut</span>
                        <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </motion.div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-16"
          >
            <p className="text-muted-foreground mb-6">
              Siap mengoptimalkan pengelolaan sarana prasarana sekolah Anda?
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Mulai Sekarang
                <ChevronRight className="w-5 h-5" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Features;
