import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardStats } from '@/types/dashboard.types';
import { Users, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface StatsCardsProps {
  stats: DashboardStats;
  isLoading?: boolean;
}

export function StatsCards({ stats, isLoading }: StatsCardsProps) {
  const cardData = [
    {
      title: 'Total Sekolah Terdaftar',
      value: stats.totalSekolahTerdaftar,
      icon: Users,
      description: 'Sekolah yang telah disetujui pendaftaran',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Menunggu Approval',
      value: stats.sekolahMenungguApproval,
      icon: Clock,
      description: 'Sekolah yang menunggu persetujuan pendaftaran',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Formular Selesai',
      value: stats.sekolahFormulirSelesai,
      icon: CheckCircle,
      description: 'Sekolah yang telah menyelesaikan formular',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Menunggu Review',
      value: stats.sekolahMenungguReview,
      icon: AlertCircle,
      description: 'Sekolah yang menunggu review data',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 w-24 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-4 w-4 bg-gray-200 animate-pulse rounded"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 w-16 bg-gray-200 animate-pulse rounded mb-1"></div>
              <div className="h-3 w-32 bg-gray-200 animate-pulse rounded"></div>
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
          <Card key={index} className="transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${card.bgColor}`}>
                <Icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-1">
                {card.value.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                {card.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
