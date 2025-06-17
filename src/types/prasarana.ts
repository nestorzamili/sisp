import type { JenisRuangan } from '@prisma/client';

export interface Prasarana {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  sekolahId: string;
  jenis_prasarana: JenisRuangan;
  nama_prasarana: string;
  jumlah_total: number;
  jumlah_kondisi_baik: number;
  jumlah_kondisi_rusak: number;
  keterangan: string | null;
  tahun_ajaran: string;
}

export interface PrasaranaFormData {
  mejaKursiSiswaTotal: number;
  mejaKursiSiswaBaik: number;
  mejaKursiSiswaRusak: number;
  mejaKursiSiswaKeterangan?: string;
  komputerTotal: number;
  komputerBaik: number;
  komputerRusak: number;
  komputerKeterangan?: string;
  toiletSiswaTotal: number;
  toiletSiswaBaik: number;
  toiletSiswaRusak: number;
  toiletSiswaKeterangan?: string;
  toiletGuruTotal: number;
  toiletGuruBaik: number;
  toiletGuruRusak: number;
  toiletGuruKeterangan?: string;
  prasaranaLainnya?: {
    nama: string;
    jumlah: number;
    kondisi: string;
    keterangan?: string;
  }[];
  tahun_ajaran: string;
}

export interface CreatePrasaranaData {
  sekolahId: string;
  jenis_prasarana: JenisRuangan;
  nama_prasarana: string;
  jumlah_total: number;
  jumlah_kondisi_baik: number;
  jumlah_kondisi_rusak: number;
  keterangan?: string | null;
  tahun_ajaran: string;
}

export interface UpdatePrasaranaData extends Partial<CreatePrasaranaData> {
  id: string;
}

export interface PrasaranaServiceResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
