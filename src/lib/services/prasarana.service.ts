import prisma from '@/lib/prisma';
import type {
  Prasarana,
  CreatePrasaranaData,
  PrasaranaServiceResponse,
  PrasaranaFormData,
} from '@/types/prasarana';

export class PrasaranaService {
  /**
   * Get all prasarana for a specific school and academic year
   */
  static async getPrasaranaBySekolahIdAndTahunAjaran(
    sekolahId: string,
    tahunAjaran: string,
  ): Promise<Prasarana[]> {
    try {
      const prasarana = await prisma.prasarana.findMany({
        where: {
          sekolahId,
          tahun_ajaran: tahunAjaran,
        },
        orderBy: {
          createdAt: 'asc',
        },
      });

      return prasarana;
    } catch (error) {
      console.error('Error fetching prasarana:', error);
      throw new Error('Failed to fetch prasarana data');
    }
  }

  /**
   * Create a new prasarana record
   */
  static async createPrasarana(
    data: CreatePrasaranaData,
  ): Promise<PrasaranaServiceResponse<Prasarana>> {
    try {
      const prasarana = await prisma.prasarana.create({
        data,
      });

      return {
        success: true,
        data: prasarana,
      };
    } catch (error) {
      console.error('Error creating prasarana:', error);
      return {
        success: false,
        error: 'Failed to create prasarana',
      };
    }
  }

  /**
   * Update existing prasarana record
   */
  static async updatePrasarana(
    id: string,
    data: Partial<CreatePrasaranaData>,
  ): Promise<PrasaranaServiceResponse<Prasarana>> {
    try {
      const prasarana = await prisma.prasarana.update({
        where: { id },
        data,
      });

      return {
        success: true,
        data: prasarana,
      };
    } catch (error) {
      console.error('Error updating prasarana:', error);
      return {
        success: false,
        error: 'Failed to update prasarana',
      };
    }
  }

  /**
   * Delete prasarana record
   */
  static async deletePrasarana(
    id: string,
  ): Promise<PrasaranaServiceResponse<void>> {
    try {
      await prisma.prasarana.delete({
        where: { id },
      });

      return {
        success: true,
      };
    } catch (error) {
      console.error('Error deleting prasarana:', error);
      return {
        success: false,
        error: 'Failed to delete prasarana',
      };
    }
  }

  /**
   * Save prasarana data from form submission
   */
  static async savePrasaranaFromForm(
    sekolahId: string,
    formData: PrasaranaFormData,
  ): Promise<PrasaranaServiceResponse<Prasarana[]>> {
    try {
      const { tahun_ajaran } = formData;

      // Delete existing prasarana records for this school and year
      await prisma.prasarana.deleteMany({
        where: {
          sekolahId,
          tahun_ajaran,
        },
      });

      const prasaranaToCreate: CreatePrasaranaData[] = []; // Meja Kursi Siswa
      if (formData.mejaKursiSiswaTotal > 0) {
        prasaranaToCreate.push({
          sekolahId,
          jenis_prasarana: 'MejaKursiSiswa',
          nama_prasarana: 'Meja dan Kursi Siswa',
          jumlah_total: formData.mejaKursiSiswaTotal,
          jumlah_kondisi_baik: formData.mejaKursiSiswaBaik,
          jumlah_kondisi_rusak: formData.mejaKursiSiswaRusak,
          keterangan: formData.mejaKursiSiswaKeterangan,
          tahun_ajaran,
        });
      }

      // Komputer
      if (formData.komputerTotal > 0) {
        prasaranaToCreate.push({
          sekolahId,
          jenis_prasarana: 'Komputer',
          nama_prasarana: 'Komputer',
          jumlah_total: formData.komputerTotal,
          jumlah_kondisi_baik: formData.komputerBaik,
          jumlah_kondisi_rusak: formData.komputerRusak,
          keterangan: formData.komputerKeterangan,
          tahun_ajaran,
        });
      }

      // Toilet Siswa
      if (formData.toiletSiswaTotal > 0) {
        prasaranaToCreate.push({
          sekolahId,
          jenis_prasarana: 'JambanSiswa',
          nama_prasarana: 'Toilet Siswa',
          jumlah_total: formData.toiletSiswaTotal,
          jumlah_kondisi_baik: formData.toiletSiswaBaik,
          jumlah_kondisi_rusak: formData.toiletSiswaRusak,
          keterangan: formData.toiletSiswaKeterangan,
          tahun_ajaran,
        });
      }

      // Toilet Guru
      if (formData.toiletGuruTotal > 0) {
        prasaranaToCreate.push({
          sekolahId,
          jenis_prasarana: 'JambanGuru',
          nama_prasarana: 'Toilet Guru',
          jumlah_total: formData.toiletGuruTotal,
          jumlah_kondisi_baik: formData.toiletGuruBaik,
          jumlah_kondisi_rusak: formData.toiletGuruRusak,
          keterangan: formData.toiletGuruKeterangan,
          tahun_ajaran,
        });
      } // Prasarana Lainnya
      if (formData.prasaranaLainnya && formData.prasaranaLainnya.length > 0) {
        for (const item of formData.prasaranaLainnya) {
          const { baik, rusak } = this.getCountsFromKondisi(
            item.kondisi,
            item.jumlah,
          );
          prasaranaToCreate.push({
            sekolahId,
            jenis_prasarana: 'PrasaranaLainnya',
            nama_prasarana: item.nama,
            jumlah_total: item.jumlah,
            jumlah_kondisi_baik: baik,
            jumlah_kondisi_rusak: rusak,
            keterangan: item.keterangan,
            tahun_ajaran,
          });
        }
      }

      // Create all prasarana records
      const createdPrasarana = await Promise.all(
        prasaranaToCreate.map((data) => prisma.prasarana.create({ data })),
      );

      return {
        success: true,
        data: createdPrasarana,
      };
    } catch (error) {
      console.error('Error saving prasarana from form:', error);
      return {
        success: false,
        error: 'Failed to save prasarana data',
      };
    }
  }

  /**
   * Helper function to convert condition to counts
   */
  private static getCountsFromKondisi(
    kondisi: string,
    total: number,
  ): { baik: number; rusak: number } {
    switch (kondisi) {
      case 'baik':
        return { baik: total, rusak: 0 };
      case 'rusak-ringan':
      case 'rusak-sedang':
      case 'rusak-berat':
        return { baik: 0, rusak: total };
      default:
        return { baik: 0, rusak: 0 };
    }
  }

  /**
   * Helper function to determine condition from counts
   */
  private static getKondisiFromCounts(prasarana: {
    jumlah_total: number;
    jumlah_kondisi_baik: number;
    jumlah_kondisi_rusak: number;
  }): string {
    if (prasarana.jumlah_total === 0) return '';
    if (prasarana.jumlah_kondisi_baik === prasarana.jumlah_total) return 'baik';
    if (prasarana.jumlah_kondisi_rusak === prasarana.jumlah_total)
      return 'rusak-berat';
    if (prasarana.jumlah_kondisi_baik > prasarana.jumlah_kondisi_rusak)
      return 'rusak-ringan';
    return 'rusak-sedang';
  }
}
