import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { GuruStats, StackedGuruData } from '@/types/dashboard.types';
import { useEffect, useState } from 'react';
import { getGuruDistribution } from '../action';
import { GraduationCap } from 'lucide-react';
import logger from '@/lib/logger';

export function GuruChart() {
  const [data, setData] = useState<GuruStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await getGuruDistribution();
        if (result.success) {
          setData(result.data);
        }
      } catch (error) {
        logger.error('Error fetching guru distribution:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  const chartConfig = {
    L: {
      label: 'Laki-laki',
      color: '#2563eb',
    },
    P: {
      label: 'Perempuan',
      color: '#ec4899',
    },
  } satisfies ChartConfig;
  if (isLoading) {
    return (
      <Card>
        {' '}
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="h-5 w-5 bg-blue-200 dark:bg-blue-700 animate-pulse rounded"></div>
            <div className="h-5 w-48 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Chart area skeleton */}{' '}
          <div className="h-[300px] w-full bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg flex items-end justify-center gap-1 p-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex flex-col w-16 gap-0">
                <div
                  className={`w-full bg-blue-200 dark:bg-blue-800 animate-pulse rounded-t`}
                  style={{ height: `${20 + i * 10}px` }}
                ></div>
                <div
                  className={`w-full bg-pink-200 dark:bg-pink-800 animate-pulse rounded-b`}
                  style={{ height: `${15 + i * 8}px` }}
                ></div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 bg-blue-200 dark:bg-blue-700 animate-pulse rounded"></div>
              <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 bg-pink-200 dark:bg-pink-700 animate-pulse rounded"></div>
              <div className="h-3 w-18 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Transform data into stacked format
  const statusMap = new Map<string, StackedGuruData>();

  data.forEach((item) => {
    if (!statusMap.has(item.status)) {
      statusMap.set(item.status, {
        status: item.status,
        L: 0,
        P: 0,
      });
    }

    const statusData = statusMap.get(item.status)!;
    statusData[item.jenisKelamin] = item.jumlah;
  });

  const chartData = Array.from(statusMap.values()).sort((a, b) => {
    // Sort status logically (PNS, PPPK, Honorer)
    const statusOrder = ['PNS', 'PPPK', 'Honorer'];
    return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
  });

  return (
    <Card>
      {' '}
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-blue-600" />
          Distribusi Guru berdasarkan Status
        </CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 15,
              left: 10,
              bottom: 20,
            }}
          >
            {' '}
            <CartesianGrid vertical={false} />
            <XAxis dataKey="status" fontSize={12} tickMargin={8} />
            <YAxis fontSize={12} tickMargin={8} />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name) => [
                    `${value} Guru `,
                    chartConfig[name as keyof typeof chartConfig]?.label ||
                      name,
                  ]}
                />
              }
            />
            <Bar
              dataKey="L"
              stackId="guru"
              fill="var(--color-L)"
              radius={4}
              maxBarSize={50}
            />
            <Bar
              dataKey="P"
              stackId="guru"
              fill="var(--color-P)"
              radius={4}
              maxBarSize={50}
            />
          </BarChart>
        </ChartContainer>

        {/* Legend */}
        <div className="flex justify-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: '#2563eb' }}
            />
            <span className="text-sm text-muted-foreground">Laki-laki</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: '#ec4899' }}
            />
            <span className="text-sm text-muted-foreground">Perempuan</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
