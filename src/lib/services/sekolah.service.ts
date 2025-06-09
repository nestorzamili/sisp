import prisma from '@/lib/prisma';
import { Prisma } from '@/generated/prisma';
import {
  CreateSekolahData,
  UpdateSekolahData,
  SekolahWithDetails,
  SekolahFilters,
  SekolahServiceResponse,
  PaginatedSekolahResponse,
  SekolahStatistics,
} from '@/types/sekolah';

export class SekolahService {
  async createSekolah(
    data: CreateSekolahData,
  ): Promise<SekolahServiceResponse<SekolahWithDetails>> {
    try {
      const sekolah = await prisma.sekolah.create({
        data,
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
        data: sekolah,
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        return {
          success: false,
          error: 'NPSN sudah terdaftar',
        };
      }
      return {
        success: false,
        error: 'Gagal membuat data sekolah',
      };
    }
  }

  async getSekolahById(
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

  async getSekolahByNpsn(
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

  async getAllSekolah(
    filters: SekolahFilters = {},
  ): Promise<SekolahServiceResponse<PaginatedSekolahResponse>> {
    try {
      const { nama_sekolah, npsn, kecamatan, limit = 10, offset = 0 } = filters;

      const where: Prisma.SekolahWhereInput = {};

      if (nama_sekolah) {
        where.nama_sekolah = {
          contains: nama_sekolah,
          mode: 'insensitive',
        };
      }

      if (npsn) {
        where.npsn = {
          contains: npsn,
          mode: 'insensitive',
        };
      }

      if (kecamatan) {
        where.kecamatan = {
          contains: kecamatan,
          mode: 'insensitive',
        };
      }

      const [sekolah, total] = await Promise.all([
        prisma.sekolah.findMany({
          where,
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
          skip: offset,
          take: limit,
          orderBy: {
            nama_sekolah: 'asc',
          },
        }),
        prisma.sekolah.count({ where }),
      ]);

      const totalPages = Math.ceil(total / limit);
      const page = Math.floor(offset / limit) + 1;

      return {
        success: true,
        data: {
          sekolah,
          total,
          page,
          limit,
          totalPages,
        },
      };
    } catch (error) {
      console.error('Error fetching all sekolah:', error);
      return {
        success: false,
        error: 'Gagal mengambil daftar sekolah',
      };
    }
  }

  async updateSekolah(
    id: string,
    data: UpdateSekolahData,
  ): Promise<SekolahServiceResponse<SekolahWithDetails>> {
    try {
      const sekolah = await prisma.sekolah.update({
        where: { id },
        data,
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
        data: sekolah,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return {
            success: false,
            error: 'NPSN sudah terdaftar',
          };
        }
        if (error.code === 'P2025') {
          return {
            success: false,
            error: 'Sekolah tidak ditemukan',
          };
        }
      }
      return {
        success: false,
        error: 'Gagal mengupdate data sekolah',
      };
    }
  }

  async deleteSekolah(id: string): Promise<SekolahServiceResponse<boolean>> {
    try {
      await prisma.sekolah.delete({
        where: { id },
      });

      return {
        success: true,
        data: true,
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        return {
          success: false,
          error: 'Sekolah tidak ditemukan',
        };
      }
      return {
        success: false,
        error: 'Gagal menghapus data sekolah',
      };
    }
  }

  async getSekolahStatistics(
    sekolahId: string,
    tahunAjaran: string,
  ): Promise<SekolahServiceResponse<SekolahStatistics>> {
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

  async checkNpsnExists(npsn: string, excludeId?: string): Promise<boolean> {
    try {
      const where: Prisma.SekolahWhereInput = { npsn };

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

  async getSekolahByUserId(
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
}
