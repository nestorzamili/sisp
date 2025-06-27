'use server';

import { DashboardService } from '@/lib/services/dashboard.service';
import logger from '@/lib/logger';

/**
 * Get dashboard statistics
 */
export async function getDashboardStats() {
  try {
    const stats = await DashboardService.getDashboardStats();
    return {
      success: true,
      data: stats,
    };
  } catch (error) {
    logger.error({ err: error }, 'Error fetching dashboard stats');
    return {
      success: false,
      error: 'Gagal mengambil statistik dashboard',
      data: {
        totalSekolahTerdaftar: 0,
        sekolahMenungguApproval: 0,
        sekolahFormulirSelesai: 0,
        sekolahMenungguReview: 0,
      },
    };
  }
}

/**
 * Get sekolah status distribution for chart
 */
export async function getSekolahStatusDistribution() {
  try {
    const data = await DashboardService.getSekolahStatusDistribution();
    return {
      success: true,
      data,
    };
  } catch (error) {
    logger.error({ err: error }, 'Error fetching sekolah status distribution');
    return {
      success: false,
      error: 'Gagal mengambil distribusi status sekolah',
      data: [],
    };
  }
}

/**
 * Get sarana distribution for chart
 */
export async function getSaranaDistribution() {
  try {
    const data = await DashboardService.getSaranaDistribution();
    return {
      success: true,
      data,
    };
  } catch (error) {
    logger.error({ err: error }, 'Error fetching sarana distribution');
    return {
      success: false,
      error: 'Gagal mengambil distribusi sarana',
      data: [],
    };
  }
}

/**
 * Get prasarana distribution for chart
 */
export async function getPrasaranaDistribution() {
  try {
    const data = await DashboardService.getPrasaranaDistribution();
    return {
      success: true,
      data,
    };
  } catch (error) {
    logger.error({ err: error }, 'Error fetching prasarana distribution');
    return {
      success: false,
      error: 'Gagal mengambil distribusi prasarana',
      data: [],
    };
  }
}

/**
 * Get guru distribution for chart
 */
export async function getGuruDistribution() {
  try {
    const data = await DashboardService.getGuruDistribution();
    return {
      success: true,
      data,
    };
  } catch (error) {
    logger.error({ err: error }, 'Error fetching guru distribution');
    return {
      success: false,
      error: 'Gagal mengambil distribusi guru',
      data: [],
    };
  }
}

/**
 * Get siswa distribution for chart
 */
export async function getSiswaDistribution() {
  try {
    const data = await DashboardService.getSiswaDistribution();
    return {
      success: true,
      data,
    };
  } catch (error) {
    logger.error({ err: error }, 'Error fetching siswa distribution');
    return {
      success: false,
      error: 'Gagal mengambil distribusi siswa',
      data: [],
    };
  }
}

/**
 * Get recent sekolah for table
 */
export async function getRecentSekolah(limit: number = 5) {
  try {
    const data = await DashboardService.getRecentSekolah(limit);
    return {
      success: true,
      data,
    };
  } catch (error) {
    logger.error({ err: error }, 'Error fetching recent sekolah');
    return {
      success: false,
      error: 'Gagal mengambil data sekolah terbaru',
      data: [],
    };
  }
}

/**
 * Get pending reviews for table
 */
export async function getPendingReviews(limit: number = 10) {
  try {
    const data = await DashboardService.getPendingReviews(limit);
    return {
      success: true,
      data,
    };
  } catch (error) {
    logger.error({ err: error }, 'Error fetching pending reviews');
    return {
      success: false,
      error: 'Gagal mengambil data review pending',
      data: [],
    };
  }
}
