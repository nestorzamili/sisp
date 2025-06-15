'use client';

import { Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SekolahWithDetails } from '@/types/sekolah';

interface PrioritasTabProps {
  data: SekolahWithDetails;
}

export function PrioritasTab({ data }: PrioritasTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Kebutuhan Prioritas ({data.kebutuhanPrioritas?.length || 0})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {data.kebutuhanPrioritas && data.kebutuhanPrioritas.length > 0 ? (
          <div className="space-y-4">
            {data.kebutuhanPrioritas.map((prioritas) => (
              <div key={prioritas.id} className="p-4 border rounded-lg">
                {prioritas.penjelasan ? (
                  <p className="text-sm">{prioritas.penjelasan}</p>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Tidak ada penjelasan
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-8">
            Belum ada data kebutuhan prioritas
          </p>
        )}
      </CardContent>
    </Card>
  );
}
