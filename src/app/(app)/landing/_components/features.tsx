import React from 'react';
import { Card } from '@/components/ui/card';
import {
  Building2,
  TrendingUp,
  ClipboardList,
  FolderOpen,
  Bell,
  ChevronRight,
  LucideIcon,
} from 'lucide-react';

interface Feature {
  id: number;
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    id: 1,
    icon: Building2,
    title: 'Pendataan Sarana',
    description:
      'Input data kondisi sarana sekolah untuk analisis prioritas kebutuhan.',
  },
  {
    id: 2,
    icon: ClipboardList,
    title: 'Pendataan Prasarana',
    description:
      'Input data kondisi prasarana untuk evaluasi prioritas perbaikan dan pengadaan.',
  },
  {
    id: 3,
    icon: TrendingUp,
    title: 'Analisis Prioritas Otomatis',
    description:
      'Sistem menganalisis data untuk menentukan prioritas kebutuhan berdasarkan kondisi terkini.',
  },
  {
    id: 4,
    icon: Building2,
    title: 'Data Rombongan Belajar dan Siswa',
    description:
      'Kelola data rombongan belajar dan siswa untuk analisis kebutuhan yang lebih mendalam.',
  },
  {
    id: 5,
    icon: FolderOpen,
    title: 'Laporan Prioritas',
    description:
      'Generate laporan prioritas kebutuhan untuk mendukung pengambilan keputusan Dinas Pendidikan.',
  },
  {
    id: 6,
    icon: Bell,
    title: 'Monitoring Kebutuhan',
    description:
      'Pantau dan update prioritas kebutuhan dari seluruh SMP di Nias Selatan secara real-time.',
  },
];

const Features: React.FC = () => {
  return (
    <>
      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto max-w-[1440px] px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Fitur Analisis Prioritas Sarana Prasarana
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Sistem terintegrasi untuk mengumpulkan data, menganalisis
              prioritas kebutuhan, dan melaporkan rekomendasi pembangunan sarana
              prasarana SMP di Nias Selatan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <Card
                  key={feature.id}
                  className="p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300 h-full"
                >
                  <div className="flex flex-col h-full">
                    <div className="rounded-full bg-red-100 w-16 h-16 flex items-center justify-center mb-4">
                      <IconComponent className="text-red-600" size={32} />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 mb-4 flex-grow">
                      {feature.description}
                    </p>
                    <a
                      href="#"
                      className="text-red-600 font-medium hover:text-red-700 inline-flex items-center cursor-pointer"
                    >
                      Pelajari Lebih Lanjut
                      <ChevronRight className="ml-2" size={16} />
                    </a>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
