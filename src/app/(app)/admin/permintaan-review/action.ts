'use server';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { ReviewData } from '@/types/review';
import { ReviewService } from '@/lib/services/review.service';
import { SekolahService } from '@/lib/services/sekolah.service';
import logger from '@/lib/logger';

/**
 * Get all request reviews with pagination and filtering
 */
export async function getAllRequestReviews(options?: {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}) {
  try {
    const page = options?.page ?? 1;
    const limit = options?.limit ?? 10;
    const search = options?.search ?? '';
    const sortBy = options?.sortBy ?? 'createdAt';
    const sortOrder = options?.sortOrder ?? 'desc';
    const result = await ReviewService.getRequestReviews({
      page,
      pageSize: limit,
      search: search.trim(),
      sortField: sortBy,
      sortDirection: sortOrder,
    });
    if (result.success && result.data) {
      return {
        success: true,
        data: result.data.reviews,
        totalRows: result.data.pagination.totalCount,
      };
    }
    return {
      success: false,
      error: result.error || 'Gagal mengambil data permintaan review',
      data: [] as ReviewData[],
      totalRows: 0,
    };
  } catch (error) {
    logger.error('Error fetching request reviews:', error);
    return {
      success: false,
      error: 'Gagal mengambil data permintaan review',
      data: [] as ReviewData[],
      totalRows: 0,
    };
  }
}

/**
 * Approve a pending review
 */
export async function approveReview(sekolahId: string, notes?: string) {
  try {
    // Get current admin user session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return {
        success: false,
        error: 'Unauthorized - Admin access required',
      };
    }

    if (!sekolahId || sekolahId.trim() === '') {
      return {
        success: false,
        error: 'ID sekolah tidak valid',
      };
    }

    const result = await ReviewService.approveReview(
      sekolahId.trim(),
      session.user.id, // reviewedById from current admin user
      notes?.trim(),
    );

    if (result.success) {
      return {
        success: true,
        message: 'Review berhasil disetujui',
      };
    }

    return {
      success: false,
      error: result.error || 'Gagal menyetujui review',
    };
  } catch (error) {
    logger.error('Error approving review:', error);
    return {
      success: false,
      error: 'Gagal menyetujui review',
    };
  }
}

/**
 * Request revision for a review
 */
export async function requestRevision(sekolahId: string, reason: string) {
  try {
    // Get current admin user session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return {
        success: false,
        error: 'Unauthorized - Admin access required',
      };
    }

    if (!sekolahId || sekolahId.trim() === '') {
      return {
        success: false,
        error: 'ID sekolah tidak valid',
      };
    }

    if (!reason || reason.trim() === '') {
      return {
        success: false,
        error: 'Alasan revisi harus diisi',
      };
    }

    const result = await ReviewService.requestRevision(
      sekolahId.trim(),
      reason.trim(),
      session.user.id, // reviewedById from current admin user
    );

    if (result.success) {
      return {
        success: true,
        message: 'Permintaan revisi berhasil dikirim',
      };
    }

    return {
      success: false,
      error: result.error || 'Gagal mengirim permintaan revisi',
    };
  } catch (error) {
    logger.error('Error requesting revision:', error);
    return {
      success: false,
      error: 'Gagal mengirim permintaan revisi',
    };
  }
}

/**
 * Get review detail by sekolah ID
 */
export async function getReviewDetail(sekolahId: string) {
  try {
    if (!sekolahId || sekolahId.trim() === '') {
      return {
        success: false,
        error: 'ID sekolah tidak valid',
      };
    }

    const result = await SekolahService.getSekolahById(sekolahId.trim(), true);
    if (result.success && result.data) {
      // Check if the sekolah is in pending or rejected status for review
      if (!['PENDING', 'REJECTED'].includes(result.data.status)) {
        return {
          success: false,
          error: 'Data sekolah tidak dalam status permintaan review',
        };
      }

      return {
        success: true,
        data: result.data,
      };
    }

    return {
      success: false,
      error: result.error || 'Gagal mengambil detail data sekolah',
    };
  } catch (error) {
    logger.error('Error fetching review detail:', error);
    return {
      success: false,
      error: 'Gagal mengambil detail data sekolah',
    };
  }
}
