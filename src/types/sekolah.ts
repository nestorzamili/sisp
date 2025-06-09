import {
  JenisRuangan,
  JenisKebutuhan,
  StatusGuru,
  JenisKelamin,
} from '@/generated/prisma';

export interface CreateSekolahData {
  nama_sekolah: string;
  npsn: string;
  userId: string;
  phone?: string;
  nama_kepala_sekolah?: string;
  nip_kepala_sekolah?: string;
  alamat_sekolah?: string;
  kecamatan?: string;
}

export interface UpdateSekolahData {
  nama_sekolah?: string;
  npsn?: string;
  phone?: string;
  nama_kepala_sekolah?: string;
  nip_kepala_sekolah?: string;
  alamat_sekolah?: string;
  kecamatan?: string;
}

export interface SekolahWithDetails {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  nama_sekolah: string;
  npsn: string;
  nama_kepala_sekolah: string | null;
  nip_kepala_sekolah: string | null;
  alamat_sekolah: string | null;
  kecamatan: string | null;
  phone: string | null;
  userId: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
  sarana?: {
    id: string;
    jenis_sarana: JenisRuangan;
    nama_sarana: string;
    jumlah_total: number;
    jumlah_kondisi_baik: number;
    jumlah_kondisi_rusak: number;
    tahun_ajaran: string;
    keterangan: string | null;
  }[];
  prasarana?: {
    id: string;
    jenis_prasarana: JenisRuangan;
    nama_prasarana: string;
    jumlah_total: number;
    jumlah_kondisi_baik: number;
    jumlah_kondisi_rusak: number;
    tahun_ajaran: string;
    keterangan: string | null;
  }[];
  kebutuhanPrioritas?: {
    id: string;
    jenis: JenisKebutuhan;
    penjelasan: string;
    tahun_ajaran: string;
  }[];
  lampiran?: {
    id: string;
    nama_dokumen: string;
    url: string;
  }[];
  guru?: {
    id: string;
    status_guru: StatusGuru;
    jenis_kelamin: JenisKelamin;
    jumlah: number;
    tahun_ajaran: string;
  }[];
  rombonganBelajar?: {
    id: string;
    tingkatan_kelas: string;
    jenis_kelamin: JenisKelamin;
    jumlah_siswa: number;
    tahun_ajaran: string;
  }[];
}

export interface SekolahFilters {
  nama_sekolah?: string;
  npsn?: string;
  kecamatan?: string;
  limit?: number;
  offset?: number;
}

export interface SekolahServiceResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PaginatedSekolahResponse {
  sekolah: SekolahWithDetails[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SekolahStatistics {
  totalSarana: number;
  totalPrasarana: number;
  totalGuru: number;
  totalSiswa: number;
  totalKebutuhanPrioritas: number;
  totalLampiran: number;
}
