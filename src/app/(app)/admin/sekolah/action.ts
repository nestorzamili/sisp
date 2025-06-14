'use server';

import { SekolahService } from '@/lib/services/sekolah.service';
import { SekolahWithDetails } from '@/types/sekolah';

/**
 * Get all sekolah with pagination and filtering for admin table
 */
export async function getAllSekolahWithCount(options?: {
  page?: number;
  limit?: number;
  search?: string;
  kecamatan?: string;
  status?: 'all' | 'approved' | 'pending'; // Only 2 statuses: approved (!banned) and pending (banned)
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}) {
  try {
    const page = options?.page ?? 1;
    const limit = options?.limit ?? 10;
    const search = options?.search ?? '';
    const kecamatan = options?.kecamatan ?? '';
    const status = options?.status ?? 'all';
    const sortBy = options?.sortBy ?? 'nama_sekolah';
    const sortOrder = options?.sortOrder ?? 'asc';

    // Convert status to userBanned boolean
    let userBanned: boolean | undefined;
    if (status === 'approved') {
      userBanned = false; // Approved = not banned
    } else if (status === 'pending') {
      userBanned = true; // Pending = banned
    }
    // 'all' status = undefined (no filter)

    const result = await SekolahService.getPaginated({
      page,
      pageSize: limit,
      sortField: sortBy,
      sortDirection: sortOrder,
      search: search.trim(),
      kecamatan: kecamatan.trim() || undefined,
      userBanned,
      includeDetails: false,
    });

    return {
      success: true,
      data: result.sekolah,
      totalRows: result.pagination.totalCount,
    };
  } catch (error) {
    console.error('Error fetching sekolah:', error);
    return {
      success: false,
      error: 'Gagal mengambil data sekolah',
      data: [] as SekolahWithDetails[],
      totalRows: 0,
    };
  }
}

/**
 * Get sekolah details by ID for admin view
 */
export async function getSekolahDetail(id: string) {
  try {
    if (!id || id.trim() === '') {
      return {
        success: false,
        error: 'ID sekolah tidak valid',
      };
    }

    const result = await SekolahService.getSekolahById(id.trim(), true);

    if (result.success && result.data) {
      return {
        success: true,
        data: result.data,
      };
    }

    return {
      success: false,
      error: result.error || 'Sekolah tidak ditemukan',
    };
  } catch (error) {
    console.error('Error fetching sekolah detail:', error);
    return {
      success: false,
      error: 'Gagal mengambil detail sekolah',
    };
  }
}

/**
 * Get sekolah statistics for dashboard
 */
export async function getSekolahStatistics(filters?: {
  search?: string;
  kecamatan?: string;
  tahunAjaran?: string;
}) {
  try {
    const result = await SekolahService.getStatistics(filters || {});

    if (result.success && result.data) {
      return {
        success: true,
        data: result.data,
      };
    }

    return {
      success: false,
      error: result.error || 'Gagal mengambil statistik sekolah',
    };
  } catch (error) {
    console.error('Error fetching sekolah statistics:', error);
    return {
      success: false,
      error: 'Gagal mengambil statistik sekolah',
    };
  }
}

/**
 * Approve a sekolah by setting banned status to false
 */
export async function approveSekolah(sekolahId: string) {
  try {
    if (!sekolahId || sekolahId.trim() === '') {
      return {
        success: false,
        error: 'ID sekolah tidak valid',
      };
    }

    // TODO: Update this when schema is updated to have banned field directly on sekolah
    // For now, we'll update through the user relation
    const result = await SekolahService.approveSekolah(sekolahId.trim());

    if (result.success) {
      return {
        success: true,
        message: 'Sekolah berhasil disetujui',
      };
    }

    return {
      success: false,
      error: result.error || 'Gagal menyetujui sekolah',
    };
  } catch (error) {
    console.error('Error approving sekolah:', error);
    return {
      success: false,
      error: 'Gagal menyetujui sekolah',
    };
  }
}

/**
 * Reject a sekolah by setting banned status to true
 */
export async function rejectSekolah(sekolahId: string) {
  try {
    if (!sekolahId || sekolahId.trim() === '') {
      return {
        success: false,
        error: 'ID sekolah tidak valid',
      };
    }

    // TODO: Update this when schema is updated to have banned field directly on sekolah
    // For now, we'll update through the user relation
    const result = await SekolahService.rejectSekolah(sekolahId.trim());

    if (result.success) {
      return {
        success: true,
        message: 'Sekolah berhasil ditolak',
      };
    }

    return {
      success: false,
      error: result.error || 'Gagal menolak sekolah',
    };
  } catch (error) {
    console.error('Error rejecting sekolah:', error);
    return {
      success: false,
      error: 'Gagal menolak sekolah',
    };
  }
}
