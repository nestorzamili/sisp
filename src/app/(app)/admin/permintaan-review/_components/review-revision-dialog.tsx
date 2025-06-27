'use client';

import { useState } from 'react';
import { Edit, X } from 'lucide-react';
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
import { ReviewData } from '@/types/review';
import logger from '@/lib/logger';

interface ReviewRevisionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  review: ReviewData | null;
  onConfirm: (sekolahId: string, reason: string) => Promise<void>;
}

export function ReviewRevisionDialog({
  open,
  onOpenChange,
  review,
  onConfirm,
}: ReviewRevisionDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [reason, setReason] = useState('');

  const handleConfirm = async () => {
    if (!review || !reason.trim()) return;

    setIsLoading(true);
    try {
      await onConfirm(review.id, reason.trim());
      onOpenChange(false);
      setReason('');
    } catch (error) {
      logger.error('Error requesting revision:', error);
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
          <DialogTitle className="flex items-center gap-2 text-orange-600">
            <Edit className="h-5 w-5" />
            Minta Revisi Data Sekolah
          </DialogTitle>
          <DialogDescription>
            Data akan dikembalikan ke user untuk diperbaiki sesuai catatan yang
            Anda berikan.
          </DialogDescription>
        </DialogHeader>

        {review && (
          <div className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="font-medium text-muted-foreground">
                    Nama Sekolah:
                  </span>
                  <div className="font-medium">{review.nama_sekolah}</div>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">
                    NPSN:
                  </span>
                  <div className="font-medium">{review.npsn}</div>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">
                    Kepala Sekolah:
                  </span>
                  <div className="font-medium">
                    {review.nama_kepala_sekolah || '-'}
                  </div>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">
                    Telepon:
                  </span>
                  <div className="font-medium">{review.phone || '-'}</div>
                </div>
                <div className="col-span-2">
                  <span className="font-medium text-muted-foreground">
                    Alamat:
                  </span>
                  <div className="font-medium">
                    {review.alamat_sekolah || '-'}
                  </div>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">
                    Email User:
                  </span>
                  <div className="font-medium">{review.user.email}</div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">
                Catatan Revisi <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="reason"
                placeholder="Jelaskan dengan detail bagian mana yang perlu diperbaiki..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="min-h-[120px]"
                maxLength={1000}
              />
              <div className="text-xs text-muted-foreground text-right">
                {reason.length}/1000 karakter
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
              <p className="text-sm text-orange-800">
                <strong>Catatan:</strong> Data akan dikembalikan ke status draft
                dan user akan menerima notifikasi untuk melakukan perbaikan
                sesuai catatan yang Anda berikan.
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
            className="bg-orange-600 hover:bg-orange-700"
          >
            {isLoading ? (
              'Memproses...'
            ) : (
              <>
                <Edit className="h-4 w-4 mr-2" />
                Kirim Revisi
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
