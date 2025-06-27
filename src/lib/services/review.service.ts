import prisma from '@/lib/prisma';
import { ReviewStatus } from '@prisma/client';
import {
  ReviewData,
  ReviewServiceResponse,
  ReviewPaginationParams,
  ReviewPaginationResult,
} from '@/types/review';
import { notificationService } from './notification.service';
import logger from '@/lib/logger';

export class ReviewService {
  /**
   * Get paginated request reviews (sekolah with PENDING or REJECTED status)
   */
  static async getRequestReviews({
    page = 1,
    pageSize = 10,
    sortField = 'createdAt',
    sortDirection = 'desc',
    search = '',
  }: ReviewPaginationParams): Promise<
    ReviewServiceResponse<ReviewPaginationResult>
  > {
    try {
      // Build where clause for request reviews
      const where = {
        status: { in: [ReviewStatus.PENDING, ReviewStatus.REJECTED] },
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
      if (!sekolah || sekolah.length === 0) {
        logger.info(
          { page, pageSize, search },
          'Tidak ada data review request ditemukan',
        );
      }
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
      logger.error({ err: error }, 'Error getting request reviews');
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
      // Check if sekolah exists and is pending or rejected
      const sekolah = await prisma.sekolah.findUnique({
        where: { id: sekolahId },
        include: {
          user: true,
        },
      });

      if (!sekolah) {
        logger.info(
          { sekolahId },
          'Sekolah tidak ditemukan pada approveReview',
        );
        return {
          success: false,
          error: 'Sekolah tidak ditemukan',
        };
      }
      if (
        sekolah.status !== ReviewStatus.PENDING &&
        sekolah.status !== ReviewStatus.REJECTED
      ) {
        logger.info(
          { sekolahId, status: sekolah.status },
          'Sekolah tidak dalam status pending/rejected pada approveReview',
        );
        return {
          success: false,
          error: 'Sekolah tidak dalam status pending atau rejected review',
        };
      } // Update sekolah status to approved
      await prisma.sekolah.update({
        where: { id: sekolahId },
        data: {
          status: ReviewStatus.APPROVED,
          reviewedAt: new Date(),
          reviewNotes: notes,
          reviewedById: reviewedById,
        },
      });

      // Create approval notification for user
      try {
        await notificationService.createApprovalNotification(
          sekolah.user.id,
          sekolah.nama_sekolah,
          true, // isApproved = true
          notes,
        );
      } catch (notificationError) {
        logger.error(
          { err: notificationError },
          'Failed to create approval notification:',
        );
        // Don't fail the approval process if notification fails
      }

      // TODO: Send notification to user (email/WhatsApp)
      // You can implement notification sending here
      logger.info(
        { sekolahId, reviewedById },
        'Review sekolah berhasil diapprove',
      );
      return {
        success: true,
      };
    } catch (error) {
      logger.error({ err: error }, 'Error approving review:');
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
      // Check if sekolah exists and is pending (can only request revision for pending status)
      const sekolah = await prisma.sekolah.findUnique({
        where: { id: sekolahId },
        include: {
          user: true,
        },
      });

      if (!sekolah) {
        logger.info(
          { sekolahId },
          'Sekolah tidak ditemukan pada requestRevision',
        );
        return {
          success: false,
          error: 'Sekolah tidak ditemukan',
        };
      }
      if (sekolah.status !== ReviewStatus.PENDING) {
        logger.info(
          { sekolahId, status: sekolah.status },
          'Sekolah tidak dalam status pending pada requestRevision',
        );
        return {
          success: false,
          error:
            'Hanya bisa meminta revisi untuk sekolah dengan status pending',
        };
      } // Update sekolah status back to draft with revision notes
      await prisma.sekolah.update({
        where: { id: sekolahId },
        data: {
          status: ReviewStatus.DRAFT,
          reviewedAt: new Date(),
          reviewNotes: reason,
          reviewedById: reviewedById,
        },
      });

      // Create revision request notification for user
      try {
        await notificationService.createApprovalNotification(
          sekolah.user.id,
          sekolah.nama_sekolah,
          false, // isApproved = false (revision needed)
          reason,
        );
      } catch (notificationError) {
        logger.error(
          { err: notificationError },
          'Failed to create revision notification:',
        );
        // Don't fail the revision process if notification fails
      }

      // TODO: Send notification to user about revision request
      // You can implement notification sending here
      logger.info(
        { sekolahId, reviewedById },
        'Permintaan revisi sekolah berhasil',
      );
      return {
        success: true,
      };
    } catch (error) {
      logger.error({ err: error }, 'Error requesting revision:');
      return {
        success: false,
        error: 'Gagal mengirim permintaan revisi',
      };
    }
  }

  /**
   * Submit sekolah for review (change status from DRAFT to PENDING)
   */ static async submitForReview(
    sekolahId: string,
  ): Promise<
    ReviewServiceResponse<{ id: string; status: ReviewStatus; updatedAt: Date }>
  > {
    try {
      // Get sekolah with user data
      const sekolah = await prisma.sekolah.findUnique({
        where: { id: sekolahId },
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
          { sekolahId },
          'Sekolah tidak ditemukan pada submitForReview',
        );
        return {
          success: false,
          error: 'Sekolah tidak ditemukan',
        };
      }

      if (
        sekolah.status !== ReviewStatus.DRAFT &&
        sekolah.status !== ReviewStatus.REJECTED
      ) {
        logger.info(
          { sekolahId, status: sekolah.status },
          'Sekolah tidak dalam status draft/rejected pada submitForReview',
        );
        return {
          success: false,
          error:
            'Hanya sekolah dengan status DRAFT atau REJECTED yang dapat disubmit untuk review',
        };
      }

      // Update status to PENDING
      const updatedSekolah = await prisma.sekolah.update({
        where: { id: sekolahId },
        data: {
          status: ReviewStatus.PENDING,
          updatedAt: new Date(),
        },
        select: {
          id: true,
          status: true,
          updatedAt: true,
        },
      });

      // Create notification for admin/reviewers about new data submission
      try {
        // Get admin users to notify about new submission
        const adminUsers = await prisma.user.findMany({
          where: { role: 'admin' },
          select: { id: true },
        });

        // Send notification to all admin users
        for (const admin of adminUsers) {
          await notificationService.createReviewRequestNotification(
            admin.id,
            sekolah.nama_sekolah,
            sekolahId,
          );
        }
      } catch (notificationError) {
        logger.error(
          { err: notificationError },
          'Failed to create review request notification:',
        );
        // Don't fail the submission if notification fails
      }

      logger.info({ sekolahId }, 'Sekolah berhasil disubmit untuk review');
      return {
        success: true,
        data: updatedSekolah,
      };
    } catch (error) {
      logger.error({ err: error }, 'Error submitting sekolah for review:');
      return {
        success: false,
        error: 'Gagal submit data untuk review',
      };
    }
  }
}
