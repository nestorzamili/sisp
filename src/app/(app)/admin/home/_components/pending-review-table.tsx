import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PendingReview } from '@/types/dashboard.types';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
import { Eye } from 'lucide-react';

interface PendingReviewTableProps {
  data: PendingReview[];
  isLoading?: boolean;
}

export function PendingReviewTable({
  data,
  isLoading,
}: PendingReviewTableProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Permintaan Review Masuk</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="space-y-1 flex-1">
                  <div className="h-4 w-40 bg-gray-200 animate-pulse rounded"></div>
                  <div className="h-3 w-24 bg-gray-200 animate-pulse rounded"></div>
                </div>
                <div className="h-8 w-20 bg-gray-200 animate-pulse rounded"></div>
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
        <CardTitle>Permintaan Review Masuk</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">
              Tidak ada permintaan review yang menunggu
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
                      Diajukan{' '}
                      {formatDistanceToNow(new Date(sekolah.updatedAt), {
                        addSuffix: true,
                        locale: id,
                      })}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {sekolah.userEmail}
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    // TODO: Navigate to review page
                    window.open(`/admin/reviews/${sekolah.id}`, '_blank');
                  }}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Review
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
