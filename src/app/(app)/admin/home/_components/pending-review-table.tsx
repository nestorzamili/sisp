import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { PendingReview } from '@/types/dashboard.types';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
import { Eye, AlertCircle, Clock, Mail, Users, FileCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getPendingReviews } from '../action';

export function PendingReviewTable() {
  const [data, setData] = useState<PendingReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await getPendingReviews(10);
        if (result.success) {
          setData(result.data);
        }
      } catch {
        // Silent fail for dashboard widget
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  if (isLoading) {
    return (
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCheck className="h-5 w-5 text-orange-600" />
            <span>Permintaan Review Masuk</span>
            <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-full ml-auto"></div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-0">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border-b last:border-b-0"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-full"></div>
                  <div className="space-y-2 flex-1">
                    <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
                    <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
                    <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
                  </div>
                </div>
                <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileCheck className="h-5 w-5 text-orange-600" />
          <span>Permintaan Review Masuk</span>
          {data.length > 0 && (
            <Badge
              variant="secondary"
              className="ml-auto bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300"
            >
              {data.length} pending
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {data.length === 0 ? (
          <div className="text-center py-12 px-4">
            <div className="mx-auto h-16 w-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
              <FileCheck className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              Semua sudah direview
            </h3>
            <p className="text-sm text-muted-foreground">
              Tidak ada permintaan review yang menunggu. Kerja bagus! 🎉
            </p>
          </div>
        ) : (
          <div className="space-y-0">
            {data.map((sekolah, index) => {
              const daysSinceSubmission = Math.floor(
                (Date.now() - new Date(sekolah.updatedAt).getTime()) /
                  (1000 * 60 * 60 * 24),
              );
              const isUrgent = daysSinceSubmission > 3;

              return (
                <div
                  key={sekolah.id}
                  className={`group relative flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200 ${
                    index !== data.length - 1 ? 'border-b' : ''
                  } ${isUrgent ? 'bg-red-50/50 dark:bg-red-950/20 border-l-4 border-l-red-400' : ''}`}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-orange-100 text-orange-600 font-medium">
                          {sekolah.namaSekolah.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      {isUrgent && (
                        <div className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
                          <AlertCircle className="h-2.5 w-2.5 text-white" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                          {sekolah.namaSekolah}
                        </h4>
                        {isUrgent && (
                          <Badge
                            variant="destructive"
                            className="text-xs px-2 py-0"
                          >
                            Urgent
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span className="font-mono">
                            NPSN: {sekolah.npsn}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>
                            Diajukan{' '}
                            {formatDistanceToNow(new Date(sekolah.updatedAt), {
                              addSuffix: true,
                              locale: id,
                            })}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <Mail className="h-3 w-3" />
                        <span className="truncate">{sekolah.userEmail}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant={isUrgent ? 'default' : 'outline'}
                      className={`min-w-[80px] ${
                        isUrgent
                          ? 'bg-red-600 hover:bg-red-700 text-white'
                          : 'hover:bg-orange-50 hover:text-orange-700 hover:border-orange-300'
                      }`}
                      onClick={() => {
                        window.location.href = `/admin/permintaan-review/${sekolah.id}`;
                      }}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Review
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
