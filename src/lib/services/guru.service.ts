import prisma from '@/lib/prisma';
import {
  CreateGuruData,
  GuruWithDetails,
  GuruServiceResponse,
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
