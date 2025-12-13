'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/animations';
import {
    Building2,
    Users,
    Globe,
    ChartBar,
    FileCheck,
    ShieldCheck,
    TrendingUp,
    ClipboardCheck,
    Eye
} from 'lucide-react';

interface BenefitItem {
    icon: React.ElementType;
    title: string;
    description: string;
}

interface BenefitCategory {
    title: string;
    subtitle: string;
    color: string;
    gradient: string;
    iconBg: string;
    items: BenefitItem[];
}

const benefitsData: BenefitCategory[] = [
    {
        title: 'Dinas Pendidikan',
        subtitle: 'Pengambil Kebijakan',
        color: 'text-blue-600',
        gradient: 'from-blue-500 to-blue-600',
        iconBg: 'bg-blue-500/10',
        items: [
            { icon: ChartBar, title: 'Dashboard Terpusat', description: 'Monitoring seluruh sekolah dalam satu platform terintegrasi' },
            { icon: TrendingUp, title: 'Analisis Prioritas', description: 'Rekomendasi otomatis berdasarkan tingkat kebutuhan' },
            { icon: FileCheck, title: 'Laporan Komprehensif', description: 'Export data untuk perencanaan anggaran daerah' },
        ],
    },
    {
        title: 'Sekolah',
        subtitle: 'Operator & Kepala Sekolah',
        color: 'text-emerald-600',
        gradient: 'from-emerald-500 to-green-600',
        iconBg: 'bg-emerald-500/10',
        items: [
            { icon: ClipboardCheck, title: 'Input Mudah', description: 'Form intuitif untuk pendataan sarana prasarana' },
            { icon: Building2, title: 'Tracking Inventaris', description: 'Kelola aset sekolah dengan pencatatan digital' },
            { icon: ShieldCheck, title: 'Verifikasi Cepat', description: 'Proses validasi data yang transparan' },
        ],
    },
    {
        title: 'Masyarakat',
        subtitle: 'Orang Tua & Publik',
        color: 'text-orange-600',
        gradient: 'from-orange-500 to-amber-500',
        iconBg: 'bg-orange-500/10',
        items: [
            { icon: Eye, title: 'Transparansi', description: 'Akses informasi kondisi fasilitas sekolah' },
            { icon: Globe, title: 'Akuntabilitas', description: 'Pantau realisasi anggaran pendidikan' },
            { icon: Users, title: 'Partisipasi', description: 'Berperan aktif dalam peningkatan kualitas pendidikan' },
        ],
    },
];

const Benefits: React.FC = () => {
    return (
        <section id="benefits" className="py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-3xl translate-y-1/2" />
            </div>

            <div className="container mx-auto px-6 relative z-10 max-w-7xl">
                {/* Section Header */}
                <motion.div
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="max-w-3xl mx-auto text-center mb-16"
                >

                    <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                        Manfaat untuk{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                            Semua Pihak
                        </span>
                    </motion.h2>

                    <motion.p variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed">
                        Platform SISP dirancang untuk memberikan kemudahan bagi seluruh stakeholder pendidikan di Kabupaten Nias Selatan.
                    </motion.p>
                </motion.div>

                {/* Benefits Grid */}
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
                >
                    {benefitsData.map((category, index) => (
                        <motion.div
                            key={index}
                            variants={fadeUp}
                            className="group"
                        >
                            <div className="h-full p-8 rounded-3xl bg-background border border-border/50 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 relative overflow-hidden">
                                {/* Gradient Hover Effect */}
                                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 transition-opacity duration-500`} />

                                {/* Category Header */}
                                <div className="flex items-center gap-4 mb-8">
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-lg`}>
                                        <Building2 className="w-7 h-7 text-white" />
                                    </div>
                                    <div>
                                        <h3 className={`text-xl font-bold ${category.color}`}>{category.title}</h3>
                                        <p className="text-sm text-muted-foreground">{category.subtitle}</p>
                                    </div>
                                </div>

                                {/* Benefit Items */}
                                <div className="space-y-5">
                                    {category.items.map((item, i) => (
                                        <div key={i} className="flex items-start gap-4 group/item">
                                            <div className={`w-10 h-10 rounded-xl ${category.iconBg} flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform duration-300`}>
                                                <item.icon className={`w-5 h-5 ${category.color}`} />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold mb-1 text-foreground">{item.title}</h4>
                                                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Benefits;
