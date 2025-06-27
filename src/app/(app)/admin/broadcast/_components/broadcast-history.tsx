'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Clock,
  Users,
  Eye,
  AlertTriangle,
  CheckCircle,
  Info,
  AlertCircle,
  RotateCcw,
  Calendar,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
import { Notification } from '@/types/notification.types';
import { getBroadcastHistory } from '../action';

import logger from '@/lib/logger';

export function BroadcastHistory() {
  const [broadcasts, setBroadcasts] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchBroadcasts = async () => {
    try {
      setLoading(true);
      setError(null);
      logger.info('Fetching broadcast history...');
      const result = await getBroadcastHistory(20, 0);
      logger.debug({ result }, 'Broadcast history result');

      if (result.success && result.data) {
        setBroadcasts(result.data);
        logger.info(`Broadcasts set: ${result.data.length} items`);
      } else {
        logger.error({ err: result.error }, 'Failed to fetch broadcasts');
        setError(result.error || 'Gagal mengambil riwayat broadcast');
      }
    } catch (error) {
      logger.error({ err: error }, 'Error fetching broadcasts');
      setError('Terjadi kesalahan saat mengambil riwayat broadcast');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBroadcasts();
  }, []);

  const getTypeIcon = (type: string) => {
    const iconProps = { className: 'w-4 h-4' };

    switch (type) {
      case 'SUCCESS':
        return (
          <CheckCircle {...iconProps} className="w-4 h-4 text-green-600" />
        );
      case 'WARNING':
        return (
          <AlertTriangle {...iconProps} className="w-4 h-4 text-orange-600" />
        );
      case 'ERROR':
        return <AlertCircle {...iconProps} className="w-4 h-4 text-red-600" />;
      default:
        return <Info {...iconProps} className="w-4 h-4 text-blue-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'URGENT':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'HIGH':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'MEDIUM':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'LOW':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'SYSTEM':
        return 'Sistem';
      case 'APPROVAL':
        return 'Persetujuan';
      case 'DATA_SUBMISSION':
        return 'Submit Data';
      case 'REMINDER':
        return 'Pengingat';
      case 'ANNOUNCEMENT':
        return 'Pengumuman';
      default:
        return 'Umum';
    }
  };

  return (
    <Card>
      {' '}
      <CardHeader>
        <div>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Riwayat Broadcast
          </CardTitle>
          <CardDescription>
            Notifikasi broadcast yang pernah dikirim
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {error ? (
          <div className="text-center py-8">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
            <p className="text-sm text-red-600 mb-4">{error}</p>{' '}
            <Button variant="outline" onClick={fetchBroadcasts}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Coba Lagi
            </Button>
          </div>
        ) : loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 bg-muted rounded-full mt-1"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-3 bg-muted rounded w-full"></div>
                    <div className="flex gap-2">
                      <div className="h-5 bg-muted rounded w-16"></div>
                      <div className="h-5 bg-muted rounded w-20"></div>
                    </div>
                  </div>
                </div>
                {i < 2 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        ) : broadcasts.length === 0 ? (
          <div className="text-center py-8">
            <Users className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">
              Belum ada broadcast yang dikirim
            </p>
          </div>
        ) : (
          <ScrollArea className="max-h-96">
            <div className="space-y-4">
              {broadcasts.map((broadcast, index) => (
                <div key={broadcast.id}>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {getTypeIcon(broadcast.type)}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-medium text-sm leading-tight">
                          {broadcast.title}
                        </h4>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {formatDistanceToNow(broadcast.createdAt, {
                            addSuffix: true,
                            locale: id,
                          })}
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {broadcast.message}
                      </p>

                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge
                          variant="secondary"
                          className={`text-xs ${getPriorityColor(broadcast.priority)}`}
                        >
                          {broadcast.priority}
                        </Badge>{' '}
                        <Badge variant="outline" className="text-xs">
                          {getCategoryLabel(
                            broadcast.category || 'ANNOUNCEMENT',
                          )}{' '}
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="text-xs bg-blue-100 text-blue-800"
                        >
                          <Users className="w-3 h-3 mr-1" />
                          Broadcast
                        </Badge>
                        {broadcast.expiresAt && (
                          <Badge variant="outline" className="text-xs">
                            <Clock className="w-3 h-3 mr-1" />
                            Expires
                          </Badge>
                        )}
                      </div>

                      {/* Show target audience info from actionLabel */}
                      {broadcast.actionLabel && (
                        <div className="flex items-center gap-2 text-xs">
                          <Users className="w-3 h-3 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            Target: {broadcast.actionLabel}
                          </span>
                        </div>
                      )}

                      {broadcast.actionUrl && (
                        <div className="flex items-center gap-2 text-xs">
                          <Eye className="w-3 h-3 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            Action URL: {broadcast.actionUrl}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {index < broadcasts.length - 1 && (
                    <Separator className="mt-4" />
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        )}

        {broadcasts.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <Button variant="ghost" size="sm" className="w-full text-xs">
              Lihat Semua Riwayat
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
