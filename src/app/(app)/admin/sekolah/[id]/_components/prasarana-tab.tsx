import { Building2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
      </CardHeader>
      <CardContent>
        {data.prasarana && data.prasarana.length > 0 ? (
          <div className="space-y-4">
            {Object.entries(groupPrasaranaByName(data.prasarana)).map(
              ([name, prasaranaData]) => (
                <div key={name} className="p-4 border rounded-lg space-y-2">
                  <h4 className="text-sm font-medium">{name}</h4>
                  <div className="flex items-start gap-2">
                    <span className="text-sm font-medium text-muted-foreground min-w-[120px]">
                      Total:
                    </span>
                    <span className="text-sm">{prasaranaData.total}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-sm font-medium text-muted-foreground min-w-[120px]">
                      Baik:
                    </span>
                    <span className="text-sm">{prasaranaData.baik}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-sm font-medium text-muted-foreground min-w-[120px]">
                      Rusak:
                    </span>
                    <span className="text-sm">{prasaranaData.rusak}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-sm font-medium text-muted-foreground min-w-[120px]">
                      Keterangan:
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {prasaranaData.keterangan || '-'}
                    </span>
                  </div>
                </div>
              ),
            )}
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
