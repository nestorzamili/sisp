'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Bell,
  BellRing,
  AlertCircle,
  CheckCircle,
  Info,
  AlertTriangle,
  MoreHorizontal,
  Eye,
  Trash2,
} from 'lucide-react';
import {
  Notification,
  NotificationType,
  NotificationStats,
} from '@/types/notification.types';
import { NotificationDialog } from './notification-dialog';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';

// Mock data - replace with actual API calls
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Data Sekolah Berhasil Disimpan',
    message:
      'Data sarana dan prasarana SMP Negeri 1 Gomo telah berhasil disimpan dan akan segera diverifikasi oleh tim Dinas Pendidikan.',
    type: 'success',
    priority: 'medium',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    updatedAt: new Date(),
    actionUrl: '/home',
    actionLabel: 'Lihat Data',
  },
  {
    id: '2',
    title: 'Verifikasi Data Diperlukan',
    message:
      'Terdapat beberapa data yang perlu diverifikasi ulang pada formulir yang Anda kirimkan. Silakan periksa kembali data sarana ruang kelas.',
    type: 'warning',
    priority: 'high',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    updatedAt: new Date(),
    actionUrl: '/home',
    actionLabel: 'Perbaiki Data',
  },
  {
    id: '3',
    title: 'Sistem Akan Maintenance',
    message:
      'Sistem akan mengalami maintenance pada hari Minggu, 15 Desember 2024 pukul 00:00 - 06:00 WIB. Mohon selesaikan input data sebelum waktu tersebut.',
    type: 'info',
    priority: 'low',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    updatedAt: new Date(),
  },
];

const getNotificationIcon = (type: NotificationType, size = 'w-4 h-4') => {
  const iconProps = { className: size };

  switch (type) {
    case 'success':
      return (
        <CheckCircle
          {...iconProps}
          className={`${size} text-teal-600 dark:text-teal-500`}
        />
      );
    case 'warning':
      return (
        <AlertTriangle
          {...iconProps}
          className={`${size} text-orange-600 dark:text-orange-500`}
        />
      );
    case 'error':
      return (
        <AlertCircle
          {...iconProps}
          className={`${size} text-red-600 dark:text-red-500`}
        />
      );
    default:
      return (
        <Info
          {...iconProps}
          className={`${size} text-primary dark:text-blue-400`}
        />
      );
  }
};

export function NotificationDropdown() {
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const stats: NotificationStats = {
    total: notifications.length,
    unread: notifications.filter((n) => !n.isRead).length,
    urgent: notifications.filter((n) => n.priority === 'urgent').length,
  };

  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification);
    setDialogOpen(true);

    // Mark as read when clicked
    if (!notification.isRead) {
      markAsRead(notification.id);
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, isRead: true } : n)),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
  };

  const handleAction = (notification: Notification) => {
    if (notification.actionUrl) {
      window.location.href = notification.actionUrl;
    }
    setDialogOpen(false);
  };

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="relative hover:bg-primary/10 transition-colors duration-200"
          >
            {stats.unread > 0 ? (
              <BellRing className="w-4 h-4 text-primary" />
            ) : (
              <Bell className="w-4 h-4" />
            )}
            {stats.unread > 0 && (
              <Badge
                className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-red-500 hover:bg-red-600"
                variant="default"
              >
                {stats.unread > 99 ? '99+' : stats.unread}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-80 rounded-xl shadow-lg border border-primary/10"
          align="end"
          sideOffset={5}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 pb-2">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-sm">Notifikasi</h4>
              {stats.unread > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {stats.unread} baru
                </Badge>
              )}
            </div>
            {stats.unread > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-xs h-auto p-1 text-primary hover:text-primary/80"
              >
                Tandai semua dibaca
              </Button>
            )}
          </div>

          <DropdownMenuSeparator />

          {/* Notifications List */}
          {notifications.length > 0 ? (
            <ScrollArea className="max-h-96">
              <div className="space-y-1 p-1">
                {notifications.slice(0, 10).map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className="p-0 focus:bg-transparent"
                    onSelect={(e) => e.preventDefault()}
                  >
                    <div
                      className={`w-full p-3 rounded-lg cursor-pointer transition-colors duration-200 group ${
                        !notification.isRead
                          ? 'bg-primary/5 hover:bg-primary/10 border border-primary/10'
                          : 'hover:bg-muted/50'
                      }`}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-start justify-between gap-2">
                            <p
                              className={`text-sm font-medium leading-tight line-clamp-2 ${
                                !notification.isRead
                                  ? 'text-foreground'
                                  : 'text-muted-foreground'
                              }`}
                            >
                              {notification.title}
                            </p>
                            <div className="flex items-center gap-1">
                              {!notification.isRead && (
                                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                              )}
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 w-6 p-0 hover:bg-muted opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                    }}
                                  >
                                    <MoreHorizontal className="w-3 h-3" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                  align="end"
                                  className="w-36"
                                  side="bottom"
                                  sideOffset={4}
                                >
                                  {!notification.isRead && (
                                    <DropdownMenuItem
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        markAsRead(notification.id);
                                      }}
                                      className="text-xs cursor-pointer"
                                    >
                                      <Eye className="w-3 h-3 mr-2" />
                                      Tandai dibaca
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      deleteNotification(notification.id);
                                    }}
                                    className="text-xs text-red-600 hover:text-red-700 cursor-pointer"
                                  >
                                    <Trash2 className="w-3 h-3 mr-2" />
                                    Hapus
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatDistanceToNow(notification.createdAt, {
                              addSuffix: true,
                              locale: id,
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="p-8 text-center">
              <Bell className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">
                Tidak ada notifikasi
              </p>
            </div>
          )}

          {notifications.length > 10 && (
            <>
              <DropdownMenuSeparator />
              <div className="p-2">
                <Button variant="ghost" size="sm" className="w-full text-xs">
                  Lihat Semua Notifikasi
                </Button>
              </div>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <NotificationDialog
        notification={selectedNotification}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onMarkAsRead={markAsRead}
        onAction={handleAction}
      />
    </>
  );
}
