'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, GraduationCap, Building2, Wrench } from 'lucide-react';
import { HomeSekolahData } from '@/types/home.types';

interface QuickStatsProps {
  sekolah?: HomeSekolahData | null;
}

export function QuickStats({ sekolah }: QuickStatsProps) {
  // Calculate stats
  const totalGuru = sekolah?.guru?.reduce((sum, g) => sum + g.jumlah, 0) || 0;
  const totalSiswa =
    sekolah?.rombonganBelajar?.reduce((sum, rb) => sum + rb.jumlah_siswa, 0) ||
    0;
  const totalSarana = sekolah?.sarana?.length || 0;
  const totalPrasarana = sekolah?.prasarana?.length || 0;

  const stats = [
    {
      title: 'Total Guru',
      value: totalGuru,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Total Siswa',
      value: totalSiswa,
      icon: GraduationCap,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Data Sarana',
      value: totalSarana,
      icon: Wrench,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Data Prasarana',
      value: totalPrasarana,
      icon: Building2,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value.toLocaleString('id-ID')}
                  </p>
                </div>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <IconComponent className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
