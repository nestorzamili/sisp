import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section id="home" className="pt-24 relative overflow-hidden h-[950px]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/sekolah.png"
            alt="Sekolah SMP"
            fill
            priority
            className="object-cover"
            quality={90}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent z-0"></div>
        <div className="container mx-auto max-w-[1440px] px-6 relative z-10 h-full flex items-center">
          <div className="max-w-xl">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Sistem Informasi Sarana dan Prasarana
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Pengelolaan data sarana dan prasarana untuk meningkatkan kualitas
              pendidikan di tingkat Sekolah Menengah Pertama
            </p>
            <Button className="!rounded-button whitespace-nowrap bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg font-medium cursor-pointer">
              Isi Data Sekolah
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
