import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { SiswaStats, StackedChartData } from '@/types/dashboard.types';
import { useEffect, useState } from 'react';
import { getSiswaDistribution } from '../action';
import { Users } from 'lucide-react';
import logger from '@/lib/logger';

export function SiswaChart() {
  const [data, setData] = useState<SiswaStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await getSiswaDistribution();
        if (result.success) {
          setData(result.data);
        }
      } catch (error) {
        logger.error('Error fetching siswa distribution:', error);
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
            <div className="h-5 w-5 bg-purple-200 dark:bg-purple-700 animate-pulse rounded"></div>
            <div className="h-5 w-52 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Chart area skeleton */}
          <div className="h-[300px] w-full bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg flex items-end justify-center gap-1 p-4">
            {/* Simulated stacked bars */}
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex flex-col w-12 gap-0">
                <div
                  className={`w-full bg-blue-200 dark:bg-blue-800 animate-pulse rounded-t h-${8 + (i % 3) * 4}`}
                ></div>
                <div
                  className={`w-full bg-pink-200 dark:bg-pink-800 animate-pulse rounded-b h-${6 + (i % 4) * 3}`}
                ></div>
              </div>
            ))}
          </div>
          {/* Legend skeleton */}
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
  const tingkatanMap = new Map<string, StackedChartData>();

  data.forEach((item) => {
    if (!tingkatanMap.has(item.tingkatan)) {
      tingkatanMap.set(item.tingkatan, {
        tingkatan: item.tingkatan,
        L: 0,
        P: 0,
      });
    }

    const tingkatanData = tingkatanMap.get(item.tingkatan)!;
    tingkatanData[item.jenisKelamin] = item.jumlah;
  });

  const chartData = Array.from(tingkatanMap.values()).sort((a, b) => {
    // Sort tingkatan logically (1, 2, 3, 4, 5, 6)
    const aNum = parseInt(a.tingkatan);
    const bNum = parseInt(b.tingkatan);
    if (!isNaN(aNum) && !isNaN(bNum)) {
      return aNum - bNum;
    }
    return a.tingkatan.localeCompare(b.tingkatan);
  });

  return (
    <Card>
      {' '}
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-purple-600" />
          Distribusi Siswa berdasarkan Tingkatan Kelas
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
            <XAxis
              dataKey="tingkatan"
              tickFormatter={(value) => `Kelas ${value}`}
              fontSize={12}
              tickMargin={8}
            />
            <YAxis fontSize={12} tickMargin={8} />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name) => [
                    `${value} Siswa `,
                    chartConfig[name as keyof typeof chartConfig]?.label ||
                      name,
                  ]}
                />
              }
            />
            <Bar
              dataKey="L"
              stackId="siswa"
              fill="var(--color-L)"
              radius={4}
              maxBarSize={50}
            />
            <Bar
              dataKey="P"
              stackId="siswa"
              fill="var(--color-P)"
              radius={4}
              maxBarSize={50}
            />
          </BarChart>
        </ChartContainer>{' '}
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
