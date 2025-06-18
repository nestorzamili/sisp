import {
  ReviewStatus,
  StatusGuru,
  JenisKelamin,
  JenisRuangan,
} from '@prisma/client';

export interface DashboardStats {
  totalSekolahTerdaftar: number;
  sekolahMenungguApproval: number;
  sekolahFormulirSelesai: number;
  sekolahMenungguReview: number;
}

export interface SekolahStats {
  status: ReviewStatus;
  count: number;
}

export interface SaranaStats {
  jenis: JenisRuangan;
  jumlah: number;
}

export interface PrasaranaStats {
  jenis: JenisRuangan;
  jumlah: number;
}

export interface GuruStats {
  status: StatusGuru;
  jenisKelamin: JenisKelamin;
  jumlah: number;
}

export interface SiswaStats {
  tingkatan: string;
  jenisKelamin: JenisKelamin;
  jumlah: number;
}

export interface RecentSekolah {
  id: string;
  namaSekolah: string;
  npsn: string;
  status: ReviewStatus;
  createdAt: Date;
  userEmail: string;
}

export interface PendingReview {
  id: string;
  namaSekolah: string;
  npsn: string;
  createdAt: Date;
  updatedAt: Date;
  userEmail: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
}

export interface StackedChartData {
  tingkatan: string;
  L: number;
  P: number;
}

export interface StackedGuruData {
  status: string;
  L: number;
  P: number;
}
