import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DashboardStats } from '@/types/dashboard.types';
import { Users, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getDashboardStats } from '../action';

export function StatsCards() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        const result = await getDashboardStats();
        if (result.success) {
          setStats(result.data);
        }
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card
            key={index}
            className="group relative overflow-hidden border-l-4 border-l-gray-200 dark:border-l-gray-700"
          >
            {/* Background Pattern Skeleton */}
            <div className="absolute inset-0 bg-gray-50 dark:bg-gray-800/50 opacity-60" />

            <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
              <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-gray-700">
                <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
              </div>
            </CardHeader>
            <CardContent className="relative space-y-3">
              <div className="h-9 w-20 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
              <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!stats) {
    return null;
  }
  const cardData = [
    {
      title: 'Total Sekolah Terdaftar',
      value: stats.totalSekolahTerdaftar,
      icon: Users,
      description: 'Sekolah yang telah disetujui pendaftaran',
      color: 'text-blue-600',
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
      darkBgColor: 'dark:from-blue-950/50 dark:to-blue-900/30',
      priority: 'normal',
    },
    {
      title: 'Menunggu Approval',
      value: stats.sekolahMenungguApproval,
      icon: Clock,
      description: 'Perlu ditindaklanjuti segera',
      color: 'text-orange-600',
      bgColor: 'bg-gradient-to-br from-orange-50 to-amber-100',
      darkBgColor: 'dark:from-orange-950/50 dark:to-amber-900/30',
      priority: stats.sekolahMenungguApproval > 5 ? 'high' : 'normal',
    },
    {
      title: 'Formulir Selesai',
      value: stats.sekolahFormulirSelesai,
      icon: CheckCircle,
      description: 'Data lengkap dan telah direview',
      color: 'text-green-600',
      bgColor: 'bg-gradient-to-br from-green-50 to-emerald-100',
      darkBgColor: 'dark:from-green-950/50 dark:to-emerald-900/30',
      priority: 'normal',
    },
    {
      title: 'Menunggu Review',
      value: stats.sekolahMenungguReview,
      icon: AlertCircle,
      description: 'Memerlukan review data admin',
      color: 'text-purple-600',
      bgColor: 'bg-gradient-to-br from-purple-50 to-violet-100',
      darkBgColor: 'dark:from-purple-950/50 dark:to-violet-900/30',
      priority: stats.sekolahMenungguReview > 3 ? 'high' : 'normal',
    },
  ];
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card
            key={index}
            className="group relative overflow-hidden border-l-4 border-l-gray-200 dark:border-l-gray-700"
          >
            {/* Background Pattern Skeleton */}
            <div className="absolute inset-0 bg-gray-50 dark:bg-gray-800/50 opacity-60" />

            <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
              <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-gray-700">
                <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
              </div>
            </CardHeader>
            <CardContent className="relative space-y-3">
              <div className="h-9 w-20 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
              <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cardData.map((card, index) => {
        const Icon = card.icon;

        return (
          <Card
            key={index}
            className={`group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-l-4 ${
              card.priority === 'high'
                ? 'border-l-red-500 hover:border-l-red-600'
                : 'border-l-transparent hover:border-l-blue-400'
            }`}
          >
            {/* Background Pattern */}
            <div
              className={`absolute inset-0 ${card.bgColor} ${card.darkBgColor} opacity-60`}
            />

            {/* Priority Indicator */}
            {card.priority === 'high' && (
              <div className="absolute top-2 right-2">
                <Badge variant="destructive" className="text-xs px-2 py-0.5">
                  Urgent
                </Badge>
              </div>
            )}

            <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground line-clamp-2">
                {card.title}
              </CardTitle>
              <div
                className={`p-3 rounded-xl ${card.bgColor} ${card.darkBgColor} ring-1 ring-white/20 shadow-sm group-hover:scale-110 transition-transform duration-300`}
              >
                <Icon className={`h-5 w-5 ${card.color}`} />
              </div>
            </CardHeader>

            <CardContent className="relative space-y-3">
              <div className="text-3xl font-bold tracking-tight">
                {card.value.toLocaleString()}
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {card.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
