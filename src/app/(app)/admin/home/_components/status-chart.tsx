import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';
import { PieChart, Pie } from 'recharts';
import { SekolahStats } from '@/types/dashboard.types';

interface StatusChartProps {
  data: SekolahStats[];
  isLoading?: boolean;
}

const chartConfig = {
  DRAFT: {
    label: 'Draft',
    color: '#2563eb',
  },
  PENDING: {
    label: 'Pending',
    color: '#60a5fa',
  },
  APPROVED: {
    label: 'Approved',
    color: '#10b981',
  },
  REJECTED: {
    label: 'Rejected',
    color: '#ef4444',
  },
} satisfies ChartConfig;

export function StatusChart({ data, isLoading }: StatusChartProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Status Sekolah</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full bg-gray-200 animate-pulse rounded"></div>
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
      <CardHeader>
        <CardTitle>Distribusi Status Sekolah</CardTitle>
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
                    `${value} sekolah (${(((value as number) / total) * 100).toFixed(1)}%)`,
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
