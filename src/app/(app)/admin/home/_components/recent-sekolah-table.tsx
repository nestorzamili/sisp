import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { RecentSekolah } from '@/types/dashboard.types';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
import { School, Clock, Mail, ExternalLink, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getRecentSekolah } from '../action';

export function RecentSekolahTable() {
  const [data, setData] = useState<RecentSekolah[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await getRecentSekolah(5);
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
        return 'Menunggu Review';
      case 'REJECTED':
        return 'Ditolak';
      case 'DRAFT':
        return 'Draft';
      default:
        return status;
    }
  };
  if (isLoading) {
    return (
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <School className="h-5 w-5 text-blue-600" />
            Sekolah Terbaru
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
                <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-full"></div>
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
          <School className="h-5 w-5 text-blue-600" />
          Sekolah Terbaru
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {data.length === 0 ? (
          <div className="text-center py-12 px-4">
            <div className="mx-auto h-16 w-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
              <School className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              Belum ada sekolah
            </h3>
            <p className="text-sm text-muted-foreground">
              Sekolah yang baru mendaftar akan muncul di sini
            </p>
          </div>
        ) : (
          <div className="space-y-0">
            {' '}
            {data.map((sekolah, index) => {
              const handleClick = () => {
                if (sekolah.status === 'APPROVED') {
                  window.location.href = `/admin/sekolah/${sekolah.id}`;
                } else if (
                  sekolah.status === 'PENDING' ||
                  sekolah.status === 'REJECTED'
                ) {
                  window.location.href = `/admin/permintaan-review/${sekolah.id}`;
                }
                // DRAFT status tidak diarahkan kemana-mana
              };

              const isClickable = sekolah.status !== 'DRAFT';

              return (
                <div
                  key={sekolah.id}
                  className={`group relative flex items-center justify-between p-4 transition-all duration-200 ${
                    index !== data.length - 1 ? 'border-b' : ''
                  } ${
                    isClickable
                      ? 'hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer'
                      : 'cursor-default'
                  }`}
                  onClick={isClickable ? handleClick : undefined}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-blue-100 text-blue-600 font-medium">
                        {sekolah.namaSekolah.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      {' '}
                      <div className="flex items-center gap-2 mb-1">
                        <h4
                          className={`font-semibold text-gray-900 dark:text-gray-100 truncate transition-colors ${
                            isClickable ? 'group-hover:text-blue-600' : ''
                          }`}
                        >
                          {sekolah.namaSekolah}
                        </h4>
                        {isClickable && (
                          <ExternalLink className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
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
                            {formatDistanceToNow(new Date(sekolah.createdAt), {
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
                  </div>{' '}
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={getStatusBadgeVariant(sekolah.status)}
                      className="text-xs font-medium"
                    >
                      {getStatusText(sekolah.status)}
                    </Badge>
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
