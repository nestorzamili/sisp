'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  AlertCircle,
  CheckCircle,
  Info,
  AlertTriangle,
  ExternalLink,
  Clock,
  Eye,
} from 'lucide-react';
import {
  Notification,
  NotificationType,
  NotificationPriority,
  NotificationCategory,
} from '@/types/notification.types';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';

interface NotificationDialogProps {
  notification: Notification | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMarkAsRead?: (notificationId: string) => void;
  onAction?: (notification: Notification) => void;
}

const getNotificationIcon = (type: NotificationType) => {
  const iconProps = { className: 'w-5 h-5' };

  switch (type) {
    case 'SUCCESS':
      return (
        <CheckCircle
          {...iconProps}
          className="w-5 h-5 text-teal-600 dark:text-teal-500"
        />
      );
    case 'WARNING':
      return (
        <AlertTriangle
          {...iconProps}
          className="w-5 h-5 text-orange-600 dark:text-orange-500"
        />
      );
    case 'ERROR':
      return (
        <AlertCircle
          {...iconProps}
          className="w-5 h-5 text-red-600 dark:text-red-500"
        />
      );
    default:
      return (
        <Info
          {...iconProps}
          className="w-5 h-5 text-primary dark:text-blue-400"
        />
      );
  }
};

const getPriorityColor = (priority: NotificationPriority) => {
  switch (priority) {
    case 'URGENT':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    case 'HIGH':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
    case 'MEDIUM':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    case 'LOW':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
  }
};

const getCategoryLabel = (category: NotificationCategory) => {
  switch (category) {
    case 'APPROVAL':
      return 'Persetujuan';
    case 'DATA_SUBMISSION':
      return 'Submit Data';
    case 'REMINDER':
      return 'Pengingat';
    case 'SYSTEM':
      return 'Sistem';
    case 'ANNOUNCEMENT':
      return 'Pengumuman';
    default:
      return 'Umum';
  }
};

export function NotificationDialog({
  notification,
  open,
  onOpenChange,
  onMarkAsRead,
  onAction,
}: NotificationDialogProps) {
  if (!notification) return null;

  const handleAction = () => {
    if (onAction) {
      onAction(notification);
    }
  };

  const handleMarkAsRead = () => {
    if (onMarkAsRead && !notification.isRead) {
      onMarkAsRead(notification.id);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        {' '}
        <DialogHeader className="space-y-3">
          <div className="flex items-start gap-3">
            {getNotificationIcon(notification.type)}
            <div className="flex-1 space-y-2">
              <DialogTitle className="text-left leading-tight">
                {notification.title}
              </DialogTitle>{' '}
              <div className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className={`text-xs ${getPriorityColor(notification.priority)}`}
                >
                  {notification.priority}
                </Badge>
                {notification.category && (
                  <Badge variant="outline" className="text-xs">
                    {getCategoryLabel(notification.category)}
                  </Badge>
                )}
                {!notification.isRead && (
                  <Badge variant="default" className="text-xs bg-primary">
                    Baru
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </DialogHeader>
        <Separator />
        <DialogDescription className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
          {notification.message}
        </DialogDescription>{' '}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="w-3 h-3" />
          <span>
            {formatDistanceToNow(notification.createdAt, {
              addSuffix: true,
              locale: id,
            })}
          </span>
          {notification.expiresAt && (
            <>
              <span>•</span>
              <span>
                Kedaluwarsa:{' '}
                {formatDistanceToNow(notification.expiresAt, {
                  addSuffix: true,
                  locale: id,
                })}
              </span>
            </>
          )}
        </div>
        <Separator />{' '}
        <div className="flex justify-end gap-3">
          {!notification.isRead && onMarkAsRead && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleMarkAsRead}
              className="text-xs flex items-center gap-1"
            >
              <Eye className="w-3 h-3" />
              Tandai Dibaca
            </Button>
          )}
          {notification.actionUrl && notification.actionLabel && (
            <Button
              size="sm"
              onClick={handleAction}
              className="text-xs flex items-center gap-1"
            >
              {notification.actionLabel}
              <ExternalLink className="w-3 h-3" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="text-xs"
          >
            Tutup
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
