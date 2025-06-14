import prisma from '@/lib/prisma';
import {
  SekolahWithDetails,
  SekolahServiceResponse,
  SekolahWhereInput,
  SekolahPaginationParams,
  SekolahPaginationResult,
  CreateSekolahData,
  UpdateSekolahData,
} from '@/types/sekolah';

export class SekolahService {
  /**
   * Get paginated sekolah with filters and sorting
   */ static async getPaginated({
    page = 1,
    pageSize = 10,
    sortField = 'nama_sekolah',
    sortDirection = 'asc',
    search = '',
    kecamatan,
    nama_sekolah,
    npsn,
    includeDetails = false,
    userBanned,
  }: SekolahPaginationParams): Promise<SekolahPaginationResult> {
    // Build where clause based on filters
    const where: SekolahWhereInput = {};

    // Add search filter (search across multiple fields)
    if (search) {
      where.OR = [
        { nama_sekolah: { contains: search, mode: 'insensitive' } },
        { npsn: { contains: search, mode: 'insensitive' } },
        { nama_kepala_sekolah: { contains: search, mode: 'insensitive' } },
        { alamat_sekolah: { contains: search, mode: 'insensitive' } },
        { kecamatan: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } },
        {
          user: {
            OR: [
              { name: { contains: search, mode: 'insensitive' } },
              { email: { contains: search, mode: 'insensitive' } },
            ],
          },
        },
      ];
    }

    // Add specific filters
    if (kecamatan) {
      where.kecamatan = { contains: kecamatan, mode: 'insensitive' };
    }

    if (nama_sekolah) {
      where.nama_sekolah = { contains: nama_sekolah, mode: 'insensitive' };
    }
    if (npsn) {
      where.npsn = { contains: npsn, mode: 'insensitive' };
    }

    // Add user banned status filter
    if (userBanned !== undefined) {
      where.user = {
        banned: userBanned,
      };
    }

    // Calculate pagination
    const skip = (page - 1) * pageSize;

    // Get order by field
    const orderBy:
      | Record<string, 'asc' | 'desc'>
      | Record<string, Record<string, 'asc' | 'desc'>> = {};

    // Handle nested fields
    if (sortField.includes('.')) {
      const [relation, field] = sortField.split('.');
      orderBy[relation] = { [field]: sortDirection };
    } else {
      orderBy[sortField] = sortDirection;
    }

    // Define include based on includeDetails flag
    const include = includeDetails
      ? {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              banned: true,
            },
          },
          sarana: true,
          prasarana: true,
          kebutuhanPrioritas: true,
          lampiran: true,
          guru: true,
          rombonganBelajar: true,
        }
      : {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              banned: true,
            },
          },
        };

    // Execute query with count
    const [sekolah, totalCount] = await Promise.all([
      prisma.sekolah.findMany({
        where,
        include,
        orderBy,
        skip,
        take: pageSize,
      }),
      prisma.sekolah.count({ where }),
    ]);

    return {
      sekolah,
      pagination: {
        totalCount,
        totalPages: Math.ceil(totalCount / pageSize),
        currentPage: page,
        pageSize,
      },
    };
  }

  static async getSekolahById(
    id: string,
    includeDetails = false,
  ): Promise<SekolahServiceResponse<SekolahWithDetails>> {
    try {
      const sekolah = await prisma.sekolah.findUnique({
        where: { id },
        include: includeDetails
          ? {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                },
              },
              sarana: true,
              prasarana: true,
              kebutuhanPrioritas: true,
              lampiran: true,
              guru: true,
              rombonganBelajar: true,
            }
          : {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                },
              },
            },
      });

      if (!sekolah) {
        return {
          success: false,
          error: 'Sekolah tidak ditemukan',
        };
      }

      return {
        success: true,
        data: sekolah,
      };
    } catch (error) {
      console.error('Error fetching sekolah by ID:', error);
      return {
        success: false,
        error: 'Gagal mengambil data sekolah',
      };
    }
  }

  static async getSekolahByNpsn(
    npsn: string,
  ): Promise<SekolahServiceResponse<SekolahWithDetails>> {
    try {
      const sekolah = await prisma.sekolah.findUnique({
        where: { npsn },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      if (!sekolah) {
        return {
          success: false,
          error: 'Sekolah tidak ditemukan',
        };
      }

      return {
        success: true,
        data: sekolah,
      };
    } catch (error) {
      console.error('Error fetching sekolah by NPSN:', error);
      return {
        success: false,
        error: 'Gagal mengambil data sekolah',
      };
    }
  }

  /**
   * Convenience method for getting all sekolah with default pagination
   */
  static async getAll({
    search = '',
    kecamatan,
    includeDetails = false,
    limit = 50,
  }: {
    search?: string;
    kecamatan?: string;
    includeDetails?: boolean;
    limit?: number;
  } = {}): Promise<SekolahServiceResponse<SekolahWithDetails[]>> {
    try {
      const result = await SekolahService.getPaginated({
        page: 1,
        pageSize: limit,
        search,
        kecamatan,
        includeDetails,
        sortField: 'nama_sekolah',
        sortDirection: 'asc',
      });

      return {
        success: true,
        data: result.sekolah,
      };
    } catch (error) {
      console.error('Error fetching all sekolah:', error);
      return { success: false, error: 'Gagal mengambil daftar sekolah' };
    }
  }

  static async checkNpsnExists(
    npsn: string,
    excludeId?: string,
  ): Promise<boolean> {
    try {
      const where: SekolahWhereInput = { npsn };

      if (excludeId) {
        where.id = { not: excludeId };
      }

      const count = await prisma.sekolah.count({ where });
      return count > 0;
    } catch (error) {
      console.error('Error checking NPSN existence:', error);
      return false;
    }
  }

  static async getSekolahByUserId(
    userId: string,
  ): Promise<SekolahServiceResponse<SekolahWithDetails>> {
    try {
      const sekolah = await prisma.sekolah.findUnique({
        where: { userId },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      if (!sekolah) {
        return {
          success: false,
          error: 'User tidak terkait dengan sekolah',
        };
      }

      return {
        success: true,
        data: sekolah,
      };
    } catch (error) {
      console.error('Error fetching sekolah by user ID:', error);
      return {
        success: false,
        error: 'Gagal mengambil data sekolah user',
      };
    }
  }

  /**
   * Get sekolah statistics with filters
   */
  static async getStatistics(
    filters: {
      search?: string;
      kecamatan?: string;
      tahunAjaran?: string;
    } = {},
  ): Promise<
    SekolahServiceResponse<{
      totalSekolah: number;
      totalSarana: number;
      totalPrasarana: number;
      totalGuru: number;
      totalSiswa: number;
      totalKebutuhanPrioritas: number;
      totalLampiran: number;
    }>
  > {
    try {
      const { search = '', kecamatan, tahunAjaran } = filters;

      // Build where clause for sekolah
      const where: SekolahWhereInput = {};

      if (search) {
        where.OR = [
          { nama_sekolah: { contains: search, mode: 'insensitive' } },
          { npsn: { contains: search, mode: 'insensitive' } },
          { kecamatan: { contains: search, mode: 'insensitive' } },
        ];
      }

      if (kecamatan) {
        where.kecamatan = { contains: kecamatan, mode: 'insensitive' };
      }

      // Build where clause for related data
      const relatedWhere: { tahun_ajaran?: string } = {};
      if (tahunAjaran) {
        relatedWhere.tahun_ajaran = tahunAjaran;
      }

      const [
        totalSekolah,
        sarana,
        prasarana,
        guru,
        rombel,
        kebutuhan,
        lampiran,
      ] = await Promise.all([
        prisma.sekolah.count({ where }),
        prisma.sarana.aggregate({
          where: tahunAjaran ? { tahun_ajaran: tahunAjaran } : {},
          _sum: { jumlah_total: true },
        }),
        prisma.prasarana.aggregate({
          where: tahunAjaran ? { tahun_ajaran: tahunAjaran } : {},
          _sum: { jumlah_total: true },
        }),
        prisma.guru.aggregate({
          where: tahunAjaran ? { tahun_ajaran: tahunAjaran } : {},
          _sum: { jumlah: true },
        }),
        prisma.rombonganBelajar.aggregate({
          where: tahunAjaran ? { tahun_ajaran: tahunAjaran } : {},
          _sum: { jumlah_siswa: true },
        }),
        prisma.kebutuhanPrioritas.count({
          where: tahunAjaran ? { tahun_ajaran: tahunAjaran } : {},
        }),
        prisma.lampiran.count(),
      ]);

      return {
        success: true,
        data: {
          totalSekolah,
          totalSarana: sarana._sum.jumlah_total || 0,
          totalPrasarana: prasarana._sum.jumlah_total || 0,
          totalGuru: guru._sum.jumlah || 0,
          totalSiswa: rombel._sum.jumlah_siswa || 0,
          totalKebutuhanPrioritas: kebutuhan,
          totalLampiran: lampiran,
        },
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
   * Get statistics for a specific sekolah
   */
  static async getSekolahStatistics(
    sekolahId: string,
    tahunAjaran: string,
  ): Promise<
    SekolahServiceResponse<{
      totalSarana: number;
      totalPrasarana: number;
      totalGuru: number;
      totalSiswa: number;
      totalKebutuhanPrioritas: number;
      totalLampiran: number;
    }>
  > {
    try {
      const [sarana, prasarana, guru, rombel, kebutuhan, lampiran] =
        await Promise.all([
          prisma.sarana.aggregate({
            where: { sekolahId, tahun_ajaran: tahunAjaran },
            _sum: { jumlah_total: true },
          }),
          prisma.prasarana.aggregate({
            where: { sekolahId, tahun_ajaran: tahunAjaran },
            _sum: { jumlah_total: true },
          }),
          prisma.guru.aggregate({
            where: { sekolahId, tahun_ajaran: tahunAjaran },
            _sum: { jumlah: true },
          }),
          prisma.rombonganBelajar.aggregate({
            where: { sekolahId, tahun_ajaran: tahunAjaran },
            _sum: { jumlah_siswa: true },
          }),
          prisma.kebutuhanPrioritas.count({
            where: { sekolahId, tahun_ajaran: tahunAjaran },
          }),
          prisma.lampiran.count({
            where: { sekolahId },
          }),
        ]);

      return {
        success: true,
        data: {
          totalSarana: sarana._sum.jumlah_total || 0,
          totalPrasarana: prasarana._sum.jumlah_total || 0,
          totalGuru: guru._sum.jumlah || 0,
          totalSiswa: rombel._sum.jumlah_siswa || 0,
          totalKebutuhanPrioritas: kebutuhan,
          totalLampiran: lampiran,
        },
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
   * Approve a sekolah by updating the user's banned status
   */
  static async approveSekolah(
    sekolahId: string,
  ): Promise<SekolahServiceResponse<SekolahWithDetails>> {
    try {
      // First get the sekolah to find the user
      const sekolah = await prisma.sekolah.findUnique({
        where: { id: sekolahId },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              banned: true,
            },
          },
        },
      });

      if (!sekolah) {
        return {
          success: false,
          error: 'Sekolah tidak ditemukan',
        };
      }

      // Update the user's banned status
      await prisma.user.update({
        where: { id: sekolah.userId },
        data: { banned: false, banReason: null },
      });

      // Return updated sekolah
      const updatedSekolah = await prisma.sekolah.findUnique({
        where: { id: sekolahId },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              banned: true,
            },
          },
        },
      });

      return {
        success: true,
        data: updatedSekolah as SekolahWithDetails,
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
   * Reject a sekolah by updating the user's banned status
   */
  static async rejectSekolah(
    sekolahId: string,
    reason?: string,
  ): Promise<SekolahServiceResponse<SekolahWithDetails>> {
    try {
      // First get the sekolah to find the user
      const sekolah = await prisma.sekolah.findUnique({
        where: { id: sekolahId },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              banned: true,
            },
          },
        },
      });

      if (!sekolah) {
        return {
          success: false,
          error: 'Sekolah tidak ditemukan',
        };
      }

      // Update the user's banned status
      await prisma.user.update({
        where: { id: sekolah.userId },
        data: {
          banned: true,
          banReason: reason || 'Ditolak oleh admin',
        },
      });

      // Return updated sekolah
      const updatedSekolah = await prisma.sekolah.findUnique({
        where: { id: sekolahId },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              banned: true,
            },
          },
        },
      });

      return {
        success: true,
        data: updatedSekolah as SekolahWithDetails,
      };
    } catch (error) {
      console.error('Error rejecting sekolah:', error);
      return {
        success: false,
        error: 'Gagal menolak sekolah',
      };
    }
  }

  /**
   * Update sekolah information
   */ static async updateSekolah(
    sekolahId: string,
    updateData: UpdateSekolahData,
  ): Promise<SekolahServiceResponse<SekolahWithDetails>> {
    try {
      // Check if sekolah exists
      const existingSekolah = await prisma.sekolah.findUnique({
        where: { id: sekolahId },
      });

      if (!existingSekolah) {
        return {
          success: false,
          error: 'Sekolah tidak ditemukan',
        };
      }

      // Check NPSN uniqueness if updating NPSN
      if (updateData.npsn && updateData.npsn !== existingSekolah.npsn) {
        const npsnExists = await SekolahService.checkNpsnExists(
          updateData.npsn,
          sekolahId,
        );
        if (npsnExists) {
          return {
            success: false,
            error: 'NPSN sudah digunakan oleh sekolah lain',
          };
        }
      }

      // Update sekolah
      const updatedSekolah = await prisma.sekolah.update({
        where: { id: sekolahId },
        data: {
          ...updateData,
          updatedAt: new Date(),
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      return {
        success: true,
        data: updatedSekolah,
      };
    } catch (error) {
      console.error('Error updating sekolah:', error);
      return {
        success: false,
        error: 'Gagal mengupdate data sekolah',
      };
    }
  }
  /**
   * Create a new sekolah
   */
  static async createSekolah(
    sekolahData: CreateSekolahData,
  ): Promise<SekolahServiceResponse<SekolahWithDetails>> {
    try {
      // Check if NPSN already exists
      const npsnExists = await SekolahService.checkNpsnExists(sekolahData.npsn);
      if (npsnExists) {
        return {
          success: false,
          error: 'NPSN sudah digunakan oleh sekolah lain',
        };
      }

      // Check if user already has a sekolah
      const existingSekolah = await prisma.sekolah.findUnique({
        where: { userId: sekolahData.userId },
      });

      if (existingSekolah) {
        return {
          success: false,
          error: 'User sudah memiliki sekolah',
        };
      }

      // Create sekolah
      const newSekolah = await prisma.sekolah.create({
        data: sekolahData,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      return {
        success: true,
        data: newSekolah,
      };
    } catch (error) {
      console.error('Error creating sekolah:', error);
      return {
        success: false,
        error: 'Gagal membuat data sekolah',
      };
    }
  }

  /**
   * Delete a sekolah
   */
  static async deleteSekolah(
    sekolahId: string,
  ): Promise<SekolahServiceResponse<boolean>> {
    try {
      // Check if sekolah exists
      const existingSekolah = await prisma.sekolah.findUnique({
        where: { id: sekolahId },
      });

      if (!existingSekolah) {
        return {
          success: false,
          error: 'Sekolah tidak ditemukan',
        };
      }

      // Delete sekolah (this will cascade delete related data)
      await prisma.sekolah.delete({
        where: { id: sekolahId },
      });

      return {
        success: true,
        data: true,
      };
    } catch (error) {
      console.error('Error deleting sekolah:', error);
      return {
        success: false,
        error: 'Gagal menghapus data sekolah',
      };
    }
  }

  /**
   * Validate sekolah data before creation
   */
  static async validateSekolahData(data: CreateSekolahData): Promise<{
    isValid: boolean;
    errors: string[];
  }> {
    const errors: string[] = [];

    try {
      // Check required fields
      if (!data.nama_sekolah?.trim()) {
        errors.push('Nama sekolah wajib diisi');
      }

      if (!data.npsn?.trim()) {
        errors.push('NPSN wajib diisi');
      }

      if (!data.userId?.trim()) {
        errors.push('User ID wajib diisi');
      }

      // Validate NPSN format (assuming 8 digits)
      if (data.npsn && !/^\d{8}$/.test(data.npsn.trim())) {
        errors.push('NPSN harus berupa 8 digit angka');
      }

      // Check if NPSN already exists
      if (data.npsn) {
        const npsnExists = await SekolahService.checkNpsnExists(data.npsn);
        if (npsnExists) {
          errors.push('NPSN sudah digunakan oleh sekolah lain');
        }
      }

      // Check if user already has a sekolah
      if (data.userId) {
        const existingSekolah = await prisma.sekolah.findUnique({
          where: { userId: data.userId },
        });

        if (existingSekolah) {
          errors.push('User sudah memiliki sekolah');
        }
      }

      // Validate phone number format if provided
      if (data.phone && !/^[\d\-\+\(\)\s]+$/.test(data.phone)) {
        errors.push('Format nomor telepon tidak valid');
      }

      return {
        isValid: errors.length === 0,
        errors,
      };
    } catch (error) {
      console.error('Error validating sekolah data:', error);
      return {
        isValid: false,
        errors: ['Terjadi kesalahan saat validasi data'],
      };
    }
  }
}
