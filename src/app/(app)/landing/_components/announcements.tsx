import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowRight } from 'lucide-react';

const announcements = [
  {
    id: 1,
    category: 'Pengumuman',
    title: 'Periode Pendataan Tahun Ajaran 2024/2025',
    preview:
      'Seluruh SMP di Nias Selatan dimohon untuk melengkapi pendataan sarana prasarana periode Juli-Agustus 2025.',
    date: '7 Juni 2025',
    categoryColor: 'bg-amber-500',
  },
  {
    id: 2,
    category: 'Pelatihan',
    title: 'Workshop Penggunaan Sistem SISP',
    preview:
      'Dinas Pendidikan menyelenggarakan pelatihan penggunaan sistem untuk operator sekolah pada 15 Juni 2025.',
    date: '5 Juni 2025',
    categoryColor: 'bg-emerald-500',
  },
  {
    id: 3,
    category: 'Monitoring',
    title: 'Verifikasi Data Sarana Prasarana',
    preview:
      'Tim verifikasi akan melakukan kunjungan ke sekolah-sekolah untuk validasi data yang telah diinput.',
    date: '3 Juni 2025',
    categoryColor: 'bg-blue-500',
  },
  {
    id: 4,
    category: 'Laporan',
    title: 'Hasil Analisis Kebutuhan Prioritas',
    preview:
      'Laporan analisis kebutuhan prioritas sekolah telah tersedia dan dapat diakses oleh kepala sekolah.',
    date: '30 Mei 2025',
    categoryColor: 'bg-purple-500',
  },
];

const Announcements: React.FC = () => {
  return (
    <>
      {/* Announcements Section */}
      <section id="announcements" className="py-20 bg-gray-50">
        <div className="container mx-auto max-w-[1440px] px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Informasi & Pengumuman
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Dapatkan informasi terbaru mengenai kegiatan pendataan sarana
              prasarana dan program Dinas Pendidikan Nias Selatan.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-6">
                {announcements.map((announcement, index) => (
                  <div key={announcement.id} className="relative pl-8 pb-6">
                    {index !== announcements.length - 1 && (
                      <div className="absolute left-3 top-6 bottom-0 w-0.5 bg-gray-200"></div>
                    )}
                    <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-red-600 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                    <Card className="p-6 border border-gray-200 hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-center justify-between mb-3">
                        <Badge
                          className={`${announcement.categoryColor} text-white`}
                        >
                          {announcement.category}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {announcement.date}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-gray-900">
                        {announcement.title}
                      </h3>
                      <p className="text-gray-600">{announcement.preview}</p>
                      <Button
                        variant="link"
                        className="!rounded-button whitespace-nowrap p-0 mt-2 text-red-600 hover:text-red-700 cursor-pointer"
                      >
                        Baca selengkapnya
                        <ArrowRight className="ml-2" size={16} />
                      </Button>
                    </Card>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="text-center mt-8">
              <Button className="!rounded-button whitespace-nowrap bg-white border border-red-600 text-red-600 hover:bg-red-50 cursor-pointer">
                Lihat Semua Pengumuman
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Announcements;
