'use client';

import { useState, useEffect, useCallback } from 'react';
import { Notification, NotificationStats } from '@/types/notification.types';
import {
  getUserNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  getNotificationStats,
} from '@/app/(app)/admin/broadcast/notification.action';

export function useNotifications(userId?: string) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [stats, setStats] = useState<NotificationStats>({
    total: 0,
    unread: 0,
    urgent: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = useCallback(async () => {
    if (!userId) return;

    try {
      setLoading(true);
      setError(null);

      const [notificationsResult, statsResult] = await Promise.all([
        getUserNotifications(),
        getNotificationStats(),
      ]);

      if (notificationsResult.success && notificationsResult.data) {
        setNotifications(notificationsResult.data);
      } else {
        setError(notificationsResult.error || 'Gagal mengambil notifikasi');
      }

      if (statsResult.success && statsResult.data) {
        setStats(statsResult.data);
      }
    } catch (err) {
      setError('Terjadi kesalahan saat mengambil notifikasi');
      console.error('Error fetching notifications:', err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const markAsRead = useCallback(async (notificationId: string) => {
    try {
      const result = await markNotificationAsRead(notificationId);
      if (result.success) {
        setNotifications((prev) =>
          prev.map((n) =>
            n.id === notificationId
              ? { ...n, isRead: true, readAt: new Date() }
              : n,
          ),
        );
        setStats((prev) => ({
          ...prev,
          unread: Math.max(0, prev.unread - 1),
        }));
      }
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    try {
      const result = await markAllNotificationsAsRead();
      if (result.success) {
        setNotifications((prev) =>
          prev.map((n) => ({ ...n, isRead: true, readAt: new Date() })),
        );
        setStats((prev) => ({ ...prev, unread: 0 }));
      }
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
    }
  }, []);

  const deleteNotificationById = useCallback(
    async (notificationId: string) => {
      try {
        const result = await deleteNotification(notificationId);
        if (result.success) {
          const notification = notifications.find(
            (n) => n.id === notificationId,
          );
          setNotifications((prev) =>
            prev.filter((n) => n.id !== notificationId),
          );
          setStats((prev) => ({
            total: prev.total - 1,
            unread:
              notification && !notification.isRead
                ? prev.unread - 1
                : prev.unread,
            urgent:
              notification && notification.priority === 'URGENT'
                ? prev.urgent - 1
                : prev.urgent,
          }));
        }
      } catch (err) {
        console.error('Error deleting notification:', err);
      }
    },
    [notifications],
  );

  const refreshNotifications = useCallback(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return {
    notifications,
    stats,
    loading,
    error,
    markAsRead,
    markAllAsRead,
    deleteNotification: deleteNotificationById,
    refreshNotifications,
  };
}
