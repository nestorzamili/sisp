import prisma from '@/lib/prisma';
import {
  CreateNotificationData,
  NotificationFilters,
  NotificationStats,
  Notification,
} from '@/types/notification.types';

export class NotificationService {
  /**
   * Create a notification for a specific user
   */
  async createUserNotification(
    userId: string,
    data: CreateNotificationData,
  ): Promise<Notification> {
    return await prisma.notification.create({
      data: {
        ...data,
        userId,
        type: data.type || 'INFO',
        priority: data.priority || 'MEDIUM',
        isGlobal: false,
      },
    });
  } /**
   * Create a global notification for all users
   */
  async createGlobalNotification(
    data: CreateNotificationData,
  ): Promise<Notification> {
    return await prisma.notification.create({
      data: {
        ...data,
        userId: null, // Global notifications don't have specific userId
        type: data.type || 'INFO',
        priority: data.priority || 'MEDIUM',
        isGlobal: true,
      },
    });
  }
  /**
   * Get notifications for a user with filters
   */
  async getUserNotifications(
    userId: string,
    filters: NotificationFilters = {},
    limit: number = 20,
    offset: number = 0,
  ): Promise<Notification[]> {
    const baseConditions = [{ userId, isGlobal: false }, { isGlobal: true }];

    // Add expiration filter to base conditions if needed
    const whereConditions = !filters.includeExpired
      ? baseConditions.map((condition) => ({
          ...condition,
          OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
        }))
      : baseConditions;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {
      OR: whereConditions,
    };

    // Apply filters
    if (filters.isRead !== undefined) {
      where.isRead = filters.isRead;
    }

    if (filters.type) {
      where.type = filters.type;
    }

    if (filters.priority) {
      where.priority = filters.priority;
    }

    if (filters.category) {
      where.category = filters.category;
    }
    return await prisma.notification.findMany({
      where,
      orderBy: [{ createdAt: 'desc' }, { priority: 'desc' }],
      take: limit,
      skip: offset,
    });
  }

  /**
   * Get notification statistics for a user
   */
  async getUserNotificationStats(userId: string): Promise<NotificationStats> {
    const where = {
      OR: [
        {
          userId,
          isGlobal: false,
          OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
        },
        {
          isGlobal: true,
          OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
        },
      ],
    };

    const [total, unread, urgent] = await Promise.all([
      prisma.notification.count({ where }),
      prisma.notification.count({
        where: { ...where, isRead: false },
      }),
      prisma.notification.count({
        where: { ...where, priority: 'URGENT', isRead: false },
      }),
    ]);

    return { total, unread, urgent };
  }

  /**
   * Mark notification as read
   */
  async markAsRead(notificationId: string): Promise<Notification> {
    return await prisma.notification.update({
      where: { id: notificationId },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });
  }

  /**
   * Mark all notifications as read for a user
   */
  async markAllAsRead(userId: string): Promise<{ count: number }> {
    const result = await prisma.notification.updateMany({
      where: {
        OR: [{ userId, isGlobal: false }, { isGlobal: true }],
        isRead: false,
      },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });

    return { count: result.count };
  }

  /**
   * Delete a notification
   */
  async deleteNotification(notificationId: string): Promise<void> {
    await prisma.notification.delete({
      where: { id: notificationId },
    });
  }

  /**
   * Delete expired notifications (cleanup job)
   */
  async deleteExpiredNotifications(): Promise<{ count: number }> {
    const result = await prisma.notification.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });

    return { count: result.count };
  }

  /**
   * Create notification for school data submission
   */
  async createDataSubmissionNotification(
    userId: string,
    schoolName: string,
    sekolahId: string,
  ): Promise<Notification> {
    return await this.createUserNotification(userId, {
      title: 'Data Sekolah Berhasil Disimpan',
      message: `Data sarana dan prasarana ${schoolName} telah berhasil disimpan dan akan segera diverifikasi oleh tim Dinas Pendidikan.`,
      type: 'SUCCESS',
      priority: 'MEDIUM',
      category: 'DATA_SUBMISSION',
      actionUrl: '/formulir',
      actionLabel: 'Lihat Data',
      relatedId: sekolahId,
      relatedType: 'sekolah',
    });
  }

  /**
   * Create notification for review request (to admin/reviewer)
   */
  async createReviewRequestNotification(
    reviewerId: string,
    schoolName: string,
    sekolahId: string,
  ): Promise<Notification> {
    return await this.createUserNotification(reviewerId, {
      title: 'Data Baru Perlu Review',
      message: `${schoolName} telah mengirimkan data baru yang perlu direview.`,
      type: 'INFO',
      priority: 'HIGH',
      category: 'APPROVAL',
      actionUrl: `/admin/permintaan-review/${sekolahId}`,
      actionLabel: 'Review Sekarang',
      relatedId: sekolahId,
      relatedType: 'sekolah',
    });
  }

  /**
   * Create notification for approval result
   */
  async createApprovalNotification(
    userId: string,
    schoolName: string,
    isApproved: boolean,
    reviewNotes?: string,
  ): Promise<Notification> {
    const type = isApproved ? 'SUCCESS' : 'WARNING';
    const title = isApproved
      ? 'Data Sekolah Disetujui'
      : 'Data Sekolah Perlu Perbaikan';

    let message = isApproved
      ? `Data sarana dan prasarana ${schoolName} telah disetujui oleh tim Dinas Pendidikan.`
      : `Data sarana dan prasarana ${schoolName} perlu diperbaiki.`;

    if (reviewNotes) {
      message += ` Catatan: ${reviewNotes}`;
    }

    return await this.createUserNotification(userId, {
      title,
      message,
      type,
      priority: 'HIGH',
      category: 'APPROVAL',
      actionUrl: '/formulir',
      actionLabel: isApproved ? 'Lihat Data' : 'Perbaiki Data',
    });
  }

  /**
   * Create system maintenance notification
   */
  async createMaintenanceNotification(
    startTime: Date,
    endTime: Date,
    expiresAt?: Date,
  ): Promise<Notification> {
    const formatTime = (date: Date) =>
      date.toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Jakarta',
      });

    return await this.createGlobalNotification({
      title: 'Sistem Akan Maintenance',
      message: `Sistem akan mengalami maintenance pada ${formatTime(startTime)} - ${formatTime(endTime)} WIB. Mohon selesaikan input data sebelum waktu tersebut.`,
      type: 'INFO',
      priority: 'MEDIUM',
      category: 'SYSTEM',
      expiresAt: expiresAt || endTime,
    });
  }

  /**
   * Create deadline reminder notification
   */
  async createDeadlineReminder(
    userId: string,
    deadlineDate: Date,
    description: string,
  ): Promise<Notification> {
    const daysLeft = Math.ceil(
      (deadlineDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
    );

    const urgency =
      daysLeft <= 1 ? 'URGENT' : daysLeft <= 3 ? 'HIGH' : 'MEDIUM';

    return await this.createUserNotification(userId, {
      title: 'Pengingat Deadline',
      message: `${description} akan berakhir dalam ${daysLeft} hari pada ${deadlineDate.toLocaleDateString('id-ID')}.`,
      type: 'WARNING',
      priority: urgency,
      category: 'REMINDER',
      actionUrl: '/formulir',
      actionLabel: 'Lengkapi Sekarang',
      expiresAt: deadlineDate,
    });
  }

  /**
   * Broadcast notification to users based on target audience
   */
  async broadcastNotification(data: {
    title: string;
    message: string;
    type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
    priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
    category:
      | 'SYSTEM'
      | 'APPROVAL'
      | 'DATA_SUBMISSION'
      | 'REMINDER'
      | 'ANNOUNCEMENT';
    actionUrl?: string;
    actionLabel?: string;
    expiresAt?: Date;
    targetAudience: 'ALL' | 'USERS_ONLY' | 'ADMINS_ONLY';
  }): Promise<{ success: boolean; count?: number; error?: string }> {
    try {
      const { targetAudience, ...notificationData } = data;

      // Get target users based on audience selection
      let targetUsers: string[] = [];
      switch (targetAudience) {
        case 'ALL':
          // Send to all users (admin + sekolah yang tidak di-banned)
          const allUsers = await prisma.user.findMany({
            where: {
              banned: false, // Hanya yang tidak di-banned
            },
            select: { id: true },
          });
          targetUsers = allUsers.map((user) => user.id);
          break;

        case 'USERS_ONLY':
          // Send only to sekolah (non-admin users yang tidak di-banned)
          const regularUsers = await prisma.user.findMany({
            where: {
              role: 'user',
              banned: false, // Hanya yang tidak di-banned
            },
            select: { id: true },
          });
          targetUsers = regularUsers.map((user) => user.id);
          break;

        case 'ADMINS_ONLY':
          // Send only to admin users
          const adminUsers = await prisma.user.findMany({
            where: {
              role: 'admin',
            },
            select: { id: true },
          });
          targetUsers = adminUsers.map((user) => user.id);
          break;

        default:
          return {
            success: false,
            error: 'Invalid target audience',
          };
      }

      if (targetUsers.length === 0) {
        return {
          success: false,
          error: 'No users found for the selected target audience',
        };
      }

      // Create notifications for all target users with broadcast metadata
      const createdNotifications = [];
      const broadcastId = `broadcast-${Date.now()}`;

      for (const userId of targetUsers) {
        try {
          const notification = await this.createUserNotification(userId, {
            ...notificationData,
            relatedType: 'BROADCAST',
            relatedId: broadcastId,
          });
          createdNotifications.push(notification);
        } catch (error) {
          console.error(
            `Failed to create notification for user ${userId}:`,
            error,
          );
          // Continue with other users even if one fails
        }
      }

      // Create one master global notification for history with broadcast details
      const audienceLabel = this.getAudienceLabel(targetAudience);
      await this.createGlobalNotification({
        ...notificationData,
        relatedType: 'BROADCAST',
        relatedId: broadcastId,
        actionLabel: `${audienceLabel} (${createdNotifications.length} users)`,
      });

      return {
        success: true,
        count: createdNotifications.length,
      };
    } catch (error) {
      console.error('Error broadcasting notification:', error);
      return {
        success: false,
        error: 'Failed to broadcast notification',
      };
    }
  }
  /**
   * Get broadcast statistics for admin dashboard
   */
  async getBroadcastStats(): Promise<{
    success: boolean;
    data?: {
      totalUsers: number;
      approvedUsers: number;
      adminUsers: number;
      totalNotifications: number;
    };
    error?: string;
  }> {
    try {
      const [totalUsers, activeSchools, adminUsers, totalNotifications] =
        await Promise.all([
          // Total users yang aktif (tidak di-banned)
          prisma.user.count({
            where: {
              banned: false,
            },
          }),
          // Total sekolah yang aktif (role user, tidak di-banned)
          prisma.user.count({
            where: {
              role: 'user',
              banned: false,
            },
          }),
          // Total admin
          prisma.user.count({
            where: {
              role: 'admin',
            },
          }),
          // Total notifikasi
          prisma.notification.count({
            where: {
              isGlobal: true, // Hanya yang broadcast/global
            },
          }),
        ]);

      return {
        success: true,
        data: {
          totalUsers,
          approvedUsers: activeSchools, // Rename untuk konsistensi
          adminUsers,
          totalNotifications,
        },
      };
    } catch (error) {
      console.error('Error getting broadcast stats:', error);
      return {
        success: false,
        error: 'Failed to get broadcast statistics',
      };
    }
  }

  /**
   * Get broadcast notifications history for admin
   */
  async getBroadcastHistory(
    limit: number = 20,
    offset: number = 0,
  ): Promise<{
    success: boolean;
    data?: Notification[];
    error?: string;
  }> {
    try {
      // Get all notifications that are marked as broadcast
      const notifications = await prisma.notification.findMany({
        where: {
          isGlobal: true, // Only global notifications
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: limit,
        skip: offset,
        // Group by relatedId to avoid showing duplicate broadcasts
        distinct: ['relatedId'],
      });

      return {
        success: true,
        data: notifications,
      };
    } catch (error) {
      console.error('Error getting broadcast history:', error);
      return {
        success: false,
        error: 'Failed to get broadcast history',
      };
    }
  }
  /**
   * Helper function to get audience label
   */
  private getAudienceLabel(audience: string): string {
    switch (audience) {
      case 'ALL':
        return 'Semua Pengguna (Admin + Sekolah)';
      case 'ADMINS_ONLY':
        return 'Admin Saja';
      case 'USERS_ONLY':
        return 'Sekolah Saja';
      default:
        return 'Target Tidak Diketahui';
    }
  }
}

// Export singleton instance
export const notificationService = new NotificationService();
