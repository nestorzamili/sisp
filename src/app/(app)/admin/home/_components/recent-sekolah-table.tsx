import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RecentSekolah } from '@/types/dashboard.types';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';

interface RecentSekolahTableProps {
  data: RecentSekolah[];
  isLoading?: boolean;
}

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case 'APPROVED':
      return 'default';
    case 'PENDING':
      return 'secondary';
    case 'REJECTED':
      return 'destructive';
    case 'DRAFT':
      return 'outline';
    default:
      return 'outline';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'APPROVED':
      return 'Disetujui';
    case 'PENDING':
      return 'Menunggu';
    case 'REJECTED':
      return 'Ditolak';
    case 'DRAFT':
      return 'Draft';
    default:
      return status;
  }
};

export function RecentSekolahTable({
  data,
  isLoading,
}: RecentSekolahTableProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sekolah Terbaru</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="space-y-1">
                  <div className="h-4 w-40 bg-gray-200 animate-pulse rounded"></div>
                  <div className="h-3 w-24 bg-gray-200 animate-pulse rounded"></div>
                </div>
                <div className="h-6 w-16 bg-gray-200 animate-pulse rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sekolah Terbaru</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">
              Belum ada sekolah yang terdaftar
            </p>
          ) : (
            data.map((sekolah) => (
              <div
                key={sekolah.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">
                    {sekolah.namaSekolah}
                  </h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>NPSN: {sekolah.npsn}</span>
                    <span>•</span>
                    <span>
                      {formatDistanceToNow(new Date(sekolah.createdAt), {
                        addSuffix: true,
                        locale: id,
                      })}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {sekolah.userEmail}
                  </div>
                </div>
                <Badge variant={getStatusBadgeVariant(sekolah.status)}>
                  {getStatusText(sekolah.status)}
                </Badge>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
