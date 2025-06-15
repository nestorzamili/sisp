'use client';

import { Building2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
      </CardHeader>
      <CardContent>
        {data.sarana && data.sarana.length > 0 ? (
          <div className="space-y-4">
            {Object.entries(groupSaranaByName(data.sarana)).map(
              ([name, saranaData]) => (
                <div key={name} className="p-4 border rounded-lg space-y-2">
                  <h4 className="text-sm font-medium">{name}</h4>
                  <div className="flex items-start gap-2">
                    <span className="text-sm font-medium text-muted-foreground min-w-[120px]">
                      Total:
                    </span>
                    <span className="text-sm">{saranaData.total}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-sm font-medium text-muted-foreground min-w-[120px]">
                      Baik:
                    </span>
                    <span className="text-sm">{saranaData.baik}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-sm font-medium text-muted-foreground min-w-[120px]">
                      Rusak:
                    </span>
                    <span className="text-sm">{saranaData.rusak}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-sm font-medium text-muted-foreground min-w-[120px]">
                      Keterangan:
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {saranaData.keterangan || '-'}
                    </span>
                  </div>
                </div>
              ),
            )}
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
