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

interface PrasaranaTabProps {
  data: SekolahWithDetails;
}

export function PrasaranaTab({ data }: PrasaranaTabProps) {
  // Helper function to group prasarana by name
  const groupPrasaranaByName = (prasaranaData: typeof data.prasarana) => {
    if (!prasaranaData) return {};

    const grouped = prasaranaData.reduce(
      (acc, prasarana) => {
        const name = prasarana.nama_prasarana;
        if (!acc[name]) {
          acc[name] = {
            total: 0,
            baik: 0,
            rusak: 0,
            keterangan: prasarana.keterangan,
          };
        }
        acc[name].total += prasarana.jumlah_total;
        acc[name].baik += prasarana.jumlah_kondisi_baik;
        acc[name].rusak += prasarana.jumlah_kondisi_rusak;
        // Use the first non-null keterangan found
        if (!acc[name].keterangan && prasarana.keterangan) {
          acc[name].keterangan = prasarana.keterangan;
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
          Data Prasarana ({data.prasarana?.length || 0})
        </CardTitle>
      </CardHeader>{' '}
      <CardContent>
        {data.prasarana && data.prasarana.length > 0 ? (
          <div className="rounded-md border">
            <Table>
              {' '}
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center w-16">No</TableHead>
                  <TableHead className="w-1/3">Nama Prasarana</TableHead>
                  <TableHead className="text-center w-20">Baik</TableHead>
                  <TableHead className="text-center w-20">Rusak</TableHead>
                  <TableHead className="text-center w-20">Total</TableHead>
                  <TableHead className="w-1/3">Keterangan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(groupPrasaranaByName(data.prasarana)).map(
                  ([name, prasaranaData], index) => (
                    <TableRow key={name}>
                      <TableCell className="text-center font-medium">
                        {index + 1}
                      </TableCell>
                      <TableCell className="font-medium">{name}</TableCell>
                      <TableCell className="text-center">
                        {prasaranaData.baik}
                      </TableCell>
                      <TableCell className="text-center">
                        {prasaranaData.rusak}
                      </TableCell>
                      <TableCell className="text-center">
                        {prasaranaData.total}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {prasaranaData.keterangan || '-'}
                      </TableCell>
                    </TableRow>
                  ),
                )}
              </TableBody>
            </Table>
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-8">
            Belum ada data prasarana
          </p>
        )}
      </CardContent>
    </Card>
  );
}
