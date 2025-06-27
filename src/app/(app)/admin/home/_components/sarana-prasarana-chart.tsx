import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { SaranaStats, PrasaranaStats } from '@/types/dashboard.types';
import { useEffect, useState } from 'react';
import { getSaranaDistribution, getPrasaranaDistribution } from '../action';
import { Monitor, Building } from 'lucide-react';
import logger from '@/lib/logger';

export function SaranaPrasaranaChart() {
  const [saranaData, setSaranaData] = useState<SaranaStats[]>([]);
  const [prasaranaData, setPrasaranaData] = useState<PrasaranaStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [saranaResult, prasaranaResult] = await Promise.all([
          getSaranaDistribution(),
          getPrasaranaDistribution(),
        ]);

        if (saranaResult.success) {
          setSaranaData(saranaResult.data);
        }
        if (prasaranaResult.success) {
          setPrasaranaData(prasaranaResult.data);
        }
      } catch (error) {
        logger.error('Error fetching sarana/prasarana distribution:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const chartConfig = {
    sarana: {
      label: 'Sarana',
      color: '#2563eb',
    },
    prasarana: {
      label: 'Prasarana',
      color: '#60a5fa',
    },
  } satisfies ChartConfig;

  // Helper function to convert enum to readable format
  const formatJenisName = (jenis: string) => {
    const mapping: Record<string, string> = {
      RuangKepalaSekolah: 'Ruang Kepala Sekolah',
      RuangGuru: 'Ruang Guru',
      RuangKelas: 'Ruang Kelas',
      LaboratoriumIPA: 'Lab IPA',
      LaboratoriumBahasa: 'Lab Bahasa',
      LaboratoriumTIK: 'Lab TIK',
      AulaPertemuan: 'Aula Pertemuan',
      Perpustakaan: 'Perpustakaan',
      JambanGuru: 'Jamban Guru',
      JambanSiswa: 'Jamban Siswa',
      MejaKursiSiswa: 'Meja Kursi Siswa',
      Komputer: 'Komputer',
      PrasaranaLainnya: 'Prasarana Lainnya',
    };
    return mapping[jenis] || jenis;
  };
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {/* Sarana Chart Skeleton */}
        <Card>
          <CardHeader>
            {' '}
            <CardTitle className="flex items-center gap-2">
              <div className="h-5 w-5 bg-orange-200 dark:bg-orange-700 animate-pulse rounded"></div>
              <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Chart area skeleton */}
            <div className="h-[400px] w-full bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg flex items-end justify-center gap-2 p-4">
              {/* Simulated bars */}{' '}
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-12 bg-orange-200 dark:bg-orange-700 animate-pulse rounded-t`}
                  style={{ height: `${20 + i * 15}%` }}
                ></div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Prasarana Chart Skeleton */}
        <Card>
          <CardHeader>
            {' '}
            <CardTitle className="flex items-center gap-2">
              <div className="h-5 w-5 bg-teal-200 dark:bg-teal-700 animate-pulse rounded"></div>
              <div className="h-5 w-36 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Chart area skeleton */}
            <div className="h-[400px] w-full bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg flex items-end justify-center gap-2 p-4">
              {/* Simulated bars */}{' '}
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-12 bg-teal-200 dark:bg-teal-700 animate-pulse rounded-t`}
                  style={{ height: `${25 + i * 12}%` }}
                ></div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const saranaChartData = saranaData.map((item) => ({
    name: formatJenisName(item.jenis),
    value: item.jumlah,
  }));

  const prasaranaChartData = prasaranaData.map((item) => ({
    name: formatJenisName(item.jenis),
    value: item.jumlah,
  }));

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Sarana Chart */}{' '}
      <Card>
        {' '}
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5 text-orange-600" />
            Top 10 Sarana Terbanyak
          </CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <ChartContainer config={chartConfig} className="min-h-[400px] w-full">
            <BarChart
              data={saranaChartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 60,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={60}
                fontSize={12}
              />
              <YAxis />
              <ChartTooltip
                content={
                  <ChartTooltipContent formatter={(value) => [`${value}`]} />
                }
              />
              <Bar dataKey="value" fill="var(--color-sarana)" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      {/* Prasarana Chart */}{' '}
      <Card>
        {' '}
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5 text-teal-600" />
            Top 10 Prasarana Terbanyak
          </CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <ChartContainer config={chartConfig} className="min-h-[400px] w-full">
            <BarChart
              data={prasaranaChartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 60,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={60}
                fontSize={12}
              />
              <YAxis />
              <ChartTooltip
                content={
                  <ChartTooltipContent formatter={(value) => [`${value}`]} />
                }
              />
              <Bar dataKey="value" fill="var(--color-prasarana)" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
