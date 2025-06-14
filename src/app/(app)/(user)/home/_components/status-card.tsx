'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, Clock, AlertCircle, FileText } from 'lucide-react';

type ReviewStatus = 'DRAFT' | 'PENDING' | 'APPROVED' | 'REJECTED';

interface StatusCardProps {
  status: ReviewStatus;
  reviewNotes?: string | null;
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
        description:
          'Data telah disetujui dan diverifikasi oleh Dinas Pendidikan.',
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

export function StatusCard({ status, reviewNotes }: StatusCardProps) {
  const config = getStatusConfig(status);
  const StatusIcon = config.icon;

  return (
    <Card>
      {' '}
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <div className={`p-2 rounded-lg ${config.bgColor}`}>
              <StatusIcon className={`w-5 h-5 ${config.color}`} />
            </div>
            Status Review Data
          </CardTitle>
          <Badge variant={config.variant} className="font-medium">
            {config.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm">{config.description}</p>
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
