'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import {
  Building2,
  Wrench,
  GraduationCap,
  User,
  Users,
  Building,
  FlaskConical,
  Laptop,
  Languages,
  BookOpen,
  DoorOpen,
  UserCheck,
  LucideIcon,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface CategoryItem {
  name: string;
  icon: LucideIcon;
}

interface CategoryData {
  title: string;
  description: string;
  icon: LucideIcon;
  items: CategoryItem[];
}

const categoriesData: CategoryData[] = [
  {
    title: 'Sarana',
    description: 'Bangunan dan ruangan sekolah',
    icon: Building2,
    items: [
      { name: 'Ruang Kelas', icon: GraduationCap },
      { name: 'Ruang Kepala Sekolah', icon: User },
      { name: 'Ruang Guru', icon: Users },
      { name: 'Aula Pertemuan', icon: Building },
      { name: 'Laboratorium IPA', icon: FlaskConical },
      { name: 'Laboratorium Komputer', icon: Laptop },
      { name: 'Laboratorium Bahasa', icon: Languages },
      { name: 'Perpustakaan', icon: BookOpen },
    ],
  },
  {
    title: 'Prasarana',
    description: 'Peralatan dan perlengkapan pembelajaran',
    icon: Wrench,
    items: [
      { name: 'Meja dan Kursi Siswa', icon: GraduationCap },
      { name: 'Meja Kayu', icon: GraduationCap },
      { name: 'Kursi Kayu', icon: GraduationCap },
      { name: 'Papan Tulis', icon: BookOpen },
      { name: 'Komputer', icon: Laptop },
      { name: 'Toilet Siswa', icon: DoorOpen },
      { name: 'Toilet Guru', icon: UserCheck },
      { name: 'Prasarana Lainnya', icon: Wrench },
    ],
  },
];

const Facilities: React.FC = () => {
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
      {/* Facilities Section */}
      <section
        id="facilities"
        className="py-24 relative overflow-hidden bg-background"
      >
        {/* Enhanced background graphics consistent with features */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Base background layer */}
          <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/15 dark:from-background dark:to-muted/8"></div>

          {/* Animated gradient orbs for depth */}
          <div className="absolute top-32 right-12 w-40 h-40 bg-gradient-to-br from-blue-600/35 to-primary/20 dark:from-blue-600/20 dark:to-primary/12 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 left-16 w-32 h-32 bg-gradient-to-br from-primary/30 to-blue-600/15 dark:from-primary/18 dark:to-blue-600/10 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: '3s', animationDuration: '5s' }}
          ></div>
          <div
            className="absolute top-1/2 right-1/4 w-24 h-24 bg-gradient-to-br from-slate-600/20 to-slate-700/10 dark:from-slate-500/12 dark:to-slate-600/6 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: '1s', animationDuration: '4s' }}
          ></div>

          {/* Data collection themed elements */}
          <div className="absolute top-20 left-20">
            <div className="grid grid-cols-2 gap-6 opacity-50 dark:opacity-25">
              <div className="w-4 h-4 border-2 border-blue-600/40 dark:border-blue-500/20 rounded-sm"></div>
              <div className="w-4 h-4 bg-primary/30 dark:bg-primary/15 rounded-full"></div>
              <div className="w-4 h-4 bg-blue-600/25 dark:bg-blue-500/15 rounded-sm"></div>
              <div className="w-4 h-4 border-2 border-primary/40 dark:border-primary/20 rounded-full"></div>
            </div>
          </div>

          {/* Database/storage representations */}
          <div className="absolute bottom-1/4 right-1/5">
            <div className="relative opacity-30 dark:opacity-18">
              {/* Server/database icons */}
              <div className="w-12 h-3 bg-blue-600/60 dark:bg-blue-500/30 rounded-sm mb-1"></div>
              <div className="w-12 h-3 bg-primary/50 dark:bg-primary/25 rounded-sm mb-1"></div>
              <div className="w-12 h-3 bg-slate-600/50 dark:bg-slate-500/25 rounded-sm"></div>
            </div>
          </div>

          {/* Collection/gathering lines */}
          <div className="absolute top-1/4 left-1/3 opacity-25 dark:opacity-15">
            <div className="w-20 h-0.5 bg-gradient-to-r from-blue-600/50 dark:from-blue-500/25 to-transparent mb-2 rotate-6 rounded-full"></div>
            <div className="w-16 h-0.5 bg-gradient-to-r from-primary/50 dark:from-primary/25 to-transparent mb-2 rotate-6 ml-1 rounded-full"></div>
            <div className="w-24 h-0.5 bg-gradient-to-r from-slate-600/40 dark:from-slate-500/20 to-transparent rotate-6 ml-2 rounded-full"></div>
          </div>

          {/* Abstract collection symbols */}
          <div className="absolute top-1/6 left-1/5 text-blue-600/20 dark:text-blue-500/12 text-lg font-light select-none">
            📋
          </div>
          <div className="absolute bottom-1/6 right-1/6 text-primary/20 dark:text-primary/12 text-lg font-light select-none">
            📊
          </div>

          {/* Subtle depth overlays */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-600/3 dark:via-blue-600/2 to-transparent"></div>
        </div>

        <div className="container mx-auto max-w-[1440px] px-6 relative z-10">
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
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/15 dark:bg-blue-600/20 border border-blue-600/30 dark:border-blue-600/40 rounded-full text-blue-600 dark:text-blue-500 font-medium text-sm mb-6 backdrop-blur-sm shadow-lg dark:shadow-blue-600/20"
            >
              <Building2 className="w-4 h-4" />
              <span>Data Komprehensif</span>
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-foreground mb-6 drop-shadow-sm">
              Data yang Dikumpulkan
              <span className="block text-2xl md:text-3xl text-slate-600 dark:text-slate-300 mt-2">
                untuk Analisis Mendalam
              </span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed">
              Sistem mengumpulkan data komprehensif untuk analisis prioritas
              kebutuhan yang akurat dan tepat sasaran
            </p>
            {/* Summary Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-wrap justify-center items-center gap-8 mb-16"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/10 backdrop-blur-sm min-w-[120px]"
              >
                <div className="text-3xl font-bold text-primary mb-1">8+</div>
                <div className="text-sm text-muted-foreground">
                  Kategori Sarana
                </div>
              </motion.div>

              <div className="w-px h-16 bg-border hidden sm:block"></div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-2xl border border-blue-500/10 backdrop-blur-sm min-w-[120px]"
              >
                <div className="text-3xl font-bold text-blue-600 mb-1">10+</div>
                <div className="text-sm text-muted-foreground">
                  Kategori Prasarana
                </div>
              </motion.div>

              <div className="w-px h-16 bg-border hidden sm:block"></div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 bg-gradient-to-br from-orange-400/10 to-orange-400/5 rounded-2xl border border-orange-400/10 backdrop-blur-sm min-w-[120px]"
              >
                <div className="text-3xl font-bold text-orange-600 mb-1">
                  3+
                </div>
                <div className="text-sm text-muted-foreground">
                  Level Kondisi
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
          {/* Main Categories Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            {categoriesData.map((category, categoryIndex) => {
              const CategoryIcon = category.icon;

              return (
                <motion.div
                  key={categoryIndex}
                  initial={{ opacity: 0, y: 60, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: categoryIndex * 0.3 }}
                  whileHover={{
                    y: -4,
                    scale: 1.02,
                    transition: { duration: 0.15 },
                  }}
                  className="group smooth-transform no-text-blur"
                >
                  <Card className="feature-card p-10 border-2 border-transparent hover:border-primary/20 bg-gradient-to-br from-background to-muted/20 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                    {/* Background Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative z-10">
                      {/* Header */}
                      <div className="flex items-center mb-8">
                        {' '}
                        <motion.div
                          whileHover={{
                            scale: 1.05,
                            rotate: 2,
                          }}
                          transition={{ duration: 0.15 }}
                          className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent/80 to-accent/40 flex items-center justify-center mr-6 relative"
                        >
                          {' '}
                          <CategoryIcon
                            className="text-primary group-hover:scale-105 transition-transform duration-150"
                            size={36}
                          />
                          {/* Animated Ring */}
                          <motion.div
                            className="absolute inset-0 rounded-2xl border-2 border-primary/20"
                            animate={{
                              scale: [1, 1.1, 1],
                              opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }}
                          />
                        </motion.div>
                        <div>
                          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                            {category.title}
                          </h3>
                          <p className="text-muted-foreground text-lg">
                            {category.description}
                          </p>
                        </div>
                      </div>

                      {/* Items Grid */}
                      <motion.div
                        variants={containerVariants}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                      >
                        {category.items.map((item, itemIndex) => {
                          const ItemIcon = item.icon;
                          return (
                            <motion.div
                              key={itemIndex}
                              variants={itemVariants}
                              whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.15 },
                              }}
                              className="flex items-center p-4 bg-gradient-to-r from-card/60 to-card/30 rounded-xl shadow-sm border border-border/50 hover:shadow-md hover:border-primary/20 transition-all duration-150 backdrop-blur-sm smooth-transform no-text-blur"
                            >
                              {' '}
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.15 }}
                                className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mr-3"
                              >
                                <ItemIcon className="text-primary" size={18} />
                              </motion.div>
                              <span className="text-sm font-medium text-card-foreground">
                                {item.name}
                              </span>
                            </motion.div>
                          );
                        })}
                      </motion.div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>{' '}
          {/* Bottom Section */}
        </div>
      </section>
    </>
  );
};

export default Facilities;
