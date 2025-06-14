'use client';

import { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { PendaftaranData } from '@/types/pendaftaran';

interface RejectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pendaftaran: PendaftaranData | null;
  onConfirm: (userId: string, reason: string) => Promise<void>;
}

export function RejectionDialog({
  open,
  onOpenChange,
  pendaftaran,
  onConfirm,
}: RejectionDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [reason, setReason] = useState('');

  const handleConfirm = async () => {
    if (!pendaftaran || !reason.trim()) return;

    setIsLoading(true);
    try {
      await onConfirm(pendaftaran.id, reason.trim());
      onOpenChange(false);
      setReason('');
    } catch (error) {
      console.error('Error rejecting pendaftaran:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setReason('');
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Tolak Pendaftaran
          </DialogTitle>
          <DialogDescription>
            Pendaftaran yang ditolak akan dihapus permanen dari sistem dan
            notifikasi akan dikirim ke user.
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
            <div className="space-y-2">
              <Label htmlFor="reason">
                Alasan Penolakan <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="reason"
                placeholder="Jelaskan alasan penolakan pendaftaran..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="min-h-[100px]"
                maxLength={500}
              />
              <div className="text-xs text-muted-foreground text-right">
                {reason.length}/500 karakter
              </div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-800">
                <strong>Peringatan:</strong> Tindakan ini tidak dapat
                dibatalkan. Data user dan sekolah akan dihapus permanen dari
                sistem.
              </p>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={isLoading}
          >
            <X className="h-4 w-4 mr-2" />
            Batal
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isLoading || !reason.trim()}
            variant="destructive"
          >
            {isLoading ? (
              'Memproses...'
            ) : (
              <>
                <AlertTriangle className="h-4 w-4 mr-2" />
                Tolak Pendaftaran
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
