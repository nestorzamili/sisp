import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Send } from 'lucide-react';

interface ConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export function ConfirmationDialog({
  open,
  onOpenChange,
  onConfirm,
  isLoading = false,
}: ConfirmationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-w-[95vw]">
        {' '}
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Send className="w-5 h-5 text-blue-600" />
            Konfirmasi Pengiriman Data
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <p className="font-medium text-blue-900">
                  Data akan dikirim untuk direview oleh admin
                </p>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>
                    • Data Anda akan diperiksa dan diverifikasi oleh tim Dinas
                    Pendidikan
                  </li>
                  <li>• Proses review biasanya memakan waktu 1-3 hari kerja</li>
                  <li>
                    • Selama menunggu persetujuan, data masih dapat diubah jika
                    diperlukan
                  </li>
                  <li>
                    • Anda akan mendapat notifikasi melalui email setelah data
                    disetujui
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Pastikan semua data yang Anda masukkan sudah benar dan lengkap
            sebelum mengirim.
          </p>
        </div>
        <DialogFooter className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Batal
          </Button>
          <Button onClick={onConfirm} disabled={isLoading}>
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Mengirim...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Kirim Data
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
