'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getSekolahDetail } from '../action';
import { SekolahWithDetails } from '@/types/sekolah';
import { Calendar, MapPin, Phone, User, Building } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface SekolahDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sekolahId: string | null;
}

export function SekolahDetailDialog({
  open,
  onOpenChange,
  sekolahId,
}: SekolahDetailDialogProps) {
  const [sekolah, setSekolah] = useState<SekolahWithDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSekolah = useCallback(async () => {
    if (!sekolahId || !open) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await getSekolahDetail(sekolahId);
      if (response.success) {
        setSekolah(response.data as SekolahWithDetails);
      } else {
        toast.error(response.error || 'Gagal mengambil detail sekolah');
      }
    } catch (error) {
      console.error('Error fetching sekolah details:', error);
      toast.error('Terjadi kesalahan saat mengambil detail sekolah');
    } finally {
      setIsLoading(false);
    }
  }, [sekolahId, open]);

  useEffect(() => {
    fetchSekolah();
  }, [fetchSekolah]);

  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => {
        setSekolah(null);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {isLoading
              ? 'Memuat...'
              : sekolah
                ? sekolah.nama_sekolah
                : 'Detail Sekolah'}
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <SekolahDetailSkeleton />
        ) : sekolah ? (
          <div className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Informasi Dasar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">NPSN</p>
                    <p className="font-medium">{sekolah.npsn}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Nama Sekolah
                    </p>
                    <p className="font-medium">{sekolah.nama_sekolah}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Kepala Sekolah
                    </p>
                    <p className="font-medium">
                      {sekolah.nama_kepala_sekolah || '-'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      NIP Kepala Sekolah
                    </p>
                    <p className="font-medium">
                      {sekolah.nip_kepala_sekolah || '-'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Kecamatan</p>
                    <p className="font-medium flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {sekolah.kecamatan || '-'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Telepon</p>
                    <p className="font-medium flex items-center">
                      <Phone className="h-4 w-4 mr-1" />
                      {sekolah.phone || '-'}
                    </p>
                  </div>
                </div>
                {sekolah.alamat_sekolah && (
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground">
                      Alamat Sekolah
                    </p>
                    <p className="font-medium">{sekolah.alamat_sekolah}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* User Information */}
            {sekolah.user && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Informasi User
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Nama User</p>
                      <p className="font-medium">{sekolah.user.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{sekolah.user.email}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Statistik Data</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                  <div className="text-center">
                    <Badge variant="outline" className="mb-2">
                      {sekolah.sarana?.length || 0}
                    </Badge>
                    <p className="text-sm text-muted-foreground">Sarana</p>
                  </div>
                  <div className="text-center">
                    <Badge variant="outline" className="mb-2">
                      {sekolah.prasarana?.length || 0}
                    </Badge>
                    <p className="text-sm text-muted-foreground">Prasarana</p>
                  </div>
                  <div className="text-center">
                    <Badge variant="outline" className="mb-2">
                      {sekolah.guru?.length || 0}
                    </Badge>
                    <p className="text-sm text-muted-foreground">Guru</p>
                  </div>
                  <div className="text-center">
                    <Badge variant="outline" className="mb-2">
                      {sekolah.rombonganBelajar?.length || 0}
                    </Badge>
                    <p className="text-sm text-muted-foreground">Rombel</p>
                  </div>
                  <div className="text-center">
                    <Badge variant="outline" className="mb-2">
                      {sekolah.kebutuhanPrioritas?.length || 0}
                    </Badge>
                    <p className="text-sm text-muted-foreground">Kebutuhan</p>
                  </div>
                  <div className="text-center">
                    <Badge variant="outline" className="mb-2">
                      {sekolah.lampiran?.length || 0}
                    </Badge>
                    <p className="text-sm text-muted-foreground">Lampiran</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dates */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Informasi Tanggal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Dibuat Pada</p>
                    <p className="font-medium">
                      {new Date(sekolah.createdAt).toLocaleDateString('id-ID', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Terakhir Diupdate
                    </p>
                    <p className="font-medium">
                      {new Date(sekolah.updatedAt).toLocaleDateString('id-ID', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="py-6 text-center">
            <p className="text-muted-foreground">
              Data sekolah tidak ditemukan
            </p>
          </div>
        )}

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Tutup</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function SekolahDetailSkeleton() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <Skeleton className="h-7 w-48" />
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i}>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-6 w-32" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <Skeleton className="h-7 w-40" />
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {[...Array(2)].map((_, i) => (
              <div key={i}>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-6 w-48" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
