import prisma from '@/lib/prisma';
import {
  DashboardStats,
  SekolahStats,
  GuruStats,
  SiswaStats,
  SaranaStats,
  PrasaranaStats,
  RecentSekolah,
  PendingReview,
} from '@/types/dashboard.types';

export class DashboardService {
  static async getDashboardStats(): Promise<DashboardStats> {
    try {
      // Total sekolah terdaftar (user bukan admin dan tidak banned)
      const totalSekolahTerdaftar = await prisma.user.count({
        where: {
          role: { not: 'admin' },
          banned: false,
        },
      });

      // Sekolah menunggu approval pendaftaran (user bukan admin dan masih banned)
      const sekolahMenungguApproval = await prisma.user.count({
        where: {
          role: { not: 'admin' },
          banned: true,
        },
      }); // Total sekolah menyelesaikan pengisian formular (status approved)
      const sekolahFormulirSelesai = await prisma.sekolah.count({
        where: {
          status: 'APPROVED',
          user: {
            role: { not: 'admin' },
          },
        },
      });

      // Sekolah menunggu review (status pending)
      const sekolahMenungguReview = await prisma.sekolah.count({
        where: {
          status: 'PENDING',
          user: {
            role: { not: 'admin' },
          },
        },
      });

      return {
        totalSekolahTerdaftar,
        sekolahMenungguApproval,
        sekolahFormulirSelesai,
        sekolahMenungguReview,
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw new Error('Failed to fetch dashboard statistics');
    }
  }
  static async getSekolahStatusDistribution(): Promise<SekolahStats[]> {
    try {
      const statusCounts = await prisma.sekolah.groupBy({
        by: ['status'],
        _count: {
          id: true,
        },
        where: {
          user: {
            role: { not: 'admin' },
          },
        },
      });

      return statusCounts.map((item) => ({
        status: item.status,
        count: item._count.id,
      }));
    } catch (error) {
      console.error('Error fetching sekolah status distribution:', error);
      throw new Error('Failed to fetch sekolah status distribution');
    }
  }
  static async getSaranaDistribution(): Promise<SaranaStats[]> {
    try {
      const saranaStats = await prisma.sarana.groupBy({
        by: ['jenis_sarana'],
        _sum: {
          jumlah_total: true,
        },
        where: {
          sekolah: {
            user: {
              role: { not: 'admin' },
            },
          },
        },
        orderBy: {
          _sum: {
            jumlah_total: 'desc',
          },
        },
        take: 10, // Top 10 sarana
      });

      return saranaStats.map((item) => ({
        jenis: item.jenis_sarana,
        jumlah: item._sum.jumlah_total || 0,
      }));
    } catch (error) {
      console.error('Error fetching sarana distribution:', error);
      throw new Error('Failed to fetch sarana distribution');
    }
  }
  static async getPrasaranaDistribution(): Promise<PrasaranaStats[]> {
    try {
      const prasaranaStats = await prisma.prasarana.groupBy({
        by: ['jenis_prasarana'],
        _sum: {
          jumlah_total: true,
        },
        where: {
          sekolah: {
            user: {
              role: { not: 'admin' },
            },
          },
        },
        orderBy: {
          _sum: {
            jumlah_total: 'desc',
          },
        },
        take: 10, // Top 10 prasarana
      });

      return prasaranaStats.map((item) => ({
        jenis: item.jenis_prasarana,
        jumlah: item._sum.jumlah_total || 0,
      }));
    } catch (error) {
      console.error('Error fetching prasarana distribution:', error);
      throw new Error('Failed to fetch prasarana distribution');
    }
  }
  static async getGuruDistribution(): Promise<GuruStats[]> {
    try {
      const guruStats = await prisma.guru.groupBy({
        by: ['status_guru', 'jenis_kelamin'],
        _sum: {
          jumlah: true,
        },
        where: {
          sekolah: {
            user: {
              role: { not: 'admin' },
            },
          },
        },
      });

      return guruStats.map((item) => ({
        status: item.status_guru,
        jenisKelamin: item.jenis_kelamin,
        jumlah: item._sum.jumlah || 0,
      }));
    } catch (error) {
      console.error('Error fetching guru distribution:', error);
      throw new Error('Failed to fetch guru distribution');
    }
  }
  static async getSiswaDistribution(): Promise<SiswaStats[]> {
    try {
      const siswaStats = await prisma.rombonganBelajar.groupBy({
        by: ['tingkatan_kelas', 'jenis_kelamin'],
        _sum: {
          jumlah_siswa: true,
        },
        where: {
          sekolah: {
            user: {
              role: { not: 'admin' },
            },
          },
        },
        orderBy: {
          tingkatan_kelas: 'asc',
        },
      });

      return siswaStats.map((item) => ({
        tingkatan: item.tingkatan_kelas,
        jenisKelamin: item.jenis_kelamin,
        jumlah: item._sum.jumlah_siswa || 0,
      }));
    } catch (error) {
      console.error('Error fetching siswa distribution:', error);
      throw new Error('Failed to fetch siswa distribution');
    }
  }
  static async getRecentSekolah(limit: number = 5): Promise<RecentSekolah[]> {
    try {
      const recentSekolah = await prisma.sekolah.findMany({
        select: {
          id: true,
          nama_sekolah: true,
          npsn: true,
          status: true,
          createdAt: true,
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
        where: {
          user: {
            role: { not: 'admin' },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: limit,
      });

      return recentSekolah.map((sekolah) => ({
        id: sekolah.id,
        namaSekolah: sekolah.nama_sekolah,
        npsn: sekolah.npsn,
        status: sekolah.status,
        createdAt: sekolah.createdAt,
        userEmail: sekolah.user.email,
      }));
    } catch (error) {
      console.error('Error fetching recent sekolah:', error);
      throw new Error('Failed to fetch recent sekolah');
    }
  }
  static async getPendingReviews(limit: number = 10): Promise<PendingReview[]> {
    try {
      const pendingReviews = await prisma.sekolah.findMany({
        where: {
          status: 'PENDING',
          user: {
            role: { not: 'admin' },
          },
        },
        select: {
          id: true,
          nama_sekolah: true,
          npsn: true,
          createdAt: true,
          updatedAt: true,
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
        orderBy: {
          updatedAt: 'desc',
        },
        take: limit,
      });

      return pendingReviews.map((sekolah) => ({
        id: sekolah.id,
        namaSekolah: sekolah.nama_sekolah,
        npsn: sekolah.npsn,
        createdAt: sekolah.createdAt,
        updatedAt: sekolah.updatedAt,
        userEmail: sekolah.user.email,
      }));
    } catch (error) {
      console.error('Error fetching pending reviews:', error);
      throw new Error('Failed to fetch pending reviews');
    }
  }
}
