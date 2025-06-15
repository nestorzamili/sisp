import {
  JenisRuangan,
  JenisKebutuhan,
  StatusGuru,
  JenisKelamin,
  ReviewStatus,
} from '@prisma/client';

export {
  JenisRuangan,
  JenisKebutuhan,
  StatusGuru,
  JenisKelamin,
  ReviewStatus,
} from '@prisma/client';

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
  status: ReviewStatus;
  reviewedAt: Date | null;
  reviewedById: string | null;
  reviewNotes: string | null;
  user?: {
    id: string;
    name: string;
    email: string;
  };
  reviewedBy?: {
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
    keterangan: string;
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

export interface SekolahWhereInput {
  id?: { not?: string };
  nama_sekolah?: { contains: string; mode: 'insensitive' };
  npsn?: string | { contains: string; mode: 'insensitive' };
  kecamatan?: { contains: string; mode: 'insensitive' };
  user?: {
    banned?: boolean;
    OR?: Array<{
      name?: { contains: string; mode: 'insensitive' };
      email?: { contains: string; mode: 'insensitive' };
      banned?: boolean;
    }>;
  };
  OR?: Array<{
    nama_sekolah?: { contains: string; mode: 'insensitive' };
    npsn?: { contains: string; mode: 'insensitive' };
    nama_kepala_sekolah?: { contains: string; mode: 'insensitive' };
    alamat_sekolah?: { contains: string; mode: 'insensitive' };
    kecamatan?: { contains: string; mode: 'insensitive' };
    phone?: { contains: string; mode: 'insensitive' };
    user?: {
      OR?: Array<{
        name?: { contains: string; mode: 'insensitive' };
        email?: { contains: string; mode: 'insensitive' };
        banned?: boolean;
      }>;
    };
  }>;
}

export interface SekolahPaginationParams {
  page?: number;
  pageSize?: number;
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
  search?: string;
  kecamatan?: string;
  nama_sekolah?: string;
  npsn?: string;
  includeDetails?: boolean;
  userBanned?: boolean; // Filter untuk status approval (banned = pending, !banned = approved)
}

export interface SekolahPaginationResult {
  sekolah: SekolahWithDetails[];
  pagination: {
    totalCount: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
}

export interface CreateSekolahData {
  nama_sekolah: string;
  npsn: string;
  nama_kepala_sekolah?: string;
  nip_kepala_sekolah?: string;
  alamat_sekolah?: string;
  kecamatan?: string;
  phone?: string;
  userId: string;
  email?: string; // For direct email field if schema is updated
  banned?: boolean; // For direct banned field if schema is updated
}

export interface UpdateSekolahData {
  nama_sekolah?: string;
  npsn?: string;
  nama_kepala_sekolah?: string;
  nip_kepala_sekolah?: string;
  alamat_sekolah?: string;
  kecamatan?: string;
  phone?: string;
  status?: ReviewStatus;
}
