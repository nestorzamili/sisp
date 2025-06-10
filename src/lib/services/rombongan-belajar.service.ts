import prisma from '@/lib/prisma';
import {
  CreateRombonganBelajarData,
  UpdateRombonganBelajarData,
  RombonganBelajarWithDetails,
  RombonganBelajarFilters,
  RombonganBelajarServiceResponse,
  PaginatedRombonganBelajarResponse,
  RombonganBelajarStatistics,
  RombonganBelajarWhereInput,
  RombonganBelajarFormData,
} from '@/types/rombongan-belajar';

export class RombonganBelajarService {
  async createRombonganBelajar(
    data: CreateRombonganBelajarData,
  ): Promise<RombonganBelajarServiceResponse<RombonganBelajarWithDetails>> {
    try {
      const rombonganBelajar = await prisma.rombonganBelajar.create({
        data,
      });

      return {
        success: true,
        data: rombonganBelajar,
      };
    } catch (error) {
      console.error('Error creating rombongan belajar:', error);
      if (error instanceof Error && 'code' in error && error.code === 'P2002') {
        return {
          success: false,
          error: 'Data rombongan belajar dengan kombinasi ini sudah ada',
        };
      }
      return {
        success: false,
        error: 'Gagal membuat data rombongan belajar',
      };
    }
  }

  async getRombonganBelajarById(
    id: string,
  ): Promise<RombonganBelajarServiceResponse<RombonganBelajarWithDetails>> {
    try {
      const rombonganBelajar = await prisma.rombonganBelajar.findUnique({
        where: { id },
      });

      if (!rombonganBelajar) {
        return {
          success: false,
          error: 'Data rombongan belajar tidak ditemukan',
        };
      }

      return {
        success: true,
        data: rombonganBelajar,
      };
    } catch (error) {
      console.error('Error fetching rombongan belajar by ID:', error);
      return {
        success: false,
        error: 'Gagal mengambil data rombongan belajar',
      };
    }
  }

  async getAllRombonganBelajar(
    filters: RombonganBelajarFilters = {},
  ): Promise<
    RombonganBelajarServiceResponse<PaginatedRombonganBelajarResponse>
  > {
    try {
      const {
        sekolahId,
        tingkatan_kelas,
        jenis_kelamin,
        tahun_ajaran,
        limit = 10,
        offset = 0,
      } = filters;

      const where: RombonganBelajarWhereInput = {};

      if (sekolahId) where.sekolahId = sekolahId;
      if (tingkatan_kelas) where.tingkatan_kelas = tingkatan_kelas;
      if (jenis_kelamin) where.jenis_kelamin = jenis_kelamin;
      if (tahun_ajaran) where.tahun_ajaran = tahun_ajaran;

      const [rombonganBelajar, total] = await Promise.all([
        prisma.rombonganBelajar.findMany({
          where,
          skip: offset,
          take: limit,
          orderBy: [{ tingkatan_kelas: 'asc' }, { jenis_kelamin: 'asc' }],
        }),
        prisma.rombonganBelajar.count({ where }),
      ]);

      const totalPages = Math.ceil(total / limit);
      const page = Math.floor(offset / limit) + 1;

      return {
        success: true,
        data: {
          rombonganBelajar,
          total,
          page,
          limit,
          totalPages,
        },
      };
    } catch (error) {
      console.error('Error fetching all rombongan belajar:', error);
      return {
        success: false,
        error: 'Gagal mengambil daftar rombongan belajar',
      };
    }
  }

  async updateRombonganBelajar(
    id: string,
    data: UpdateRombonganBelajarData,
  ): Promise<RombonganBelajarServiceResponse<RombonganBelajarWithDetails>> {
    try {
      const rombonganBelajar = await prisma.rombonganBelajar.update({
        where: { id },
        data,
      });

      return {
        success: true,
        data: rombonganBelajar,
      };
    } catch (error) {
      console.error('Error updating rombongan belajar:', error);
      if (error instanceof Error && 'code' in error) {
        if (error.code === 'P2002') {
          return {
            success: false,
            error: 'Data rombongan belajar dengan kombinasi ini sudah ada',
          };
        }
        if (error.code === 'P2025') {
          return {
            success: false,
            error: 'Data rombongan belajar tidak ditemukan',
          };
        }
      }
      return {
        success: false,
        error: 'Gagal mengupdate data rombongan belajar',
      };
    }
  }

  async deleteRombonganBelajar(
    id: string,
  ): Promise<RombonganBelajarServiceResponse<boolean>> {
    try {
      await prisma.rombonganBelajar.delete({
        where: { id },
      });

      return {
        success: true,
        data: true,
      };
    } catch (error) {
      console.error('Error deleting rombongan belajar:', error);
      if (error instanceof Error && 'code' in error && error.code === 'P2025') {
        return {
          success: false,
          error: 'Data rombongan belajar tidak ditemukan',
        };
      }
      return {
        success: false,
        error: 'Gagal menghapus data rombongan belajar',
      };
    }
  }

  async getRombonganBelajarStatistics(
    sekolahId: string,
    tahunAjaran: string,
  ): Promise<RombonganBelajarServiceResponse<RombonganBelajarStatistics>> {
    try {
      const [
        totalSiswa,
        totalKelas7,
        totalKelas8,
        totalKelas9,
        totalLakiLaki,
        totalPerempuan,
        totalRombel,
      ] = await Promise.all([
        prisma.rombonganBelajar.aggregate({
          where: { sekolahId, tahun_ajaran: tahunAjaran },
          _sum: { jumlah_siswa: true },
        }),
        prisma.rombonganBelajar.aggregate({
          where: { sekolahId, tahun_ajaran: tahunAjaran, tingkatan_kelas: '7' },
          _sum: { jumlah_siswa: true },
        }),
        prisma.rombonganBelajar.aggregate({
          where: { sekolahId, tahun_ajaran: tahunAjaran, tingkatan_kelas: '8' },
          _sum: { jumlah_siswa: true },
        }),
        prisma.rombonganBelajar.aggregate({
          where: { sekolahId, tahun_ajaran: tahunAjaran, tingkatan_kelas: '9' },
          _sum: { jumlah_siswa: true },
        }),
        prisma.rombonganBelajar.aggregate({
          where: { sekolahId, tahun_ajaran: tahunAjaran, jenis_kelamin: 'L' },
          _sum: { jumlah_siswa: true },
        }),
        prisma.rombonganBelajar.aggregate({
          where: { sekolahId, tahun_ajaran: tahunAjaran, jenis_kelamin: 'P' },
          _sum: { jumlah_siswa: true },
        }),
        prisma.rombonganBelajar.count({
          where: { sekolahId, tahun_ajaran: tahunAjaran },
        }),
      ]);

      return {
        success: true,
        data: {
          totalSiswa: totalSiswa._sum.jumlah_siswa || 0,
          totalKelas7: totalKelas7._sum.jumlah_siswa || 0,
          totalKelas8: totalKelas8._sum.jumlah_siswa || 0,
          totalKelas9: totalKelas9._sum.jumlah_siswa || 0,
          totalLakiLaki: totalLakiLaki._sum.jumlah_siswa || 0,
          totalPerempuan: totalPerempuan._sum.jumlah_siswa || 0,
          totalRombel: totalRombel,
        },
      };
    } catch (error) {
      console.error('Error fetching rombongan belajar statistics:', error);
      return {
        success: false,
        error: 'Gagal mengambil statistik rombongan belajar',
      };
    }
  }

  async saveRombonganBelajarFromForm(
    sekolahId: string,
    formData: RombonganBelajarFormData,
  ): Promise<RombonganBelajarServiceResponse<RombonganBelajarWithDetails[]>> {
    try {
      // Delete existing rombongan belajar data for this school and academic year
      await prisma.rombonganBelajar.deleteMany({
        where: {
          sekolahId,
          tahun_ajaran: formData.tahun_ajaran,
        },
      });

      // Prepare data for creation
      const rombonganBelajarData: CreateRombonganBelajarData[] = [
        // Kelas 7
        {
          sekolahId,
          tingkatan_kelas: '7',
          jenis_kelamin: 'L',
          jumlah_siswa: formData.siswaKelas7Laki,
          tahun_ajaran: formData.tahun_ajaran,
        },
        {
          sekolahId,
          tingkatan_kelas: '7',
          jenis_kelamin: 'P',
          jumlah_siswa: formData.siswaKelas7Perempuan,
          tahun_ajaran: formData.tahun_ajaran,
        },
        // Kelas 8
        {
          sekolahId,
          tingkatan_kelas: '8',
          jenis_kelamin: 'L',
          jumlah_siswa: formData.siswaKelas8Laki,
          tahun_ajaran: formData.tahun_ajaran,
        },
        {
          sekolahId,
          tingkatan_kelas: '8',
          jenis_kelamin: 'P',
          jumlah_siswa: formData.siswaKelas8Perempuan,
          tahun_ajaran: formData.tahun_ajaran,
        },
        // Kelas 9
        {
          sekolahId,
          tingkatan_kelas: '9',
          jenis_kelamin: 'L',
          jumlah_siswa: formData.siswaKelas9Laki,
          tahun_ajaran: formData.tahun_ajaran,
        },
        {
          sekolahId,
          tingkatan_kelas: '9',
          jenis_kelamin: 'P',
          jumlah_siswa: formData.siswaKelas9Perempuan,
          tahun_ajaran: formData.tahun_ajaran,
        },
      ];

      // Create new rombongan belajar records
      await prisma.rombonganBelajar.createMany({
        data: rombonganBelajarData,
      });

      // Fetch the created records
      const rombonganBelajar = await prisma.rombonganBelajar.findMany({
        where: {
          sekolahId,
          tahun_ajaran: formData.tahun_ajaran,
        },
        orderBy: [{ tingkatan_kelas: 'asc' }, { jenis_kelamin: 'asc' }],
      });

      return {
        success: true,
        data: rombonganBelajar,
      };
    } catch (error) {
      console.error('Error saving rombongan belajar from form:', error);
      return {
        success: false,
        error: 'Gagal menyimpan data rombongan belajar',
      };
    }
  }

  async getRombonganBelajarBySekolah(
    sekolahId: string,
    tahunAjaran?: string,
  ): Promise<RombonganBelajarServiceResponse<RombonganBelajarWithDetails[]>> {
    try {
      const where: RombonganBelajarWhereInput = { sekolahId };
      if (tahunAjaran) where.tahun_ajaran = tahunAjaran;

      const rombonganBelajar = await prisma.rombonganBelajar.findMany({
        where,
        orderBy: [
          { tahun_ajaran: 'desc' },
          { tingkatan_kelas: 'asc' },
          { jenis_kelamin: 'asc' },
        ],
      });

      return {
        success: true,
        data: rombonganBelajar,
      };
    } catch (error) {
      console.error('Error fetching rombongan belajar by sekolah:', error);
      return {
        success: false,
        error: 'Gagal mengambil data rombongan belajar sekolah',
      };
    }
  }
}
