import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { SaranaStats, PrasaranaStats } from '@/types/dashboard.types';

interface SaranaPrasaranaChartProps {
  saranaData: SaranaStats[];
  prasaranaData: PrasaranaStats[];
  isLoading?: boolean;
}

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

export function SaranaPrasaranaChart({
  saranaData,
  prasaranaData,
  isLoading,
}: SaranaPrasaranaChartProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {' '}
        <Card>
          <CardHeader>
            <CardTitle>Top Sarana</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full bg-gray-200 animate-pulse rounded"></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top Prasarana</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full bg-gray-200 animate-pulse rounded"></div>
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
        <CardHeader>
          <CardTitle>Top 10 Sarana Terbanyak</CardTitle>
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
                  <ChartTooltipContent
                    formatter={(value) => [`${value} unit`, 'Jumlah']}
                  />
                }
              />
              <Bar dataKey="value" fill="var(--color-sarana)" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      {/* Prasarana Chart */}{' '}
      <Card>
        <CardHeader>
          <CardTitle>Top 10 Prasarana Terbanyak</CardTitle>
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
                  <ChartTooltipContent
                    formatter={(value) => [`${value} unit`, 'Jumlah']}
                  />
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
