import { FileText, Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SekolahWithDetails } from '@/types/sekolah';

interface LampiranTabProps {
  data: SekolahWithDetails;
}

export function LampiranTab({ data }: LampiranTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Lampiran ({data.lampiran?.length || 0})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {data.lampiran && data.lampiran.length > 0 ? (
          <div className="space-y-4">
            {data.lampiran.map((lampiran) => (
              <div
                key={lampiran.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                {' '}
                <div className="space-y-1">
                  <p className="font-medium">{lampiran.nama_dokumen}</p>
                  {lampiran.keterangan && (
                    <p className="text-sm text-muted-foreground">
                      {lampiran.keterangan}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(lampiran.url, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Lihat
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = lampiran.url;
                      link.download = lampiran.nama_dokumen;
                      link.click();
                    }}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Unduh
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-8">
            Belum ada lampiran
          </p>
        )}
      </CardContent>
    </Card>
  );
}
