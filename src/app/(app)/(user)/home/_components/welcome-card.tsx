'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { School, FileText, Calendar, Eye } from 'lucide-react';
import Link from 'next/link';

interface WelcomeCardProps {
  userName: string;
  sekolahStatus?: string;
}

export function WelcomeCard({ userName, sekolahStatus }: WelcomeCardProps) {
  const currentDate = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return (
    <Card className="bg-card border">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-lg">
            <School className="w-6 h-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl">
              Selamat Datang, {userName}!
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <Calendar className="w-4 h-4" />
              {currentDate}
            </div>
          </div>
        </div>
      </CardHeader>{' '}
      <CardContent className="space-y-4">
        <div className="text-muted-foreground">
          <p className="mb-3">
            Selamat datang di Sistem Informasi Sarana dan Prasarana (SISP) SMP,
            Dinas Pendidikan Nias Selatan. Di sini Anda dapat mengelola dan
            memantau data sarana prasarana sekolah Anda.
          </p>
        </div>{' '}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/formulir" className="flex-1">
            <Button className="w-full" size="lg">
              {sekolahStatus === 'APPROVED' || sekolahStatus === 'PENDING' ? (
                <>
                  <Eye className="w-4 h-4 mr-2" />
                  Lihat Data Sekolah
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4 mr-2" />
                  Isi Formulir
                </>
              )}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
