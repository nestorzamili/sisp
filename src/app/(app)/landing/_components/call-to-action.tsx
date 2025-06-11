'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Users, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const CallToAction: React.FC = () => {
  return (
    <>
      {/* Call to Action */}
      <section className="relative py-20 bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border border-current rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 border border-current rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-current rounded-full"></div>
        </div>

        <div className="container mx-auto max-w-[1440px] px-6 text-center relative z-10">
          {/* Trust Indicators */}
          <div className="flex justify-center items-center gap-8 mb-8 opacity-80">
            <div className="flex items-center gap-2 text-sm">
              <Shield className="w-4 h-4" />
              <span>Data Aman</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Users className="w-4 h-4" />
              <span>500+ Sekolah</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>Analisis Akurat</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="animate-fade-in">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Bantu Tentukan Prioritas
              <span className="block opacity-80">Kebutuhan Sekolah Anda</span>
            </h2>

            <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed opacity-90">
              Daftarkan sekolah Anda dan input data sarana prasarana untuk
              analisis prioritas kebutuhan yang akan mendukung perencanaan
              pembangunan pendidikan di Nias Selatan.
            </p>

            {/* CTA Button */}
            <div className="flex justify-center">
              <Link href="/sign-up">
                <Button className="group relative overflow-hidden bg-background text-primary hover:bg-background/90 hover:text-primary text-lg font-semibold px-8 py-4 md:px-10 md:py-5 rounded-full shadow-2xl hover:shadow-background/20 transition-all duration-300 transform hover:scale-105 focus:ring-4 focus:ring-background/30">
                  {/* Button Background Animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                  <span className="relative flex items-center gap-3">
                    Daftarkan Sekolah Anda
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CallToAction;
