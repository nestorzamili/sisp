'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Download } from 'lucide-react';
import { toast } from 'sonner';
import { generateSekolahReport } from '../action';
import { downloadSekolahReportPDF } from '@/lib/pdf-utils';
import { KECAMATAN_LIST } from '@/constants/kecamatan';

export function DownloadReportButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedKecamatan, setSelectedKecamatan] = useState<string[]>([]);

  const handleKecamatanToggle = (kecamatan: string) => {
    setSelectedKecamatan((prev) =>
      prev.includes(kecamatan)
        ? prev.filter((k) => k !== kecamatan)
        : [...prev, kecamatan],
    );
  };

  const selectAllKecamatan = () => {
    setSelectedKecamatan([...KECAMATAN_LIST]);
  };

  const clearFilters = () => {
    setSelectedKecamatan([]);
  };

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const result = await generateSekolahReport({
        kecamatan: selectedKecamatan.length > 0 ? selectedKecamatan : undefined,
      });

      if (result.success && result.data) {
        await downloadSekolahReportPDF(result.data);
        toast.success('Laporan berhasil diunduh');
        setIsOpen(false);
      } else {
        toast.error(result.error || 'Gagal mengunduh laporan');
      }
    } catch (error) {
      console.error('Error downloading report:', error);
      toast.error('Terjadi kesalahan saat mengunduh laporan');
    } finally {
      setIsLoading(false);
    }
  };

  // Sort kecamatan ASC dan bagi ke 4 kolom secara vertikal
  const sortedKecamatan = [...KECAMATAN_LIST].sort((a, b) =>
    a.localeCompare(b),
  );
  const colCount = 4;
  const rowsPerCol = Math.ceil(sortedKecamatan.length / colCount);
  const kecamatanColumns = Array.from({ length: colCount }, (_, colIdx) =>
    sortedKecamatan.slice(colIdx * rowsPerCol, (colIdx + 1) * rowsPerCol),
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          Unduh Laporan
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Unduh Laporan Data Sekolah</DialogTitle>
          <DialogDescription>
            Pilih filter untuk laporan data sekolah yang akan diunduh. Laporan
            akan berisi data sekolah yang sudah disetujui.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Kecamatan Filter */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">
                Filter Kecamatan (Opsional)
              </label>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={selectAllKecamatan}
                  type="button"
                >
                  Pilih Semua
                </Button>
                {selectedKecamatan.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearFilters}
                    type="button"
                  >
                    Hapus Semua
                  </Button>
                )}
              </div>
            </div>

            <div className="max-h-[38rem] overflow-y-auto border rounded-md p-4">
              <div className="grid grid-cols-4 gap-3">
                {kecamatanColumns.map((col, colIdx) => (
                  <div key={colIdx} className="flex flex-col gap-2">
                    {col.map((kecamatan) => (
                      <div
                        key={kecamatan}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={kecamatan}
                          checked={selectedKecamatan.includes(kecamatan)}
                          onCheckedChange={() =>
                            handleKecamatanToggle(kecamatan)
                          }
                        />
                        <label
                          htmlFor={kecamatan}
                          className="text-sm font-normal cursor-pointer leading-tight"
                        >
                          {kecamatan}
                        </label>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {selectedKecamatan.length > 0 && (
              <p className="text-sm text-muted-foreground">
                {selectedKecamatan.length} kecamatan dipilih
              </p>
            )}
          </div>

          {/* Download Button */}
          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
              disabled={isLoading}
            >
              Batal
            </Button>
            <Button
              onClick={handleDownload}
              disabled={isLoading}
              className="flex-1 gap-2"
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Mengunduh...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  Unduh
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
