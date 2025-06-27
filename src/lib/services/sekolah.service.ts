import prisma from '@/lib/prisma';
import logger from '@/lib/logger';
import { Prisma, ReviewStatus } from '@prisma/client';
import {
  SekolahWithDetails,
  SekolahServiceResponse,
  SekolahPaginationParams,
  SekolahPaginationResult,
  CreateSekolahData,
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
    sekolahStatus,
  }: SekolahPaginationParams): Promise<SekolahPaginationResult> {
    // Build where clause based on filters
    const where: Prisma.SekolahWhereInput = {};

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
    } // Add sekolah status filter
    if (sekolahStatus !== undefined) {
      where.status = sekolahStatus as ReviewStatus;
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
        logger.info({ id }, 'Sekolah tidak ditemukan pada getSekolahById');
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
      logger.error({ err: error }, 'Error fetching sekolah by ID');
      return {
        success: false,
        error: 'Gagal mengambil data sekolah',
      };
    }
  }

  static async checkNpsnExists(
    npsn: string,
    excludeId?: string,
  ): Promise<boolean> {
    try {
      const where: Prisma.SekolahWhereInput = { npsn };

      if (excludeId) {
        where.id = { not: excludeId };
      }

      const count = await prisma.sekolah.count({ where });
      if (count > 0) {
        logger.info({ npsn, excludeId }, 'NPSN sudah digunakan');
      }
      return count > 0;
    } catch (error) {
      logger.error({ err: error }, 'Error checking NPSN existence');
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
        logger.info(
          { userId },
          'User tidak terkait dengan sekolah pada getSekolahByUserId',
        );
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
      logger.error({ err: error }, 'Error fetching sekolah by user ID');
      return {
        success: false,
        error: 'Gagal mengambil data sekolah user',
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
        logger.info(
          { npsn: sekolahData.npsn },
          'NPSN sudah digunakan pada createSekolah',
        );
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
        logger.info(
          { userId: sekolahData.userId },
          'User sudah memiliki sekolah pada createSekolah',
        );
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
      logger.info(
        { sekolahId: newSekolah.id, userId: sekolahData.userId },
        'Sekolah berhasil dibuat',
      );
      return {
        success: true,
        data: newSekolah,
      };
    } catch (error) {
      logger.error({ err: error }, 'Error creating sekolah');
      return {
        success: false,
        error: 'Gagal membuat data sekolah',
      };
    }
  }
}
