import { JenisRuangan } from '@prisma/client';

export { JenisRuangan } from '@prisma/client';

export interface SaranaInput {
  jenis_sarana: JenisRuangan;
  nama_sarana: string;
  jumlah_total: number;
  jumlah_kondisi_baik: number;
  jumlah_kondisi_rusak: number;
  keterangan?: string | null;
  tahun_ajaran: string;
}

export interface SaranaData extends SaranaInput {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  sekolahId: string;
  keterangan: string | null;
}

export interface SaranaServiceResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface SaranaFilters {
  search?: string;
  tahunAjaran?: string;
  jenisSarana?: JenisRuangan;
  kondisi?: 'baik' | 'rusak';
}

export interface SaranaStatistics {
  totalSarana: number;
  totalKondisiBaik: number;
  totalKondisiRusak: number;
  tahunAjaranTerbaru: string | null;
}

export interface CreateSaranaData {
  sekolahId: string;
  jenis_sarana: JenisRuangan;
  nama_sarana: string;
  jumlah_total: number;
  jumlah_kondisi_baik: number;
  jumlah_kondisi_rusak: number;
  keterangan?: string | null;
  tahun_ajaran: string;
}

export interface UpdateSaranaData {
  jenis_sarana?: JenisRuangan;
  nama_sarana?: string;
  jumlah_total?: number;
  jumlah_kondisi_baik?: number;
  jumlah_kondisi_rusak?: number;
  keterangan?: string | null;
  tahun_ajaran?: string;
}

export interface SaranaWithDetails extends SaranaData {
  sekolah?: {
    id: string;
    nama_sekolah: string;
    npsn: string;
  };
}
