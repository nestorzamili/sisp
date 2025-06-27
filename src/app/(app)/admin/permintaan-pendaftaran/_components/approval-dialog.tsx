'use client';

import { useState } from 'react';
import { Check, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PendaftaranData } from '@/types/pendaftaran';
import logger from '@/lib/logger';

interface ApprovalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pendaftaran: PendaftaranData | null;
  onConfirm: (userId: string) => Promise<void>;
}

export function ApprovalDialog({
  open,
  onOpenChange,
  pendaftaran,
  onConfirm,
}: ApprovalDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    if (!pendaftaran) return;

    setIsLoading(true);
    try {
      await onConfirm(pendaftaran.id);
      onOpenChange(false);
    } catch (error) {
      logger.error('Error approving pendaftaran:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-green-600">
            <Check className="h-5 w-5" />
            Setujui Pendaftaran
          </DialogTitle>
          <DialogDescription>
            Apakah Anda yakin ingin menyetujui pendaftaran berikut?
          </DialogDescription>
        </DialogHeader>

        {pendaftaran && (
          <div className="space-y-4">
            {' '}
            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              {' '}
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="font-medium text-muted-foreground">
                    Nama Sekolah:
                  </span>
                  <div className="font-medium">{pendaftaran.nama_sekolah}</div>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">
                    NPSN:
                  </span>
                  <div className="font-medium">{pendaftaran.npsn}</div>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">
                    Email:
                  </span>
                  <div className="font-medium">{pendaftaran.email}</div>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">
                    Telepon:
                  </span>
                  <div className="font-medium">{pendaftaran.phone || '-'}</div>
                </div>
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-sm text-green-800">
                Setelah disetujui, user akan dapat mengakses sistem dan
                notifikasi akan dikirim melalui email dan WhatsApp (jika nomor
                telepon tersedia).
              </p>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            <X className="h-4 w-4 mr-2" />
            Batal
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-700"
          >
            {isLoading ? (
              'Memproses...'
            ) : (
              <>
                <Check className="h-4 w-4 mr-2" />
                Setuju
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
