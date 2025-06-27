import logger from '@/lib/logger';
import prisma from '@/lib/prisma';
import {
  PendaftaranData,
  PendaftaranServiceResponse,
  PendaftaranPaginationParams,
  PendaftaranPaginationResult,
} from '@/types/pendaftaran';
import { WhatsAppService } from './whatsapp.service';
import { sendEmail } from '@/lib/mail';
import { AccountRejectedEmailTemplate } from '@/templates/account-rejected';
import { sendVerificationEmail } from '@/lib/auth-client';
import { notificationService } from './notification.service';

export class PendaftaranService {
  static async getPendingRegistrations(
    params: PendaftaranPaginationParams,
  ): Promise<PendaftaranServiceResponse<PendaftaranPaginationResult>> {
    try {
      const {
        page,
        pageSize,
        search = '',
        sortField = 'createdAt',
        sortDirection = 'desc',
      } = params;

      const skip = (page - 1) * pageSize;
      const take = pageSize;
      interface WhereClause {
        banned: boolean;
        Sekolah: { isNot: null };
        OR?: Array<{
          name?: { contains: string; mode: 'insensitive' };
          email?: { contains: string; mode: 'insensitive' };
          Sekolah?: {
            OR?: Array<{
              nama_sekolah?: { contains: string; mode: 'insensitive' };
              npsn?: { contains: string; mode: 'insensitive' };
              phone?: { contains: string; mode: 'insensitive' };
            }>;
          };
        }>;
      }

      const whereClause: WhereClause = {
        banned: true,
        Sekolah: {
          isNot: null,
        },
      };

      if (search.trim()) {
        whereClause.OR = [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          {
            Sekolah: {
              OR: [
                { nama_sekolah: { contains: search, mode: 'insensitive' } },
                { npsn: { contains: search, mode: 'insensitive' } },
                { phone: { contains: search, mode: 'insensitive' } },
              ],
            },
          },
        ];
      }

      const totalCount = await prisma.user.count({
        where: whereClause,
      });

      const users = await prisma.user.findMany({
        where: whereClause,
        include: {
          Sekolah: {
            select: {
              id: true,
              npsn: true,
              nama_sekolah: true,
              phone: true,
            },
          },
        },
        orderBy: {
          [sortField]: sortDirection,
        },
        skip,
        take,
      });

      const data: PendaftaranData[] = users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        banned: user.banned ?? true,
        banReason: user.banReason,
        npsn: user.Sekolah?.npsn || '',
        phone: user.Sekolah?.phone,
        nama_sekolah: user.Sekolah?.nama_sekolah || '',
        createdAt: user.createdAt,
      }));

      const totalPages = Math.ceil(totalCount / pageSize);

      if (users.length === 0) {
        logger.info({ params }, 'Tidak ada pendaftaran pending ditemukan');
      }

      return {
        success: true,
        data: {
          data,
          pagination: {
            totalCount,
            totalPages,
            currentPage: page,
            pageSize,
            hasNext: page < totalPages,
            hasPrev: page > 1,
          },
        },
      };
    } catch (error) {
      logger.error({ err: error }, 'Error fetching pending registrations');
      return {
        success: false,
        error: 'Gagal mengambil data permintaan pendaftaran',
      };
    }
  }

  static async approvePendaftaran(
    userId: string,
  ): Promise<PendaftaranServiceResponse<boolean>> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          Sekolah: {
            select: {
              id: true,
              nama_sekolah: true,
              npsn: true,
              phone: true,
            },
          },
        },
      });

      if (!user) {
        logger.info({ userId }, 'User tidak ditemukan pada approvePendaftaran');
        return {
          success: false,
          error: 'User tidak ditemukan',
        };
      }

      if (!user.Sekolah) {
        logger.info(
          { userId },
          'Data sekolah tidak ditemukan pada approvePendaftaran',
        );
        return {
          success: false,
          error: 'Data sekolah tidak ditemukan',
        };
      }
      await prisma.user.update({
        where: { id: userId },
        data: {
          banned: false,
          banReason: null,
        },
      }); // Create user approval notification
      try {
        await notificationService.createUserNotification(userId, {
          title: 'Akun Disetujui',
          message: `Selamat! Akun Anda telah disetujui. Anda sekarang dapat mengakses sistem SISP Nias Selatan.`,
          type: 'SUCCESS',
          priority: 'HIGH',
          category: 'APPROVAL',
          actionUrl: '/home',
          actionLabel: 'Masuk ke Dashboard',
        });
      } catch (notificationError) {
        logger.error(
          { err: notificationError },
          'Failed to create approval notification',
        );
      }

      const isWhatsAppEnabled = process.env.WHATSAPP_ENABLED === 'true';

      Promise.resolve().then(async () => {
        try {
          if (isWhatsAppEnabled && user.Sekolah!.phone) {
            const whatsappService = new WhatsAppService();
            const loginUrl = `${process.env.BETTER_AUTH_URL}/sign-in`;
            await whatsappService.sendApprovalNotification(
              user.Sekolah!.phone,
              user.Sekolah!.nama_sekolah,
              user.Sekolah!.npsn,
              loginUrl,
            );
          } else if (!isWhatsAppEnabled) {
            logger.info(
              'WhatsApp notifications are disabled. Skipping WhatsApp notification.',
            );
          }
        } catch (whatsappError) {
          logger.error(
            { err: whatsappError },
            'Failed to send WhatsApp notification',
          );
        }
        try {
          await sendVerificationEmail({
            email: user.email,
            callbackURL: '/home',
          });
        } catch (emailError) {
          logger.error(
            { err: emailError },
            'Failed to send verification email via Better Auth',
          );
        }
      });

      logger.info({ userId }, 'Pendaftaran berhasil disetujui');
      return {
        success: true,
        data: true,
      };
    } catch (error) {
      logger.error({ err: error }, 'Error approving pendaftaran');
      return {
        success: false,
        error: 'Gagal menyetujui pendaftaran',
      };
    }
  }

  static async rejectPendaftaran(
    userId: string,
    reason: string,
  ): Promise<PendaftaranServiceResponse<boolean>> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          Sekolah: {
            select: {
              id: true,
              nama_sekolah: true,
              npsn: true,
              phone: true,
            },
          },
        },
      });

      if (!user) {
        logger.info({ userId }, 'User tidak ditemukan pada rejectPendaftaran');
        return {
          success: false,
          error: 'User tidak ditemukan',
        };
      }

      const userData = {
        name: user.name,
        email: user.email,
        sekolah: user.Sekolah
          ? {
              nama_sekolah: user.Sekolah.nama_sekolah,
              npsn: user.Sekolah.npsn,
              phone: user.Sekolah.phone,
            }
          : null,
      };
      await prisma.user.delete({
        where: { id: userId },
      });

      const isWhatsAppEnabled = process.env.WHATSAPP_ENABLED === 'true';

      if (userData.sekolah) {
        Promise.resolve().then(async () => {
          try {
            if (isWhatsAppEnabled && userData.sekolah!.phone) {
              const whatsappService = new WhatsAppService();
              await whatsappService.sendRejectionNotification(
                userData.sekolah!.phone,
                userData.sekolah!.nama_sekolah,
                userData.sekolah!.npsn,
                reason,
              );
            } else if (!isWhatsAppEnabled) {
              logger.info(
                'WhatsApp notifications are disabled. Skipping WhatsApp notification.',
              );
            }
          } catch (whatsappError) {
            logger.error(
              { err: whatsappError },
              'Failed to send WhatsApp notification',
            );
          }
          try {
            const emailHtml = AccountRejectedEmailTemplate(
              userData.name,
              reason,
            );
            await sendEmail({
              to: userData.email,
              subject: 'SISP SMP Nias Selatan - Permohonan Pendaftaran Ditolak',
              html: emailHtml,
            });
          } catch (emailError) {
            logger.error(
              { err: emailError },
              'Failed to send email notification',
            );
          }
        });
      }

      logger.info({ userId }, 'Pendaftaran berhasil ditolak dan user dihapus');
      return {
        success: true,
        data: true,
      };
    } catch (error) {
      logger.error({ err: error }, 'Error rejecting pendaftaran');
      return {
        success: false,
        error: 'Gagal menolak pendaftaran',
      };
    }
  }
}
