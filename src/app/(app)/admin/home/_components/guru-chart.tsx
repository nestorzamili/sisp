import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { GuruStats } from '@/types/dashboard.types';

interface GuruChartProps {
  data: GuruStats[];
  isLoading?: boolean;
}

const chartConfig = {
  PNS: {
    label: 'PNS',
    color: '#2563eb',
  },
  PPPK: {
    label: 'PPPK',
    color: '#60a5fa',
  },
  Honorer: {
    label: 'Honorer',
    color: '#10b981',
  },
} satisfies ChartConfig;

export function GuruChart({ data, isLoading }: GuruChartProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Distribusi Guru berdasarkan Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full bg-gray-200 animate-pulse rounded"></div>
        </CardContent>
      </Card>
    );
  }

  const chartData = data.map((item) => ({
    status: item.status,
    jumlah: item.jumlah,
    fill: `var(--color-${item.status})`,
  }));

  return (
    <Card>
      {' '}
      <CardHeader>
        <CardTitle>Distribusi Guru berdasarkan Status</CardTitle>
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
            <CartesianGrid vertical={false} />
            <XAxis dataKey="status" fontSize={12} tickMargin={8} />
            <YAxis fontSize={12} tickMargin={8} />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => [`${value} orang`, 'Jumlah Guru']}
                />
              }
            />
            <Bar dataKey="jumlah" radius={4} maxBarSize={50} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
