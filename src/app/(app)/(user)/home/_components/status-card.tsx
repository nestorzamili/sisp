'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  Calendar,
} from 'lucide-react';

type ReviewStatus = 'DRAFT' | 'PENDING' | 'APPROVED' | 'REJECTED';

interface StatusCardProps {
  status: ReviewStatus;
  reviewedAt?: Date | null;
  reviewNotes?: string | null;
  reviewedBy?: {
    name: string;
  } | null;
}

const getStatusConfig = (status: ReviewStatus) => {
  switch (status) {
    case 'DRAFT':
      return {
        label: 'Draft',
        variant: 'secondary' as const,
        icon: FileText,
        color: 'text-gray-600',
        bgColor: 'bg-gray-50',
        description: 'Data belum dikirim untuk direview',
      };
    case 'PENDING':
      return {
        label: 'Menunggu Review',
        variant: 'default' as const,
        icon: Clock,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        description: 'Data sedang dalam proses review',
      };
    case 'APPROVED':
      return {
        label: 'Disetujui',
        variant: 'default' as const,
        icon: CheckCircle,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        description: 'Data telah disetujui dan diverifikasi',
      };
    case 'REJECTED':
      return {
        label: 'Ditolak',
        variant: 'destructive' as const,
        icon: AlertCircle,
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        description: 'Data ditolak dan perlu diperbaiki',
      };
    default:
      return {
        label: 'Unknown',
        variant: 'secondary' as const,
        icon: FileText,
        color: 'text-gray-600',
        bgColor: 'bg-gray-50',
        description: 'Status tidak diketahui',
      };
  }
};

export function StatusCard({
  status,
  reviewedAt,
  reviewNotes,
  reviewedBy,
}: StatusCardProps) {
  const config = getStatusConfig(status);
  const StatusIcon = config.icon;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className={`p-2 rounded-lg ${config.bgColor}`}>
            <StatusIcon className={`w-5 h-5 ${config.color}`} />
          </div>
          Status Review Data
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Status saat ini:
          </span>
          <Badge variant={config.variant} className="font-medium">
            {config.label}
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground">{config.description}</p>

        {reviewedAt && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>
              Direview pada:{' '}
              {new Date(reviewedAt).toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        )}

        {reviewedBy && (
          <div className="text-sm text-muted-foreground">
            <span className="font-medium">Direview oleh:</span>{' '}
            {reviewedBy.name}
          </div>
        )}

        {reviewNotes && (
          <Alert>
            <AlertCircle className="w-4 h-4" />
            <AlertDescription>
              <strong>Catatan Review:</strong>
              <div className="mt-1 whitespace-pre-wrap">{reviewNotes}</div>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
