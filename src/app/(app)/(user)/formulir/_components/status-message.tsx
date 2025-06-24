'use client';

import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, Clock, XCircle, Info } from 'lucide-react';

interface StatusMessageProps {
  sekolahStatus: string;
  reviewNote?: string | null;
}

export function StatusMessage({
  sekolahStatus,
  reviewNote,
}: StatusMessageProps) {
  const getStatusInfo = () => {
    switch (sekolahStatus) {
      case 'PENDING':
        return {
          bgColor:
            'bg-yellow-50 border-yellow-200 dark:bg-yellow-950/30 dark:border-yellow-800',
          textColor: 'text-yellow-800 dark:text-yellow-200',
          iconColor: 'text-yellow-600 dark:text-yellow-400',
          icon: Clock,
          title: 'Menunggu Verifikasi',
          message:
            'Data telah disubmit dan sedang dalam proses verifikasi. Form tidak dapat diedit saat ini.',
        };
      case 'APPROVED':
        return {
          bgColor:
            'bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-800',
          textColor: 'text-green-800 dark:text-green-200',
          iconColor: 'text-green-600 dark:text-green-400',
          icon: CheckCircle,
          title: 'Data Disetujui',
          message: 'Data Anda telah diverifikasi dan disetujui.',
        };
      case 'REJECTED':
        return {
          bgColor:
            'bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-800',
          textColor: 'text-red-800 dark:text-red-200',
          iconColor: 'text-red-600 dark:text-red-400',
          icon: XCircle,
          title: 'Data Ditolak',
          message:
            'Data Anda telah ditolak. Silakan perbaiki data sesuai catatan review.',
        };
      default:
        return {
          bgColor:
            'bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800',
          textColor: 'text-blue-800 dark:text-blue-200',
          iconColor: 'text-blue-600 dark:text-blue-400',
          icon: Info,
          title: 'Informasi',
          message: 'Form tidak dapat diedit saat ini.',
        };
    }
  };

  // Only show status message for PENDING, APPROVED, or REJECTED
  if (!['PENDING', 'APPROVED', 'REJECTED'].includes(sekolahStatus)) {
    return null;
  }

  const statusInfo = getStatusInfo();
  const Icon = statusInfo.icon;

  return (
    <Alert className={`mb-4 ${statusInfo.bgColor} border`}>
      <Icon className={`h-4 w-4 ${statusInfo.iconColor}`} />
      <AlertDescription className="space-y-2">
        <div className={statusInfo.textColor}>
          <strong>{statusInfo.title}:</strong> {statusInfo.message}
        </div>{' '}
        {/* Show review note for APPROVED or REJECTED status */}
        {(sekolahStatus === 'APPROVED' || sekolahStatus === 'REJECTED') && (
          <div
            className={`mt-1 p-1 rounded-lg ${
              sekolahStatus === 'APPROVED'
                ? 'bg-green-100/50 dark:bg-green-900/20'
                : 'bg-red-100/50 dark:bg-red-900/20'
            }`}
          >
            <p className={`text-sm font-medium mb-1 ${statusInfo.textColor}`}>
              Catatan Review:
            </p>
            <p className={`text-sm ${statusInfo.textColor} leading-relaxed`}>
              {reviewNote || 'Tidak ada catatan khusus.'}
            </p>
          </div>
        )}
      </AlertDescription>
    </Alert>
  );
}
