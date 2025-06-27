'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ReviewDetailCard } from './_components/review-detail-card';
import { ReviewApprovalDialog } from '../_components/review-approval-dialog';
import { ReviewRevisionDialog } from '../_components/review-revision-dialog';
import { SekolahWithDetails } from '@/types/sekolah';
import { getReviewDetail, approveReview, requestRevision } from '../action';
import logger from '@/lib/logger';

export default function ReviewDetailPage() {
  const router = useRouter();
  const params = useParams();
  const sekolahId = params.id as string;

  // State management
  const [data, setData] = useState<SekolahWithDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false);

  // Dialog states
  const [approvalDialog, setApprovalDialog] = useState(false);
  const [revisionDialog, setRevisionDialog] = useState(false);
  // Fetch review detail
  useEffect(() => {
    const fetchReviewDetail = async () => {
      setIsLoading(true);
      try {
        const response = await getReviewDetail(sekolahId);
        if (response.success && response.data) {
          setData(response.data);
        } else {
          toast.error(response.error || 'Gagal mengambil detail review');
          router.push('/admin/permintaan-review');
        }
      } catch (error) {
        logger.error('Error fetching review detail:', error);
        toast.error('Terjadi kesalahan saat mengambil detail review');
        router.push('/admin/permintaan-review');
      } finally {
        setIsLoading(false);
      }
    };

    if (sekolahId) {
      fetchReviewDetail();
    }
  }, [sekolahId, router]);

  // Action handlers
  const handleApprove = () => {
    setApprovalDialog(true);
  };

  const handleRequestRevision = () => {
    setRevisionDialog(true);
  };

  const handleConfirmApproval = async (sekolahId: string, notes?: string) => {
    setIsActionLoading(true);
    try {
      const response = await approveReview(sekolahId, notes);

      if (response.success) {
        toast.success(response.message || 'Review berhasil disetujui');
        router.push('/admin/permintaan-review');
      } else {
        toast.error(response.error || 'Gagal menyetujui review');
      }
    } catch (error) {
      logger.error('Error approving review:', error);
      toast.error('Terjadi kesalahan saat menyetujui review');
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleConfirmRevision = async (sekolahId: string, reason: string) => {
    setIsActionLoading(true);
    try {
      const response = await requestRevision(sekolahId, reason);

      if (response.success) {
        toast.success(response.message || 'Permintaan revisi berhasil dikirim');
        router.push('/admin/permintaan-review');
      } else {
        toast.error(response.error || 'Gagal mengirim permintaan revisi');
      }
    } catch (error) {
      logger.error('Error requesting revision:', error);
      toast.error('Terjadi kesalahan saat mengirim permintaan revisi');
    } finally {
      setIsActionLoading(false);
    }
  };

  // Convert ReviewData to match expected props (simplified for now)
  const reviewData = data
    ? {
        id: data.id,
        nama_sekolah: data.nama_sekolah,
        npsn: data.npsn,
        nama_kepala_sekolah: data.nama_kepala_sekolah,
        alamat_sekolah: data.alamat_sekolah,
        kecamatan: data.kecamatan,
        phone: data.phone,
        status: data.status,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        reviewedAt: data.reviewedAt,
        reviewedById: data.reviewedById,
        reviewNotes: data.reviewNotes,
        user: data.user || { id: '', name: '', email: '' },
        reviewedBy: data.reviewedBy,
      }
    : null;

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
            onClick={() => router.push('/admin/permintaan-review')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali
          </Button>
        </div>
        <div className="text-center py-8">
          <p className="text-muted-foreground">Data review tidak ditemukan</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push('/admin/permintaan-review')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali
        </Button>
      </div>

      {/* Review Detail */}
      <ReviewDetailCard
        data={data}
        onApprove={handleApprove}
        onRequestRevision={handleRequestRevision}
        isLoading={isActionLoading}
      />

      {/* Dialogs */}
      <ReviewApprovalDialog
        open={approvalDialog}
        onOpenChange={setApprovalDialog}
        review={reviewData}
        onConfirm={handleConfirmApproval}
      />

      <ReviewRevisionDialog
        open={revisionDialog}
        onOpenChange={setRevisionDialog}
        review={reviewData}
        onConfirm={handleConfirmRevision}
      />
    </div>
  );
}
