import {
  NotificationType,
  NotificationPriority,
  NotificationCategory,
  Notification as PrismaNotification,
} from '@prisma/client';

// Re-export Prisma types for consistency
export {
  NotificationType,
  NotificationPriority,
  NotificationCategory,
} from '@prisma/client';

export interface NotificationMetadata {
  formId?: string;
  schoolId?: string;
  userId?: string;
  dataType?: string;
  fieldName?: string;
  errorCode?: string;
  requestId?: string;
  [key: string]: string | number | boolean | undefined;
}

// Use Prisma notification type directly
export type Notification = PrismaNotification;

export interface CreateNotificationData {
  title: string;
  message: string;
  type?: NotificationType;
  priority?: NotificationPriority;
  category?: NotificationCategory;
  actionUrl?: string;
  actionLabel?: string;
  isGlobal?: boolean;
  expiresAt?: Date;
  relatedId?: string;
  relatedType?: string;
}

export interface NotificationFilters {
  userId?: string;
  isRead?: boolean;
  type?: NotificationType;
  priority?: NotificationPriority;
  category?: NotificationCategory;
  isGlobal?: boolean;
  includeExpired?: boolean;
}

export interface NotificationStats {
  total: number;
  unread: number;
  urgent: number;
}

// Helper type for notification templates
export interface NotificationTemplate {
  title: string;
  message: string;
  type: NotificationType;
  priority: NotificationPriority;
  category: NotificationCategory;
  variables?: string[];
}

// Notification event types for real-time updates
export interface NotificationEvent {
  type: 'created' | 'updated' | 'deleted';
  notification: Notification;
  userId: string;
}

// Bulk notification operations
export interface BulkNotificationData {
  userIds: string[];
  notification: CreateNotificationData;
}

export interface NotificationPreferences {
  categories: {
    [key in NotificationCategory]?: boolean;
  };
  priorities: {
    [key in NotificationPriority]?: boolean;
  };
}
