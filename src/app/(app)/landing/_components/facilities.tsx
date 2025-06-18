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
      { name: 'Black Board', icon: BookOpen },
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
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <>
      {/* Facilities Section */}
      <section
        id="facilities"
        className="py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-2xl"></div>
        </div>

        <div className="container mx-auto max-w-[1440px] px-6 relative z-10">
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
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-600 font-medium text-sm mb-6 backdrop-blur-sm"
            >
              <Building2 className="w-4 h-4" />
              <span>Data Komprehensif</span>
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Data yang Dikumpulkan
              <span className="block text-2xl md:text-3xl text-muted-foreground mt-2">
                untuk Analisis Mendalam
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
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
                    y: -8,
                    transition: { duration: 0.3 },
                  }}
                  className="group"
                >
                  <Card className="feature-card p-10 border-2 border-transparent hover:border-primary/20 bg-gradient-to-br from-background to-muted/20 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                    {/* Background Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative z-10">
                      {/* Header */}
                      <div className="flex items-center mb-8">
                        <motion.div
                          whileHover={{
                            scale: 1.1,
                            rotate: 5,
                          }}
                          transition={{ duration: 0.3 }}
                          className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent/80 to-accent/40 flex items-center justify-center mr-6 relative"
                        >
                          <CategoryIcon
                            className="text-primary group-hover:scale-110 transition-transform duration-300"
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
                                x: 5,
                                transition: { duration: 0.2 },
                              }}
                              className="flex items-center p-4 bg-gradient-to-r from-card/60 to-card/30 rounded-xl shadow-sm border border-border/50 hover:shadow-md hover:border-primary/20 transition-all duration-300 backdrop-blur-sm"
                            >
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.2 }}
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
          </motion.div>

          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-20"
          >
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Analisis Data Mendalam
              </h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Setiap kategori data dianalisis menggunakan algoritma prioritas
                yang mempertimbangkan kondisi aktual, tingkat kebutuhan, dan
                dampak terhadap kualitas pembelajaran.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <a
                  href="#process"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Lihat Proses Analisis
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Facilities;
