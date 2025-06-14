'use client';

import React, { useState, useEffect } from 'react';
import { WelcomeCard } from './_components/welcome-card';
import { StatusCard } from './_components/status-card';
import { QuickStats } from './_components/quick-stats';
import { getUserSekolahDataAction } from './home.action';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';
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
      <main className="container mx-auto px-4 md:px-6 py-6 max-w-6xl">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Memuat data...</p>
          </div>
        </div>
      </main>
    );
  }
  if (error) {
    return (
      <main className="container mx-auto px-4 md:px-6 py-6 max-w-6xl">
        <Alert variant="destructive">
          <AlertCircle className="w-4 h-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </main>
    );
  }
  if (!data) {
    return (
      <main className="container mx-auto px-4 md:px-6 py-6 max-w-6xl">
        <Alert>
          <AlertCircle className="w-4 h-4" />
          <AlertDescription>Data tidak ditemukan</AlertDescription>
        </Alert>
      </main>
    );
  }
  return (
    <main className="container mx-auto px-4 md:px-6 py-6 max-w-6xl">
      <div className="space-y-6">
        {' '}
        {/* Welcome Section */}
        <WelcomeCard userName={data.user.name} />
        {data.sekolah ? (
          <>
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
              </h2>
              <StatusCard
                status={data.sekolah.status}
                reviewedAt={data.sekolah.reviewedAt}
                reviewNotes={data.sekolah.reviewNotes}
                reviewedBy={data.sekolah.reviewedBy}
              />
            </div>
          </>
        ) : (
          /* No School Data */
          <Alert>
            <AlertCircle className="w-4 h-4" />
            <AlertDescription className="flex items-center justify-between">
              <span>
                Anda belum memiliki data sekolah. Silakan lengkapi data sekolah
                terlebih dahulu.
              </span>
              <Link href="/formulir">
                <Button size="sm" className="ml-4">
                  Isi Data Sekolah
                </Button>
              </Link>
            </AlertDescription>
          </Alert>
        )}
      </div>
    </main>
  );
}
