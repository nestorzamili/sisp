'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { TrendingUp, Users, Target, MapPin } from 'lucide-react';
import { fadeUp, staggerContainer } from '@/lib/animations';

const Counter = ({
  value,
  suffix = '',
  prefix = '',
}: {
  value: number;
  suffix?: string;
  prefix?: string;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
    duration: 3,
  });
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${latest.toFixed(0)}${suffix}`;
      }
    });
  }, [springValue, prefix, suffix]);

  return <span ref={ref} />;
};

type StatItem = {
  icon: React.ElementType;
  value: number;
  label: string;
  description: string;
  color: string;
  suffix?: string;
  prefix?: string;
};

const Statistics: React.FC = () => {
  const stats: StatItem[] = [
    {
      icon: Users,
      value: 138,
      label: 'Total SMP',
      description: 'Se-Nias Selatan',
      color: 'text-blue-500',
    },
    {
      icon: Target,
      value: 13,
      label: 'Kategori Data',
      description: 'Sarana & Prasarana',
      color: 'text-emerald-500',
    },
    {
      icon: TrendingUp,
      value: 3,
      label: 'Level Prioritas',
      description: 'Sistem Analisis',
      color: 'text-orange-500',
    },
    {
      icon: MapPin,
      value: 100,
      suffix: '%',
      label: 'Cakupan Analisis',
      description: 'Seluruh Wilayah',
      color: 'text-primary',
    },
  ];

  return (
    <section id="statistics" className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-linear-to-b from-muted/30 to-background pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-primary/5 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 tracking-tight"
          >
            Data Sekolah & Sarana Prasarana
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-muted-foreground text-lg"
          >
            Gambaran umum distribusi sekolah dan kelengkapan data sarana
            prasarana di lingkungan Dinas Pendidikan Kabupaten Nias Selatan.
          </motion.p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                variants={fadeUp}
                className="relative group"
              >
                <div
                  className={`
                    h-full p-8 rounded-2xl bg-card/50 backdrop-blur-sm
                    border border-border/50
                    hover:shadow-lg hover:shadow-primary/5
                    transition-all duration-300
                    flex flex-col items-center text-center group-hover:border-primary/20
                `}
                >
                  <div
                    className={`w-14 h-14 rounded-xl bg-background border border-border/50 flex items-center justify-center mb-6 shadow-sm transition-all duration-300`}
                  >
                    <Icon className={`w-7 h-7 ${stat.color}`} />
                  </div>

                  <div className="text-5xl font-bold mb-3 tracking-tight text-foreground">
                    <Counter
                      value={stat.value}
                      suffix={stat.suffix}
                      prefix={stat.prefix}
                    />
                  </div>

                  <div className="font-semibold text-lg mb-2">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">
                    {stat.description}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Statistics;
