'use client';

import React, { useState, useEffect } from 'react';
import { WelcomeCard } from './_components/welcome-card';
import { StatusCard } from './_components/status-card';
import { QuickStats } from './_components/quick-stats';
import { getUserSekolahDataAction } from './home.action';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { UserHomeData } from '@/types/home.types';

export default function HomePage() {
  const [data, setData] = useState<UserHomeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const result = await getUserSekolahDataAction();

        if (result.success && result.data) {
          setData(result.data);
        } else {
          setError(result.error || 'Terjadi kesalahan saat memuat data');
        }
      } catch (err) {
        console.error('Error loading home data:', err);
        setError('Terjadi kesalahan yang tidak terduga');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);
  if (loading) {
    return (
      <div className="min-h-[calc(100vh-180px)] flex items-center justify-center bg-gradient-to-br from-secondary via-background to-accent">
        <div className="text-center p-8">
          <div className="relative">
            <div className="w-16 h-16 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
              <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Memuat Dashboard
          </h3>
          <p className="text-muted-foreground">
            Sedang mengambil data sekolah Anda...
          </p>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-[calc(100vh-180px)] flex items-center justify-center bg-gradient-to-br from-destructive/5 via-background to-destructive/10 px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-card rounded-2xl shadow-xl border border-destructive/20 p-8">
            <div className="w-16 h-16 mx-auto mb-6 bg-destructive/10 rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-destructive" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Terjadi Kesalahan
            </h3>
            <p className="text-muted-foreground mb-6">{error}</p>
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              className="w-full"
            >
              Coba Lagi
            </Button>
          </div>
        </div>
      </div>
    );
  }
  if (!data) {
    return (
      <div className="min-h-[calc(100vh-180px)] flex items-center justify-center bg-gradient-to-br from-muted via-background to-accent px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-card rounded-2xl shadow-xl border p-8">
            <div className="w-16 h-16 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Data Tidak Ditemukan
            </h3>
            <p className="text-muted-foreground mb-6">
              Silakan muat ulang halaman atau hubungi administrator
            </p>
            <Button onClick={() => window.location.reload()} className="w-full">
              Muat Ulang
            </Button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-[calc(100vh-180px)] bg-gradient-to-br from-secondary via-background to-accent">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <WelcomeCard
            userName={data.user.name}
            sekolahStatus={data.sekolah?.status}
          />
        </div>
      </div>{' '}
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {data.sekolah ? (
            <>
              {/* Thank You Message for Approved Status */}
              {data.sekolah.status === 'APPROVED' && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-100 rounded-full flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-green-900 mb-2">
                        Terima Kasih atas Partisipasi Anda! 🎉
                      </h3>
                      <p className="text-green-800 mb-3">
                        Data sarana dan prasarana sekolah Anda telah berhasil
                        diverifikasi dan disetujui oleh Dinas Pendidikan Nias
                        Selatan. Kontribusi Anda sangat berharga dalam membantu
                        kami merencanakan pembangunan dan pengembangan fasilitas
                        pendidikan yang lebih baik.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Stats */}
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  Ringkasan Data
                </h2>
                <QuickStats sekolah={data.sekolah} />
              </div>

              {/* Status Review */}
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  Status Review
                </h2>{' '}
                <StatusCard
                  status={data.sekolah.status}
                  reviewNotes={data.sekolah.reviewNotes}
                />
              </div>
            </>
          ) : (
            /* No School Data */
            <Alert>
              <AlertCircle className="w-4 h-4" />
              <AlertDescription className="flex items-center justify-between">
                <span>
                  Anda belum memiliki data sekolah. Silakan lengkapi data
                  sekolah terlebih dahulu.
                </span>
                <Link href="/formulir">
                  <Button size="sm" className="ml-4">
                    Isi Data Sekolah
                  </Button>
                </Link>
              </AlertDescription>{' '}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
