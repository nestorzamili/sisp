import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { SiswaStats, StackedChartData } from '@/types/dashboard.types';

interface SiswaChartProps {
  data: SiswaStats[];
  isLoading?: boolean;
}

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

export function SiswaChart({ data, isLoading }: SiswaChartProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Distribusi Siswa berdasarkan Tingkatan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full bg-gray-200 animate-pulse rounded"></div>
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
        <CardTitle>Distribusi Siswa berdasarkan Tingkatan Kelas</CardTitle>
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
                    `${value} siswa`,
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
