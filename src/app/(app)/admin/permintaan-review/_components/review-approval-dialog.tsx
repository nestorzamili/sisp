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
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ReviewData } from '@/types/review';

interface ReviewApprovalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  review: ReviewData | null;
  onConfirm: (sekolahId: string, notes?: string) => Promise<void>;
}

export function ReviewApprovalDialog({
  open,
  onOpenChange,
  review,
  onConfirm,
}: ReviewApprovalDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [notes, setNotes] = useState('');

  const handleConfirm = async () => {
    if (!review) return;

    setIsLoading(true);
    try {
      await onConfirm(review.id, notes.trim() || undefined);
      onOpenChange(false);
      setNotes('');
    } catch (error) {
      console.error('Error approving review:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setNotes('');
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-green-600">
            <Check className="h-5 w-5" />
            Setujui Review Data Sekolah
          </DialogTitle>
          <DialogDescription>
            Apakah Anda yakin ingin menyetujui data sekolah berikut?
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
                    Kecamatan:
                  </span>
                  <div className="font-medium">{review.kecamatan || '-'}</div>
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
              <Label htmlFor="notes">Catatan Review (Opsional)</Label>
              <Textarea
                id="notes"
                placeholder="Tambahkan catatan review jika diperlukan..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[80px]"
                maxLength={500}
              />
              <div className="text-xs text-muted-foreground text-right">
                {notes.length}/500 karakter
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-sm text-green-800">
                Setelah disetujui, data sekolah akan tercatat sebagai
                terverifikasi dan notifikasi akan dikirim ke user.
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
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-700"
          >
            {isLoading ? (
              'Memproses...'
            ) : (
              <>
                <Check className="h-4 w-4 mr-2" />
                Setujui
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
