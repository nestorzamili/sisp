'use server';

import { SekolahService } from '@/lib/services/sekolah.service';
import { SekolahWithDetails } from '@/types/sekolah';
import logger from '@/lib/logger';

/**
 * Get all sekolah with pagination and filtering for admin table
 */
export async function getAllSekolahWithCount(options?: {
  page?: number;
  limit?: number;
  search?: string;
  kecamatan?: string;
  status?: 'all' | 'APPROVED' | 'PENDING' | 'DRAFT' | 'REJECTED'; // Use actual ReviewStatus enum values
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
    const sortOrder = options?.sortOrder ?? 'asc'; // Convert status to sekolah status filter
    let sekolahStatus: string | undefined;
    if (status === 'APPROVED') {
      sekolahStatus = 'APPROVED';
    } else if (status === 'PENDING') {
      sekolahStatus = 'PENDING';
    } else if (status === 'DRAFT') {
      sekolahStatus = 'DRAFT';
    } else if (status === 'REJECTED') {
      sekolahStatus = 'REJECTED';
    }
    // 'all' status = undefined (no filter)

    const result = await SekolahService.getPaginated({
      page,
      pageSize: limit,
      sortField: sortBy,
      sortDirection: sortOrder,
      search: search.trim(),
      kecamatan: kecamatan.trim() || undefined,
      sekolahStatus,
      includeDetails: false,
    });

    return {
      success: true,
      data: result.sekolah,
      totalRows: result.pagination.totalCount,
    };
  } catch (error) {
    logger.error('Error fetching sekolah:', error);
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
    logger.error('Error fetching sekolah detail:', error);
    return {
      success: false,
      error: 'Gagal mengambil detail sekolah',
    };
  }
}

/**
 * Generate sekolah report data for PDF export
 */
export async function generateSekolahReport(options?: {
  kecamatan?: string[];
}) {
  try {
    const { ReportService } = await import('@/lib/services/report.service');

    const reportData = await ReportService.generateReport({
      kecamatan: options?.kecamatan,
    });

    return {
      success: true,
      data: reportData,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Gagal generate laporan data sekolah',
    };
  }
}
