import { BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SekolahWithDetails } from '@/types/sekolah';

interface RombelTabProps {
  data: SekolahWithDetails;
}

export function RombelTab({ data }: RombelTabProps) {
  // Helper function to format gender
  const formatGender = (gender: string) => {
    return gender === 'L' ? 'Laki-laki' : gender === 'P' ? 'Perempuan' : gender;
  };

  // Helper function to convert number to roman numeral
  const convertToRoman = (num: string) => {
    const arabicToRoman: { [key: string]: string } = {
      '1': 'I',
      '2': 'II',
      '3': 'III',
      '4': 'IV',
      '5': 'V',
      '6': 'VI',
      '7': 'VII',
      '8': 'VIII',
      '9': 'IX',
      '10': 'X',
      '11': 'XI',
      '12': 'XII',
    };
    return arabicToRoman[num] || num;
  };

  // Helper function to group rombel by tingkatan
  const groupRombelByTingkatan = (rombelData: typeof data.rombonganBelajar) => {
    if (!rombelData) return {};

    const grouped = rombelData.reduce(
      (acc, rombel) => {
        const tingkatan = rombel.tingkatan_kelas;
        if (!acc[tingkatan]) {
          acc[tingkatan] = {};
        }
        const gender = formatGender(rombel.jenis_kelamin);
        acc[tingkatan][gender] =
          (acc[tingkatan][gender] || 0) + rombel.jumlah_siswa;
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
          <BookOpen className="h-5 w-5" />
          Rombongan Belajar ({data.rombonganBelajar?.length || 0})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {data.rombonganBelajar && data.rombonganBelajar.length > 0 ? (
          <div className="space-y-4">
            {Object.entries(groupRombelByTingkatan(data.rombonganBelajar)).map(
              ([tingkatan, genderData]) => (
                <div
                  key={tingkatan}
                  className="p-4 border rounded-lg space-y-2"
                >
                  <div className="flex items-start gap-2">
                    <span className="text-sm font-medium">
                      Kelas {convertToRoman(tingkatan)}
                    </span>
                  </div>
                  {Object.entries(genderData).map(([gender, jumlah]) => (
                    <div key={gender} className="flex items-start gap-2">
                      <span className="text-sm font-medium text-muted-foreground min-w-[120px]">
                        {gender}:
                      </span>
                      <span className="text-sm">{jumlah} siswa</span>
                    </div>
                  ))}
                </div>
              ),
            )}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-8">
            Belum ada data rombongan belajar
          </p>
        )}
      </CardContent>
    </Card>
  );
}
