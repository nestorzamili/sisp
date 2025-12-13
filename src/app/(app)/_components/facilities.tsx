'use client';

import React from 'react';
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
import { fadeUp, staggerContainer } from '@/lib/animations';

interface CategoryData {
  title: string;
  description: string;
  icon: LucideIcon;
  items: { name: string; icon: LucideIcon }[];
}

const categoriesData: CategoryData[] = [
  {
    title: 'Sarana',
    description: 'Kelengkapan fasilitas pendukung pembelajaran siswa.',
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
    description: 'Infrastruktur dasar dan perabot sekolah.',
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
  return (
    <section
      id="facilities"
      className="py-24 bg-background/50 relative overflow-hidden"
    >
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-5xl font-bold mb-6 tracking-tight"
          >
            Ruang Lingkup <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-600">
              Pendataan
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Cakupan data yang detail memastikan analisis kebutuhan yang presisi.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {categoriesData.map((category, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="group"
            >
              <div className="bg-background border border-border/50 p-8 lg:p-10 rounded-3xl hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 h-full relative overflow-hidden">
                {/* Decorative Gradient */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors" />

                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8">
                    <category.icon className="w-8 h-8 text-primary" />
                  </div>

                  <h3 className="text-2xl font-bold mb-3">{category.title}</h3>
                  <p className="text-muted-foreground mb-8">
                    {category.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    {category.items.map((item, j) => (
                      <div
                        key={j}
                        className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 border border-border/50 text-sm font-medium hover:bg-white hover:shadow-sm transition-all"
                      >
                        <item.icon className="w-4 h-4 text-primary/70" />
                        {item.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Facilities;
