import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

interface SuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SuccessDialog({ open, onOpenChange }: SuccessDialogProps) {
  const handleClose = () => {
    onOpenChange(false);
    // Refresh and redirect to home page
    window.location.href = '/home';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px] max-w-[95vw]">
        <DialogHeader>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <DialogTitle className="text-xl font-bold text-foreground text-left">
              Data Berhasil Disimpan!
            </DialogTitle>
          </div>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Terima kasih telah melengkapi seluruh data sarana dan prasarana
            sekolah beserta lampiran pendukung.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="space-y-2">
              <p className="font-medium text-green-900">Langkah Selanjutnya:</p>
              <ul className="text-sm text-green-800 space-y-1">
                <li>
                  • Data akan diverifikasi dan dianalisis oleh tim Dinas
                  Pendidikan
                </li>
                <li>
                  • Proses verifikasi biasanya memakan waktu 1-3 hari kerja
                </li>
                <li>
                  • Hasil analisis akan digunakan untuk menentukan prioritas
                  pembangunan
                </li>
                <li>
                  • Anda akan mendapat notifikasi melalui email setelah data
                  diverifikasi
                </li>
              </ul>
            </div>
          </div>
        </div>{' '}
        <DialogFooter>
          <Button onClick={handleClose} className="w-full">
            Tutup
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
