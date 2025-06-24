import prisma from '@/lib/prisma';
import type {
  KebutuhanPrioritas,
  CreateKebutuhanPrioritasData,
  KebutuhanPrioritasServiceResponse,
  KebutuhanPrioritasFormData,
} from '@/types/kebutuhan-prioritas';
import { JenisKebutuhan } from '@prisma/client';

export class KebutuhanPrioritasService {
  /**
   * Get all priority needs for a specific school and academic year
   */
  static async getKebutuhanPrioritasBySekolahIdAndTahunAjaran(
    sekolahId: string,
    tahunAjaran: string,
  ): Promise<KebutuhanPrioritas[]> {
    try {
      const kebutuhanPrioritas = await prisma.kebutuhanPrioritas.findMany({
        where: {
          sekolahId,
          tahun_ajaran: tahunAjaran,
        },
        orderBy: {
          createdAt: 'asc',
        },
      });

      return kebutuhanPrioritas;
    } catch (error) {
      console.error('Error fetching kebutuhan prioritas:', error);
      throw new Error('Failed to fetch priority needs data');
    }
  }

  /**
   * Create a new priority need record
   */
  static async createKebutuhanPrioritas(
    data: CreateKebutuhanPrioritasData,
  ): Promise<KebutuhanPrioritasServiceResponse<KebutuhanPrioritas>> {
    try {
      const kebutuhanPrioritas = await prisma.kebutuhanPrioritas.create({
        data,
      });

      return {
        success: true,
        data: kebutuhanPrioritas,
      };
    } catch (error) {
      console.error('Error creating kebutuhan prioritas:', error);
      return {
        success: false,
        error: 'Failed to create priority need',
      };
    }
  }

  /**
   * Save priority needs data from form submission
   */
  static async saveKebutuhanPrioritasFromForm(
    sekolahId: string,
    formData: KebutuhanPrioritasFormData,
  ): Promise<KebutuhanPrioritasServiceResponse<KebutuhanPrioritas[]>> {
    try {
      const { tahun_ajaran, kebutuhanPrioritas } = formData;

      // Delete existing priority needs records for this school and year
      await prisma.kebutuhanPrioritas.deleteMany({
        where: {
          sekolahId,
          tahun_ajaran,
        },
      });

      // Create new priority needs record with combined sarana and prasarana
      const kebutuhanPrioritasRecord = await prisma.kebutuhanPrioritas.create({
        data: {
          sekolahId,
          jenis: JenisKebutuhan.Sarana, // We use Sarana as default for general priority needs
          penjelasan: kebutuhanPrioritas,
          tahun_ajaran,
        },
      });

      return {
        success: true,
        data: [kebutuhanPrioritasRecord],
      };
    } catch (error) {
      console.error('Error saving kebutuhan prioritas from form:', error);
      return {
        success: false,
        error: 'Failed to save priority needs data',
      };
    }
  }

  /**
   * Check if priority needs data exists for completion status
   */
  static async hasKebutuhanPrioritasData(
    sekolahId: string,
    tahunAjaran: string,
  ): Promise<boolean> {
    try {
      const count = await prisma.kebutuhanPrioritas.count({
        where: {
          sekolahId,
          tahun_ajaran: tahunAjaran,
          penjelasan: {
            not: '',
          },
        },
      });

      return count > 0;
    } catch (error) {
      console.error('Error checking kebutuhan prioritas data:', error);
      return false;
    }
  }
}
