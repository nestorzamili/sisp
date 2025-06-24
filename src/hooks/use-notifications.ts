'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
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
  const [polling, setPolling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Refs untuk optimization
  const abortControllerRef = useRef<AbortController | null>(null);
  const lastFetchRef = useRef<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const fetchNotifications = useCallback(
    async (isPolling = false) => {
      if (!userId) return;

      // Prevent concurrent requests
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Debounce requests (prevent too frequent calls)
      const now = Date.now();
      if (now - lastFetchRef.current < 1000) return; // 1 second debounce
      lastFetchRef.current = now;

      try {
        // Create new abort controller
        abortControllerRef.current = new AbortController();

        // Set appropriate loading state
        if (isPolling) {
          setPolling(true);
        } else {
          setLoading(true);
        }
        setError(null);
        const [notificationsResult, statsResult] = await Promise.all([
          getUserNotifications(),
          getNotificationStats(),
        ]);

        // Check if request was aborted
        if (abortControllerRef.current?.signal.aborted) {
          return;
        }

        if (notificationsResult.success && notificationsResult.data) {
          setNotifications(notificationsResult.data);
        } else {
          setError(notificationsResult.error || 'Gagal mengambil notifikasi');
        }

        if (statsResult.success && statsResult.data) {
          setStats(statsResult.data);
        }
      } catch (err) {
        // Only set error if request wasn't aborted
        if (
          abortControllerRef.current &&
          !abortControllerRef.current.signal.aborted
        ) {
          setError('Terjadi kesalahan saat mengambil notifikasi');
          console.error('Error fetching notifications:', err);
        }
      } finally {
        if (isPolling) {
          setPolling(false);
        } else {
          setLoading(false);
        }
        // Clear abort controller
        abortControllerRef.current = null;
      }
    },
    [userId],
  );
  const markAsRead = useCallback(async (notificationId: string) => {
    try {
      // Optimistic update first
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

      // Then sync with server
      const result = await markNotificationAsRead(notificationId);

      // If failed, revert optimistic update
      if (!result.success) {
        setNotifications((prev) =>
          prev.map((n) =>
            n.id === notificationId ? { ...n, isRead: false, readAt: null } : n,
          ),
        );
        setStats((prev) => ({
          ...prev,
          unread: prev.unread + 1,
        }));
      }
    } catch (err) {
      console.error('Error marking notification as read:', err);
      // Revert optimistic update on error
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === notificationId ? { ...n, isRead: false, readAt: null } : n,
        ),
      );
      setStats((prev) => ({
        ...prev,
        unread: prev.unread + 1,
      }));
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    try {
      // Get current unread count for potential revert
      const currentUnreadCount = stats.unread;

      // Optimistic update
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, isRead: true, readAt: new Date() })),
      );
      setStats((prev) => ({ ...prev, unread: 0 }));

      // Sync with server
      const result = await markAllNotificationsAsRead();

      // If failed, revert optimistic update
      if (!result.success) {
        setNotifications((prev) =>
          prev.map((n) => ({ ...n, isRead: false, readAt: null })),
        );
        setStats((prev) => ({ ...prev, unread: currentUnreadCount }));
      }
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
      // Revert would require refetching data, so just refresh
      fetchNotifications(false);
    }
  }, [stats.unread, fetchNotifications]);

  const deleteNotificationById = useCallback(
    async (notificationId: string) => {
      try {
        // Store original notification for potential revert
        const notification = notifications.find((n) => n.id === notificationId);
        if (!notification) return;

        // Optimistic update
        setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
        setStats((prev) => ({
          total: prev.total - 1,
          unread: !notification.isRead ? prev.unread - 1 : prev.unread,
          urgent:
            notification.priority === 'URGENT' && !notification.isRead
              ? prev.urgent - 1
              : prev.urgent,
        }));

        // Sync with server
        const result = await deleteNotification(notificationId);

        // If failed, revert optimistic update
        if (!result.success) {
          setNotifications((prev) => [...prev, notification]);
          setStats((prev) => ({
            total: prev.total + 1,
            unread: !notification.isRead ? prev.unread + 1 : prev.unread,
            urgent:
              notification.priority === 'URGENT' && !notification.isRead
                ? prev.urgent + 1
                : prev.urgent,
          }));
        }
      } catch (err) {
        console.error('Error deleting notification:', err);
        // Refresh to get accurate state
        fetchNotifications(false);
      }
    },
    [notifications, fetchNotifications],
  );
  const refreshNotifications = useCallback(() => {
    fetchNotifications(false);
  }, [fetchNotifications]);

  // Initial fetch
  useEffect(() => {
    fetchNotifications(false);
  }, [fetchNotifications]);

  // Optimized polling with better cleanup
  useEffect(() => {
    if (!userId) return;

    // Clear existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Start polling
    intervalRef.current = setInterval(() => {
      fetchNotifications(true); // Mark as polling
    }, 30000); // 30 seconds

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      // Abort any pending request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
    };
  }, [fetchNotifications, userId]);

  // Pause polling when tab is not visible (performance optimization)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Refresh when tab becomes visible
        fetchNotifications(true);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [fetchNotifications]);
  return {
    notifications,
    stats,
    loading,
    polling,
    error,
    markAsRead,
    markAllAsRead,
    deleteNotification: deleteNotificationById,
    refreshNotifications,
  };
}
