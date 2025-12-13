'use client';

import React from 'react';
import { Building2, Target, CheckCircle, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/animations';

const ProcessFlow: React.FC = () => {
  const steps = [
    {
      icon: Building2,
      title: 'Input Data',
      description: 'Operator sekolah menginput data sarana prasarana terkini.',
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
    },
    {
      icon: CheckCircle,
      title: 'Verifikasi',
      description: 'Tim Dinas melakukan validasi lapangan dan data sistem.',
      color: 'text-green-500',
      bg: 'bg-green-500/10',
    },
    {
      icon: Target,
      title: 'Analisis',
      description: 'Algoritma sistem menghitung skor prioritas kebutuhan.',
      color: 'text-orange-500',
      bg: 'bg-orange-500/10',
    },
    {
      icon: BarChart3,
      title: 'Laporan',
      description: 'Output rekomendasi pembangunan yang tepat sasaran.',
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
  ];

  return (
    <section id="process" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-20"
        >
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            Alur Pendataan <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
              Terintegrasi
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Proses sistematis menjamin validitas data dari sekolah hingga pengambilan keputusan.
          </motion.p>
        </motion.div>

        <motion.div
          className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {steps.map((step, i) => (
            <div key={i} className="relative group">
              {i < steps.length - 1 && (
                <div
                  className="hidden lg:block absolute h-[2px] z-0"
                  style={{
                    top: '3rem',
                    left: 'calc(50% + 52px)',
                    right: 'calc(-50% + 20px)',
                  }}
                >
                  <div className="absolute inset-0 bg-border">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.2 }}
                      className="absolute inset-0 bg-primary origin-left"
                    />
                  </div>
                </div>
              )}

              <motion.div variants={fadeUp} className="relative z-10 flex flex-col items-center text-center">
                <div
                  className={`
                    w-24 h-24 rounded-full bg-background border-4 border-background shadow-xl flex items-center justify-center mb-6 
                    transition-all duration-300 group-hover:scale-110 group-hover:border-primary/20
                    ${step.bg}
                  `}
                >
                  <step.icon className={`w-10 h-10 ${step.color}`} />
                </div>

                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-[220px]">
                  {step.description}
                </p>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessFlow;
