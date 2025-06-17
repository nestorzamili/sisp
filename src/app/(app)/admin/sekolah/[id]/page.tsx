'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'sonner';
import { ArrowLeft, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SekolahDetailCard } from './_components/sekolah-detail-card';
import { SekolahWithDetails } from '@/types/sekolah';
import { getSekolahDetail } from '../action';
import { downloadSekolahPDF } from '@/lib/pdf-utils';

export default function SekolahDetailPage() {
  const router = useRouter();
  const params = useParams();
  const sekolahId = params.id as string;
  // State management
  const [data, setData] = useState<SekolahWithDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  // Download handler
  const handleDownloadData = async () => {
    if (!data) return;

    setIsDownloading(true);
    try {
      await downloadSekolahPDF(data);
      toast.success('PDF berhasil diunduh');
    } catch (error) {
      console.error('Error downloading PDF:', error);
      toast.error('Gagal mengunduh PDF');
    } finally {
      setIsDownloading(false);
    }
  };

  // Fetch sekolah detail
  useEffect(() => {
    const fetchSekolahDetail = async () => {
      setIsLoading(true);
      try {
        const response = await getSekolahDetail(sekolahId);
        if (response.success && response.data) {
          setData(response.data);
        } else {
          toast.error(response.error || 'Gagal mengambil detail sekolah');
          router.push('/admin/sekolah');
        }
      } catch (error) {
        console.error('Error fetching sekolah detail:', error);
        toast.error('Terjadi kesalahan saat mengambil detail sekolah');
        router.push('/admin/sekolah');
      } finally {
        setIsLoading(false);
      }
    };

    if (sekolahId) {
      fetchSekolahDetail();
    }
  }, [sekolahId, router]);

  if (isLoading) {
    return (
      <div className="w-full space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" disabled>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali
          </Button>
        </div>
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="h-64 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-full space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/admin/sekolah')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali
          </Button>
        </div>
        <div className="text-center py-8">
          <p className="text-muted-foreground">Data sekolah tidak ditemukan</p>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push('/admin/sekolah')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali
        </Button>{' '}
        <Button
          variant="default"
          size="sm"
          onClick={handleDownloadData}
          disabled={isDownloading}
        >
          <Download className="h-4 w-4 mr-2" />
          {isDownloading ? 'Mengunduh...' : 'Unduh Data'}
        </Button>
      </div>

      {/* Sekolah Detail */}
      <SekolahDetailCard data={data} />
    </div>
  );
}
