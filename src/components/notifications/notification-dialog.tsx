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
import { Separator } from '@/components/ui/separator';
import {
  AlertCircle,
  CheckCircle,
  Info,
  AlertTriangle,
  ExternalLink,
  Clock,
} from 'lucide-react';
import { Notification, NotificationType } from '@/types/notification.types';
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
    case 'success':
      return (
        <CheckCircle
          {...iconProps}
          className="w-5 h-5 text-teal-600 dark:text-teal-500"
        />
      );
    case 'warning':
      return (
        <AlertTriangle
          {...iconProps}
          className="w-5 h-5 text-orange-600 dark:text-orange-500"
        />
      );
    case 'error':
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

export function NotificationDialog({
  notification,
  open,
  onOpenChange,
  onAction,
}: NotificationDialogProps) {
  if (!notification) return null;

  const handleAction = () => {
    if (onAction) {
      onAction(notification);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader className="space-y-3">
          <div className="flex items-start gap-3">
            {getNotificationIcon(notification.type)}
            <div className="flex-1">
              <DialogTitle className="text-left leading-tight">
                {notification.title}
              </DialogTitle>
            </div>
          </div>
        </DialogHeader>

        <Separator />

        <DialogDescription className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
          {notification.message}
        </DialogDescription>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="w-3 h-3" />
          <span>
            {formatDistanceToNow(notification.createdAt, {
              addSuffix: true,
              locale: id,
            })}
          </span>
        </div>

        <Separator />

        <div className="flex justify-end gap-3">
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
