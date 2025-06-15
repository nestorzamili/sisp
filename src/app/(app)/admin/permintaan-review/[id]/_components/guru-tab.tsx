'use client';

import { Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SekolahWithDetails } from '@/types/sekolah';

interface GuruTabProps {
  data: SekolahWithDetails;
}

export function GuruTab({ data }: GuruTabProps) {
  // Helper function to format gender
  const formatGender = (gender: string) => {
    return gender === 'L' ? 'Laki-laki' : gender === 'P' ? 'Perempuan' : gender;
  };

  // Helper function to group guru by status
  const groupGuruByStatus = (guruData: typeof data.guru) => {
    if (!guruData) return {};

    const grouped = guruData.reduce(
      (acc, guru) => {
        const status = guru.status_guru;
        if (!acc[status]) {
          acc[status] = {};
        }
        const gender = formatGender(guru.jenis_kelamin);
        acc[status][gender] = (acc[status][gender] || 0) + guru.jumlah;
        return acc;
      },
      {} as Record<string, Record<string, number>>,
    );

    return grouped;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Data Guru ({data.guru?.length || 0})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {data.guru && data.guru.length > 0 ? (
          <div className="space-y-4">
            {Object.entries(groupGuruByStatus(data.guru)).map(
              ([status, genderData]) => (
                <div key={status} className="p-4 border rounded-lg space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-sm font-medium">{status}</span>
                  </div>
                  {Object.entries(genderData).map(([gender, jumlah]) => (
                    <div key={gender} className="flex items-start gap-2">
                      <span className="text-sm font-medium text-muted-foreground min-w-[120px]">
                        {gender}:
                      </span>
                      <span className="text-sm">{jumlah}</span>
                    </div>
                  ))}
                </div>
              ),
            )}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-8">
            Belum ada data guru
          </p>
        )}
      </CardContent>
    </Card>
  );
}
