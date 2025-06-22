'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, UserCheck, Shield, Bell, RotateCcw } from 'lucide-react';
import { getBroadcastStats } from '../action';

interface BroadcastStatsData {
  totalUsers: number;
  approvedUsers: number;
  adminUsers: number;
  totalNotifications: number;
}

export function BroadcastStats() {
  const [stats, setStats] = useState<BroadcastStatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getBroadcastStats();

      if (result.success && result.data) {
        setStats(result.data);
      } else {
        setError(result.error || 'Gagal mengambil statistik');
      }
    } catch {
      setError('Terjadi kesalahan saat mengambil statistik');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-4 bg-muted rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-muted rounded w-full"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-red-200">
        <CardContent className="p-6 text-center">
          <p className="text-red-600 mb-4">{error}</p>{' '}
          <Button variant="outline" onClick={fetchStats}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Coba Lagi
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!stats) return null;

  const statsCards = [
    {
      title: 'Total Pengguna',
      value: stats.totalUsers,
      description: 'Semua pengguna terdaftar',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Pengguna Disetujui',
      value: stats.approvedUsers,
      description: 'Pengguna sekolah aktif',
      icon: UserCheck,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Administrator',
      value: stats.adminUsers,
      description: 'Admin sistem',
      icon: Shield,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Total Notifikasi',
      value: stats.totalNotifications,
      description: 'Notifikasi yang pernah dikirim',
      icon: Bell,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">Statistik Broadcast</h3>
        <p className="text-sm text-muted-foreground">
          Overview pengguna dan notifikasi sistem
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stat.value.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>{' '}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
