import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';
import { PieChart, Pie } from 'recharts';
import { SekolahStats } from '@/types/dashboard.types';
import { useEffect, useState } from 'react';
import { getSekolahStatusDistribution } from '../action';
import { School } from 'lucide-react';
import logger from '@/lib/logger';

export function StatusChart() {
  const [data, setData] = useState<SekolahStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await getSekolahStatusDistribution();
        if (result.success) {
          setData(result.data);
        }
      } catch (error) {
        logger.error('Error fetching status distribution:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const chartConfig = {
    DRAFT: {
      label: 'Draft',
      color: '#2563eb',
    },
    PENDING: {
      label: 'Menunggu Review',
      color: '#60a5fa',
    },
    APPROVED: {
      label: 'Disetujui',
      color: '#10b981',
    },
    REJECTED: {
      label: 'Ditolak',
      color: '#ef4444',
    },
  } satisfies ChartConfig;
  if (isLoading) {
    return (
      <Card>
        {' '}
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="h-5 w-5 bg-green-200 dark:bg-green-700 animate-pulse rounded"></div>
            <div className="h-5 w-36 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Pie chart skeleton */}
          <div className="h-[300px] w-full flex items-center justify-center">
            <div className="relative">
              <div className="h-48 w-48 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-full"></div>
              <div className="absolute inset-6 bg-white dark:bg-gray-900 rounded-full"></div>
            </div>
          </div>
          {/* Legend skeleton */}
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 bg-gray-300 dark:bg-gray-600 animate-pulse rounded"></div>
                  <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
                </div>
                <div className="h-3 w-8 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const chartData = data.map((item) => ({
    name: chartConfig[item.status]?.label || item.status,
    value: item.count,
    status: item.status,
    fill: `var(--color-${item.status})`,
  }));

  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card>
      {' '}
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <School className="h-5 w-5 text-green-600" />
          Distribusi Status Sekolah
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={5}
              dataKey="value"
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name) => [
                    `${value} sekolah (${(((value as number) / total) * 100).toFixed(1)}%) `,
                    name,
                  ]}
                />
              }
            />
          </PieChart>
        </ChartContainer>{' '}
        {/* Legend */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          {chartData.map((item) => (
            <div key={item.status} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.fill }}
              />
              <span className="text-sm text-muted-foreground">
                {item.name}: {item.value}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
