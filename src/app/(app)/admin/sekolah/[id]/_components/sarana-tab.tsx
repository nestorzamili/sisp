'use client';

import { Building2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { SekolahWithDetails } from '@/types/sekolah';

interface SaranaTabProps {
  data: SekolahWithDetails;
}

export function SaranaTab({ data }: SaranaTabProps) {
  // Helper function to group sarana by name
  const groupSaranaByName = (saranaData: typeof data.sarana) => {
    if (!saranaData) return {};

    const grouped = saranaData.reduce(
      (acc, sarana) => {
        const name = sarana.nama_sarana;
        if (!acc[name]) {
          acc[name] = {
            total: 0,
            baik: 0,
            rusak: 0,
            keterangan: sarana.keterangan,
          };
        }
        acc[name].total += sarana.jumlah_total;
        acc[name].baik += sarana.jumlah_kondisi_baik;
        acc[name].rusak += sarana.jumlah_kondisi_rusak;
        // Use the first non-null keterangan found
        if (!acc[name].keterangan && sarana.keterangan) {
          acc[name].keterangan = sarana.keterangan;
        }
        return acc;
      },
      {} as Record<
        string,
        {
          total: number;
          baik: number;
          rusak: number;
          keterangan: string | null;
        }
      >,
    );

    return grouped;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Data Sarana ({data.sarana?.length || 0})
        </CardTitle>
      </CardHeader>{' '}
      <CardContent>
        {data.sarana && data.sarana.length > 0 ? (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center w-16">No</TableHead>
                  <TableHead className="w-1/3">Nama Sarana</TableHead>
                  <TableHead className="text-center w-20">Baik</TableHead>
                  <TableHead className="text-center w-20">Rusak</TableHead>
                  <TableHead className="text-center w-20">Total</TableHead>
                  <TableHead className="w-1/3">Keterangan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(groupSaranaByName(data.sarana)).map(
                  ([name, saranaData], index) => (
                    <TableRow key={name}>
                      <TableCell className="text-center font-medium">
                        {index + 1}
                      </TableCell>
                      <TableCell className="font-medium">{name}</TableCell>
                      <TableCell className="text-center">
                        {saranaData.baik}
                      </TableCell>
                      <TableCell className="text-center">
                        {saranaData.rusak}
                      </TableCell>
                      <TableCell className="text-center">
                        {saranaData.total}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {saranaData.keterangan || '-'}
                      </TableCell>
                    </TableRow>
                  ),
                )}
              </TableBody>
            </Table>
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-8">
            Belum ada data sarana
          </p>
        )}
      </CardContent>
    </Card>
  );
}
