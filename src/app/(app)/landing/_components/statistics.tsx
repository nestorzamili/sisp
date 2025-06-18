'use client';

import React from 'react';
import Image from 'next/image';
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
      {/* Statistics Section */}
      <section
        id="statistics"
        className="py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-2xl"></div>
        </div>

        <div className="container mx-auto max-w-[1440px] px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary font-medium text-sm mb-6 backdrop-blur-sm"
              >
                <TrendingUp className="w-4 h-4" />
                <span>Target & Pencapaian</span>
              </motion.div>

              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Target Analisis Prioritas
                <span className="block bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  SMP Nias Selatan
                </span>
              </h2>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                Sistem menganalisis prioritas kebutuhan sarana prasarana dari
                seluruh SMP di Kabupaten Nias Selatan untuk perencanaan
                pembangunan yang efektif dan berkelanjutan.
              </p>

              {/* Statistics Grid */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="grid grid-cols-2 gap-6"
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
                        scale: 1.05,
                        transition: { duration: 0.3 },
                      }}
                      className={`p-6 bg-gradient-to-br ${stat.bgColor} border ${stat.borderColor} rounded-2xl backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 group`}
                    >
                      <div className="flex items-center gap-4 mb-3">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.2 }}
                          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.bgColor} border ${stat.borderColor} flex items-center justify-center`}
                        >
                          <StatIcon
                            className={`bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                            size={20}
                          />
                        </motion.div>
                        <div className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                          {stat.value}
                        </div>
                      </div>
                      <div className="font-semibold text-foreground mb-1">
                        {stat.label}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {stat.description}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-2xl overflow-hidden shadow-2xl group"
              >
                {/* Image */}
                <Image
                  src="/school.png"
                  alt="Peta Sebaran SMP Nias Selatan"
                  className="w-full h-auto rounded-2xl group-hover:scale-105 transition-transform duration-500"
                  height={500}
                  width={700}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl"></div>

                {/* Floating Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="absolute bottom-6 left-6 right-6"
                >
                  <div className="bg-background/90 backdrop-blur-md rounded-xl p-4 border border-border/50 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-foreground">
                          Nias Selatan
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Kabupaten
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          138
                        </div>
                        <div className="text-sm text-muted-foreground">
                          SMP Total
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 3, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -top-6 -right-6 w-24 h-24 bg-primary/10 rounded-2xl backdrop-blur-sm border border-primary/20 flex items-center justify-center shadow-lg"
              >
                <Target className="text-primary" size={32} />
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 8, 0],
                  x: [0, 5, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 2,
                }}
                className="absolute -bottom-4 -left-4 w-20 h-20 bg-blue-500/10 rounded-full backdrop-blur-sm border border-blue-500/20 flex items-center justify-center shadow-lg"
              >
                <MapPin className="text-blue-600" size={24} />
              </motion.div>
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
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Analisis Menyeluruh untuk Pembangunan Berkelanjutan
              </h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Dengan cakupan 100% SMP di Nias Selatan, sistem ini memberikan
                gambaran lengkap kondisi sarana prasarana untuk mendukung
                pengambilan keputusan yang tepat dalam alokasi anggaran
                pembangunan.
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
