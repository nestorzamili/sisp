'use server';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { notificationService } from '@/lib/services/notification.service';
import { Notification, NotificationStats } from '@/types/notification.types';
import logger from '@/lib/logger';

export async function getUserNotifications(limit: number = 20) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return {
        success: false,
        error: 'Unauthorized',
        data: [] as Notification[],
      };
    }

    const notifications = await notificationService.getUserNotifications(
      session.user.id,
      {},
      limit,
    );

    return {
      success: true,
      data: notifications,
    };
  } catch (error) {
    logger.error('Error fetching user notifications:', error);
    return {
      success: false,
      error: 'Gagal mengambil notifikasi',
      data: [] as Notification[],
    };
  }
}

export async function getNotificationStats() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return {
        success: false,
        error: 'Unauthorized',
        data: { total: 0, unread: 0, urgent: 0 } as NotificationStats,
      };
    }

    const stats = await notificationService.getUserNotificationStats(
      session.user.id,
    );

    return {
      success: true,
      data: stats,
    };
  } catch (error) {
    logger.error('Error fetching notification stats:', error);
    return {
      success: false,
      error: 'Gagal mengambil statistik notifikasi',
      data: { total: 0, unread: 0, urgent: 0 } as NotificationStats,
    };
  }
}

export async function markNotificationAsRead(notificationId: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return {
        success: false,
        error: 'Unauthorized',
      };
    }

    await notificationService.markAsRead(notificationId);

    return {
      success: true,
      message: 'Notifikasi berhasil ditandai sebagai dibaca',
    };
  } catch (error) {
    logger.error('Error marking notification as read:', error);
    return {
      success: false,
      error: 'Gagal menandai notifikasi sebagai dibaca',
    };
  }
}

export async function markAllNotificationsAsRead() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return {
        success: false,
        error: 'Unauthorized',
      };
    }

    await notificationService.markAllAsRead(session.user.id);

    return {
      success: true,
      message: 'Semua notifikasi berhasil ditandai sebagai dibaca',
    };
  } catch (error) {
    logger.error('Error marking all notifications as read:', error);
    return {
      success: false,
      error: 'Gagal menandai semua notifikasi sebagai dibaca',
    };
  }
}

export async function deleteNotification(notificationId: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return {
        success: false,
        error: 'Unauthorized',
      };
    }

    await notificationService.deleteNotification(notificationId);

    return {
      success: true,
      message: 'Notifikasi berhasil dihapus',
    };
  } catch (error) {
    logger.error('Error deleting notification:', error);
    return {
      success: false,
      error: 'Gagal menghapus notifikasi',
    };
  }
}
