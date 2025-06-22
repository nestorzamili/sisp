'use server';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { notificationService } from '@/lib/services/notification.service';

export interface BroadcastNotificationData {
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
}

/**
 * Broadcast notification to users based on target audience
 */
export async function broadcastNotification(data: BroadcastNotificationData) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id || session.user.role !== 'admin') {
      return {
        success: false,
        error: 'Unauthorized - Admin access required',
      };
    }

    // Delegate to service layer
    return await notificationService.broadcastNotification(data);
  } catch (error) {
    console.error('Error in broadcast action:', error);
    return {
      success: false,
      error: 'Gagal mengirim notifikasi broadcast',
    };
  }
}

/**
 * Get broadcast statistics for admin dashboard
 */
export async function getBroadcastStats() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id || session.user.role !== 'admin') {
      return {
        success: false,
        error: 'Unauthorized - Admin access required',
      };
    }

    // Delegate to service layer
    return await notificationService.getBroadcastStats();
  } catch (error) {
    console.error('Error in getBroadcastStats action:', error);
    return {
      success: false,
      error: 'Gagal mengambil statistik broadcast',
    };
  }
}

/**
 * Get broadcast notifications for history
 */
export async function getBroadcastHistory(
  limit: number = 20,
  offset: number = 0,
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id || session.user.role !== 'admin') {
      return {
        success: false,
        error: 'Unauthorized - Admin access required',
      };
    }

    // Delegate to service layer
    return await notificationService.getBroadcastHistory(limit, offset);
  } catch (error) {
    console.error('Error in getBroadcastHistory action:', error);
    return {
      success: false,
      error: 'Gagal mengambil riwayat broadcast',
    };
  }
}
