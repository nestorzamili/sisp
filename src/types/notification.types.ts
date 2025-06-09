export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export type NotificationPriority = 'low' | 'medium' | 'high' | 'urgent';

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

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  priority: NotificationPriority;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
  actionUrl?: string;
  actionLabel?: string;
  metadata?: NotificationMetadata;
}

export interface NotificationStats {
  total: number;
  unread: number;
  urgent: number;
}
