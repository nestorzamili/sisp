'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/animations';
import {
  Building2,
  TrendingUp,
  ClipboardList,
  FolderOpen,
  Bell,
  BarChart,
  ShieldCheck,
  Users,
  School,
  Landmark,
  LucideIcon,
} from 'lucide-react';
import Image from 'next/image';

interface Feature {
  id: number;
  icon: LucideIcon;
  title: string;
  description: string;
}

interface FeatureTab {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string;
  gradient: string;
  features: Feature[];
}

const featureTabs: FeatureTab[] = [
  {
    id: 'dinas',
    label: 'Dinas Pendidikan',
    icon: Landmark,
    color: 'text-blue-600',
    gradient: 'from-blue-500 to-blue-600',
    features: [
      {
        id: 1,
        icon: BarChart,
        title: 'Dashboard Analytics',
        description: 'Visualisasi data real-time seluruh sekolah dalam satu dashboard terpusat.',
      },
      {
        id: 2,
        icon: TrendingUp,
        title: 'Sistem Prioritas Otomatis',
        description: 'Algoritma cerdas menentukan urutan kebutuhan berdasarkan tingkat kerusakan.',
      },
      {
        id: 3,
        icon: FolderOpen,
        title: 'Manajemen Dokumen',
        description: 'Arsip digital terpusat untuk semua laporan dan dokumentasi pendidikan.',
      },
      {
        id: 4,
        icon: ShieldCheck,
        title: 'Keamanan Data',
        description: 'Enkripsi berlapis menjamin kerahasiaan data pendidikan daerah.',
      },
    ],
  },
  {
    id: 'sekolah',
    label: 'Sekolah',
    icon: School,
    color: 'text-emerald-600',
    gradient: 'from-emerald-500 to-green-600',
    features: [
      {
        id: 1,
        icon: ClipboardList,
        title: 'Form Input Intuitif',
        description: 'Formulir sederhana untuk operator sekolah dengan panduan langkah demi langkah.',
      },
      {
        id: 2,
        icon: Building2,
        title: 'Inventaris Digital',
        description: 'Pencatatan aset lengkap mulai dari gedung hingga perabot kelas.',
      },
      {
        id: 3,
        icon: Bell,
        title: 'Notifikasi Status',
        description: 'Pemberitahuan otomatis untuk setiap update status verifikasi data.',
      },
      {
        id: 4,
        icon: FolderOpen,
        title: 'Riwayat Pengajuan',
        description: 'Lacak histori semua pengajuan dan status persetujuan.',
      },
    ],
  },
  {
    id: 'publik',
    label: 'Publik',
    icon: Users,
    color: 'text-orange-600',
    gradient: 'from-orange-500 to-amber-500',
    features: [
      {
        id: 1,
        icon: BarChart,
        title: 'Data Terbuka',
        description: 'Akses informasi kondisi fasilitas sekolah untuk transparansi publik.',
      },
      {
        id: 2,
        icon: TrendingUp,
        title: 'Statistik Pendidikan',
        description: 'Visualisasi perkembangan infrastruktur pendidikan daerah.',
      },
      {
        id: 3,
        icon: ShieldCheck,
        title: 'Akuntabilitas',
        description: 'Pantau realisasi anggaran dan progres pembangunan.',
      },
      {
        id: 4,
        icon: ClipboardList,
        title: 'Laporan Berkala',
        description: 'Akses laporan publik berkala tentang kondisi pendidikan.',
      },
    ],
  },
];

const Features: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dinas');
  const activeTabData = featureTabs.find(tab => tab.id === activeTab)!;

  return (
    <section id="features" className="py-24 bg-background relative overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            Fitur untuk{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
              Setiap Kebutuhan
            </span>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed">
            Platform yang dirancang khusus untuk memenuhi kebutuhan setiap stakeholder pendidikan.
          </motion.p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex p-1.5 rounded-2xl bg-muted/50 border border-border/50">
            {featureTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  relative flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300
                  ${activeTab === tab.id
                    ? 'text-white shadow-lg'
                    : 'text-muted-foreground hover:text-foreground'
                  }
                `}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeFeatureTab"
                    className={`absolute inset-0 bg-gradient-to-r ${tab.gradient} rounded-xl`}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <tab.icon className={`w-4 h-4 relative z-10 ${activeTab === tab.id ? 'text-white' : ''}`} />
                <span className="relative z-10 hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Features Grid with Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {activeTabData.features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="h-full p-6 rounded-2xl border border-border/50 bg-background/50 backdrop-blur-sm hover:bg-background/80 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 relative overflow-hidden">
                  {/* Hover Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${activeTabData.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                  <div className="relative z-10">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${activeTabData.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>

                    <h3 className="text-lg font-bold mb-2 tracking-tight group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Features;
