import prisma from '@/lib/prisma';
import {
  ReviewData,
  ReviewServiceResponse,
  ReviewPaginationParams,
  ReviewPaginationResult,
  ReviewHistoryItem,
  ReviewStats,
} from '@/types/review';

export class ReviewService {
  /**
   * Get paginated pending reviews (sekolah with PENDING status)
   */
  static async getPendingReviews({
    page = 1,
    pageSize = 10,
    sortField = 'createdAt',
    sortDirection = 'desc',
    search = '',
  }: ReviewPaginationParams): Promise<
    ReviewServiceResponse<ReviewPaginationResult>
  > {
    try {
      // Build where clause for pending reviews
      const where = {
        status: 'PENDING' as const,
        ...(search && {
          OR: [
            {
              nama_sekolah: { contains: search, mode: 'insensitive' as const },
            },
            { npsn: { contains: search, mode: 'insensitive' as const } },
            {
              nama_kepala_sekolah: {
                contains: search,
                mode: 'insensitive' as const,
              },
            },
            {
              alamat_sekolah: {
                contains: search,
                mode: 'insensitive' as const,
              },
            },
            { kecamatan: { contains: search, mode: 'insensitive' as const } },
            {
              user: {
                OR: [
                  { name: { contains: search, mode: 'insensitive' as const } },
                  { email: { contains: search, mode: 'insensitive' as const } },
                ],
              },
            },
          ],
        }),
      };

      // Calculate pagination
      const skip = (page - 1) * pageSize;

      // Get order by field
      const orderBy:
        | Record<string, 'asc' | 'desc'>
        | Record<string, Record<string, 'asc' | 'desc'>> = {};
      if (sortField.includes('.')) {
        const [relation, field] = sortField.split('.');
        orderBy[relation] = { [field]: sortDirection };
      } else {
        orderBy[sortField] = sortDirection;
      }

      // Get total count
      const totalCount = await prisma.sekolah.count({ where });

      // Get data
      const sekolah = await prisma.sekolah.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          reviewedBy: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy,
        skip,
        take: pageSize,
      });
      return {
        success: true,
        data: {
          reviews: sekolah as ReviewData[],
          pagination: {
            totalCount,
            totalPages: Math.ceil(totalCount / pageSize),
            currentPage: page,
            pageSize,
          },
        },
      };
    } catch (error) {
      console.error('Error getting pending reviews:', error);
      return {
        success: false,
        error: 'Gagal mengambil data review yang tertunda',
      };
    }
  }

  /**
   * Approve a review
   */ static async approveReview(
    sekolahId: string,
    reviewedById?: string,
    notes?: string,
  ): Promise<ReviewServiceResponse<void>> {
    try {
      // Check if sekolah exists and is pending
      const sekolah = await prisma.sekolah.findUnique({
        where: { id: sekolahId },
        include: {
          user: true,
        },
      });

      if (!sekolah) {
        return {
          success: false,
          error: 'Sekolah tidak ditemukan',
        };
      }

      if (sekolah.status !== 'PENDING') {
        return {
          success: false,
          error: 'Sekolah tidak dalam status pending review',
        };
      }

      // Update sekolah status to approved
      await prisma.sekolah.update({
        where: { id: sekolahId },
        data: {
          status: 'APPROVED',
          reviewedAt: new Date(),
          reviewNotes: notes,
          reviewedById: reviewedById,
        },
      });

      // TODO: Send notification to user (email/WhatsApp)
      // You can implement notification sending here

      return {
        success: true,
      };
    } catch (error) {
      console.error('Error approving review:', error);
      return {
        success: false,
        error: 'Gagal menyetujui review',
      };
    }
  }

  /**
   * Request revision for a review
   */ static async requestRevision(
    sekolahId: string,
    reason: string,
    reviewedById?: string,
  ): Promise<ReviewServiceResponse<void>> {
    try {
      // Check if sekolah exists and is pending
      const sekolah = await prisma.sekolah.findUnique({
        where: { id: sekolahId },
        include: {
          user: true,
        },
      });

      if (!sekolah) {
        return {
          success: false,
          error: 'Sekolah tidak ditemukan',
        };
      }

      if (sekolah.status !== 'PENDING') {
        return {
          success: false,
          error: 'Sekolah tidak dalam status pending review',
        };
      }

      // Update sekolah status back to draft with revision notes
      await prisma.sekolah.update({
        where: { id: sekolahId },
        data: {
          status: 'DRAFT',
          reviewedAt: new Date(),
          reviewNotes: reason,
          reviewedById: reviewedById,
        },
      });

      // TODO: Send notification to user about revision request
      // You can implement notification sending here

      return {
        success: true,
      };
    } catch (error) {
      console.error('Error requesting revision:', error);
      return {
        success: false,
        error: 'Gagal mengirim permintaan revisi',
      };
    }
  }
  /**
   * Get review history for a sekolah
   */ static async getReviewHistory(
    sekolahId: string,
  ): Promise<ReviewServiceResponse<ReviewHistoryItem[]>> {
    try {
      const sekolah = await prisma.sekolah.findUnique({
        where: { id: sekolahId },
        include: {
          reviewedBy: {
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

      // For now, return basic review info
      // You can extend this to include detailed history if needed
      const history = [
        {
          id: sekolah.id,
          status: sekolah.status,
          reviewedAt: sekolah.reviewedAt,
          reviewNotes: sekolah.reviewNotes,
          reviewedBy: sekolah.reviewedBy,
        },
      ];

      return {
        success: true,
        data: history,
      };
    } catch (error) {
      console.error('Error getting review history:', error);
      return {
        success: false,
        error: 'Gagal mengambil riwayat review',
      };
    }
  }

  /**
   * Get review statistics
   */ static async getReviewStats(): Promise<
    ReviewServiceResponse<ReviewStats>
  > {
    try {
      const [pending, approved, rejected, draft] = await Promise.all([
        prisma.sekolah.count({ where: { status: 'PENDING' } }),
        prisma.sekolah.count({ where: { status: 'APPROVED' } }),
        prisma.sekolah.count({ where: { status: 'REJECTED' } }),
        prisma.sekolah.count({ where: { status: 'DRAFT' } }),
      ]);

      return {
        success: true,
        data: {
          pending,
          approved,
          rejected,
          draft,
        },
      };
    } catch (error) {
      console.error('Error getting review stats:', error);
      return {
        success: false,
        error: 'Gagal mengambil statistik review',
      };
    }
  }
}
