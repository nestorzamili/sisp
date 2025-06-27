'use server';

import { PendaftaranService } from '@/lib/services/pendaftaran.service';
import { PendaftaranData } from '@/types/pendaftaran';
import logger from '@/lib/logger';

/**
 * Get all pending registrations with pagination and filtering
 */
export async function getAllPendingRegistrations(options?: {
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

    const result = await PendaftaranService.getPendingRegistrations({
      page,
      pageSize: limit,
      search: search.trim(),
      sortField: sortBy,
      sortDirection: sortOrder,
    });

    if (result.success && result.data) {
      return {
        success: true,
        data: result.data.data,
        totalRows: result.data.pagination.totalCount,
      };
    }

    return {
      success: false,
      error: result.error || 'Gagal mengambil data permintaan pendaftaran',
      data: [] as PendaftaranData[],
      totalRows: 0,
    };
  } catch (error) {
    logger.error('Error fetching pending registrations:', error);
    return {
      success: false,
      error: 'Gagal mengambil data permintaan pendaftaran',
      data: [] as PendaftaranData[],
      totalRows: 0,
    };
  }
}

/**
 * Approve a pending registration
 */
export async function approvePendaftaran(userId: string) {
  try {
    if (!userId || userId.trim() === '') {
      return {
        success: false,
        error: 'ID user tidak valid',
      };
    }

    const result = await PendaftaranService.approvePendaftaran(userId.trim());

    if (result.success) {
      return {
        success: true,
        message: 'Pendaftaran berhasil disetujui',
      };
    }

    return {
      success: false,
      error: result.error || 'Gagal menyetujui pendaftaran',
    };
  } catch (error) {
    logger.error('Error approving pendaftaran:', error);
    return {
      success: false,
      error: 'Gagal menyetujui pendaftaran',
    };
  }
}

/**
 * Reject a pending registration
 */
export async function rejectPendaftaran(userId: string, reason: string) {
  try {
    if (!userId || userId.trim() === '') {
      return {
        success: false,
        error: 'ID user tidak valid',
      };
    }

    if (!reason || reason.trim() === '') {
      return {
        success: false,
        error: 'Alasan penolakan harus diisi',
      };
    }

    const result = await PendaftaranService.rejectPendaftaran(
      userId.trim(),
      reason.trim(),
    );

    if (result.success) {
      return {
        success: true,
        message: 'Pendaftaran berhasil ditolak',
      };
    }

    return {
      success: false,
      error: result.error || 'Gagal menolak pendaftaran',
    };
  } catch (error) {
    logger.error('Error rejecting pendaftaran:', error);
    return {
      success: false,
      error: 'Gagal menolak pendaftaran',
    };
  }
}
