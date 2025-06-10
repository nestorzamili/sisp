import prisma from '@/lib/prisma';
import {
  CreateGuruData,
  UpdateGuruData,
  GuruWithDetails,
  GuruFilters,
  GuruServiceResponse,
  PaginatedGuruResponse,
  GuruStatistics,
  GuruWhereInput,
  GuruFormData,
} from '@/types/guru';

export class GuruService {
  async createGuru(
    data: CreateGuruData,
  ): Promise<GuruServiceResponse<GuruWithDetails>> {
    try {
      const guru = await prisma.guru.create({
        data,
      });

      return {
        success: true,
        data: guru,
      };
    } catch (error) {
      console.error('Error creating guru:', error);
      if (error instanceof Error && 'code' in error && error.code === 'P2002') {
        return {
          success: false,
          error: 'Data guru dengan kombinasi ini sudah ada',
        };
      }
      return {
        success: false,
        error: 'Gagal membuat data guru',
      };
    }
  }

  async getGuruById(id: string): Promise<GuruServiceResponse<GuruWithDetails>> {
    try {
      const guru = await prisma.guru.findUnique({
        where: { id },
      });

      if (!guru) {
        return {
          success: false,
          error: 'Data guru tidak ditemukan',
        };
      }

      return {
        success: true,
        data: guru,
      };
    } catch (error) {
      console.error('Error fetching guru by ID:', error);
      return {
        success: false,
        error: 'Gagal mengambil data guru',
      };
    }
  }

  async getAllGuru(
    filters: GuruFilters = {},
  ): Promise<GuruServiceResponse<PaginatedGuruResponse>> {
    try {
      const {
        sekolahId,
        status_guru,
        jenis_kelamin,
        tahun_ajaran,
        limit = 10,
        offset = 0,
      } = filters;

      const where: GuruWhereInput = {};

      if (sekolahId) where.sekolahId = sekolahId;
      if (status_guru) where.status_guru = status_guru;
      if (jenis_kelamin) where.jenis_kelamin = jenis_kelamin;
      if (tahun_ajaran) where.tahun_ajaran = tahun_ajaran;

      const [guru, total] = await Promise.all([
        prisma.guru.findMany({
          where,
          skip: offset,
          take: limit,
          orderBy: [{ status_guru: 'asc' }, { jenis_kelamin: 'asc' }],
        }),
        prisma.guru.count({ where }),
      ]);

      const totalPages = Math.ceil(total / limit);
      const page = Math.floor(offset / limit) + 1;

      return {
        success: true,
        data: {
          guru,
          total,
          page,
          limit,
          totalPages,
        },
      };
    } catch (error) {
      console.error('Error fetching all guru:', error);
      return {
        success: false,
        error: 'Gagal mengambil daftar guru',
      };
    }
  }

  async updateGuru(
    id: string,
    data: UpdateGuruData,
  ): Promise<GuruServiceResponse<GuruWithDetails>> {
    try {
      const guru = await prisma.guru.update({
        where: { id },
        data,
      });

      return {
        success: true,
        data: guru,
      };
    } catch (error) {
      console.error('Error updating guru:', error);
      if (error instanceof Error && 'code' in error) {
        if (error.code === 'P2002') {
          return {
            success: false,
            error: 'Data guru dengan kombinasi ini sudah ada',
          };
        }
        if (error.code === 'P2025') {
          return {
            success: false,
            error: 'Data guru tidak ditemukan',
          };
        }
      }
      return {
        success: false,
        error: 'Gagal mengupdate data guru',
      };
    }
  }

  async deleteGuru(id: string): Promise<GuruServiceResponse<boolean>> {
    try {
      await prisma.guru.delete({
        where: { id },
      });

      return {
        success: true,
        data: true,
      };
    } catch (error) {
      console.error('Error deleting guru:', error);
      if (error instanceof Error && 'code' in error && error.code === 'P2025') {
        return {
          success: false,
          error: 'Data guru tidak ditemukan',
        };
      }
      return {
        success: false,
        error: 'Gagal menghapus data guru',
      };
    }
  }

  async getGuruStatistics(
    sekolahId: string,
    tahunAjaran: string,
  ): Promise<GuruServiceResponse<GuruStatistics>> {
    try {
      const [
        totalGuru,
        totalPNS,
        totalPPPK,
        totalHonorer,
        totalLakiLaki,
        totalPerempuan,
      ] = await Promise.all([
        prisma.guru.aggregate({
          where: { sekolahId, tahun_ajaran: tahunAjaran },
          _sum: { jumlah: true },
        }),
        prisma.guru.aggregate({
          where: {
            sekolahId,
            tahun_ajaran: tahunAjaran,
            status_guru: 'PNS',
          },
          _sum: { jumlah: true },
        }),
        prisma.guru.aggregate({
          where: {
            sekolahId,
            tahun_ajaran: tahunAjaran,
            status_guru: 'PPPK',
          },
          _sum: { jumlah: true },
        }),
        prisma.guru.aggregate({
          where: {
            sekolahId,
            tahun_ajaran: tahunAjaran,
            status_guru: 'Honorer',
          },
          _sum: { jumlah: true },
        }),
        prisma.guru.aggregate({
          where: {
            sekolahId,
            tahun_ajaran: tahunAjaran,
            jenis_kelamin: 'L',
          },
          _sum: { jumlah: true },
        }),
        prisma.guru.aggregate({
          where: {
            sekolahId,
            tahun_ajaran: tahunAjaran,
            jenis_kelamin: 'P',
          },
          _sum: { jumlah: true },
        }),
      ]);

      return {
        success: true,
        data: {
          totalGuru: totalGuru._sum.jumlah || 0,
          totalPNS: totalPNS._sum.jumlah || 0,
          totalPPPK: totalPPPK._sum.jumlah || 0,
          totalHonorer: totalHonorer._sum.jumlah || 0,
          totalLakiLaki: totalLakiLaki._sum.jumlah || 0,
          totalPerempuan: totalPerempuan._sum.jumlah || 0,
        },
      };
    } catch (error) {
      console.error('Error fetching guru statistics:', error);
      return {
        success: false,
        error: 'Gagal mengambil statistik guru',
      };
    }
  }

  async saveGuruFromForm(
    sekolahId: string,
    formData: GuruFormData,
  ): Promise<GuruServiceResponse<GuruWithDetails[]>> {
    try {
      // Delete existing guru data for this school and academic year
      await prisma.guru.deleteMany({
        where: {
          sekolahId,
          tahun_ajaran: formData.tahun_ajaran,
        },
      });

      // Prepare data for creation
      const guruData: CreateGuruData[] = [
        // PNS
        {
          sekolahId,
          status_guru: 'PNS',
          jenis_kelamin: 'L',
          jumlah: formData.guruPnsLaki,
          tahun_ajaran: formData.tahun_ajaran,
        },
        {
          sekolahId,
          status_guru: 'PNS',
          jenis_kelamin: 'P',
          jumlah: formData.guruPnsPerempuan,
          tahun_ajaran: formData.tahun_ajaran,
        },
        // PPPK
        {
          sekolahId,
          status_guru: 'PPPK',
          jenis_kelamin: 'L',
          jumlah: formData.guruPpppLaki,
          tahun_ajaran: formData.tahun_ajaran,
        },
        {
          sekolahId,
          status_guru: 'PPPK',
          jenis_kelamin: 'P',
          jumlah: formData.guruPpppPerempuan,
          tahun_ajaran: formData.tahun_ajaran,
        },
        // Honorer (GTT)
        {
          sekolahId,
          status_guru: 'Honorer',
          jenis_kelamin: 'L',
          jumlah: formData.guruGttLaki,
          tahun_ajaran: formData.tahun_ajaran,
        },
        {
          sekolahId,
          status_guru: 'Honorer',
          jenis_kelamin: 'P',
          jumlah: formData.guruGttPerempuan,
          tahun_ajaran: formData.tahun_ajaran,
        },
      ];

      // Create new guru records
      await prisma.guru.createMany({
        data: guruData,
      });

      // Fetch the created records
      const guru = await prisma.guru.findMany({
        where: {
          sekolahId,
          tahun_ajaran: formData.tahun_ajaran,
        },
        orderBy: [{ status_guru: 'asc' }, { jenis_kelamin: 'asc' }],
      });

      return {
        success: true,
        data: guru,
      };
    } catch (error) {
      console.error('Error saving guru from form:', error);
      return {
        success: false,
        error: 'Gagal menyimpan data guru',
      };
    }
  }

  async getGuruBySekolah(
    sekolahId: string,
    tahunAjaran?: string,
  ): Promise<GuruServiceResponse<GuruWithDetails[]>> {
    try {
      const where: GuruWhereInput = { sekolahId };
      if (tahunAjaran) where.tahun_ajaran = tahunAjaran;

      const guru = await prisma.guru.findMany({
        where,
        orderBy: [
          { tahun_ajaran: 'desc' },
          { status_guru: 'asc' },
          { jenis_kelamin: 'asc' },
        ],
      });

      return {
        success: true,
        data: guru,
      };
    } catch (error) {
      console.error('Error fetching guru by sekolah:', error);
      return {
        success: false,
        error: 'Gagal mengambil data guru sekolah',
      };
    }
  }
}
