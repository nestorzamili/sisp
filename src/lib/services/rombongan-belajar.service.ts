import prisma from '@/lib/prisma';
import {
  CreateRombonganBelajarData,
  RombonganBelajarWithDetails,
  RombonganBelajarServiceResponse,
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
