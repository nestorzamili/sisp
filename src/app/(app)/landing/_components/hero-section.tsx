import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

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
        <div className="absolute inset-0 hero-gradient z-0"></div>
        <div className="container mx-auto max-w-[1440px] px-6 relative z-10 h-full flex items-center">
          <div className="max-w-xl">
            <h1 className="text-5xl font-bold text-foreground mb-4">
              Sistem Informasi Sarana dan Prasarana
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Pengelolaan data sarana dan prasarana untuk meningkatkan kualitas
              pendidikan di tingkat Sekolah Menengah Pertama
            </p>
            <Link href="/sign-up">
              <Button className="btn-primary text-lg px-8 py-6">
                Isi Data Sekolah
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
