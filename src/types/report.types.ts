// Report Types for School Data
export interface ReportSekolahData {
  id: string;
  nama_sekolah: string;
  npsn: string;
  kecamatan: string | null;
  nama_kepala_sekolah: string | null;
  nip_kepala_sekolah: string | null;
  alamat_sekolah: string | null;
  status: 'DRAFT' | 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface ReportGuruStats {
  pns: {
    laki: number;
    perempuan: number;
    total: number;
  };
  pppk: {
    laki: number;
    perempuan: number;
    total: number;
  };
  honorer: {
    laki: number;
    perempuan: number;
    total: number;
  };
  totalSemua: number;
}

export interface ReportSiswaStats {
  kelas7: {
    laki: number;
    perempuan: number;
    total: number;
  };
  kelas8: {
    laki: number;
    perempuan: number;
    total: number;
  };
  kelas9: {
    laki: number;
    perempuan: number;
    total: number;
  };
  totalSemua: number;
}

export interface ReportSaranaStats {
  kondisiBaik: number;
  kondisiRusak: number;
  total: number;
  persentaseBaik: number;
  persentaseRusak: number;
}

export interface ReportPrasaranaStats {
  kondisiBaik: number;
  kondisiRusak: number;
  total: number;
  persentaseBaik: number;
  persentaseRusak: number;
}

export interface ReportSekolahItem {
  sekolah: ReportSekolahData;
  guru: ReportGuruStats;
  siswa: ReportSiswaStats;
  sarana: ReportSaranaStats;
  prasarana: ReportPrasaranaStats;
}

export interface ReportSummary {
  totalSekolah: number;
  totalGuru: number;
  totalSiswa: number;
  totalSarana: number;
  totalPrasarana: number;
  sekolahByStatus: {
    draft: number;
    pending: number;
    approved: number;
    rejected: number;
  };
  sekolahByKecamatan: Record<string, number>;
}

export interface ReportData {
  summary: ReportSummary;
  sekolahList: ReportSekolahItem[];
  generatedAt: Date;
}

// Filter options for generating reports
export interface ReportFilters {
  kecamatan?: string[];
}

// Export options for different formats
export interface ReportExportOptions {
  format: 'PDF' | 'EXCEL';
  includeCharts?: boolean;
  includeDetails?: boolean;
  filename?: string;
}

// Detailed breakdown for advanced reports
export interface DetailedSaranaReport {
  jenisRuangan: string;
  namaRuangan: string;
  kondisiBaik: number;
  kondisiRusak: number;
  total: number;
  keterangan?: string;
}

export interface DetailedPrasaranaReport {
  jenisPrasarana: string;
  namaPrasarana: string;
  kondisiBaik: number;
  kondisiRusak: number;
  total: number;
  keterangan?: string;
}

export interface DetailedReportSekolahItem extends ReportSekolahItem {
  detailedSarana: DetailedSaranaReport[];
  detailedPrasarana: DetailedPrasaranaReport[];
}

export interface DetailedReportData extends ReportData {
  sekolahList: DetailedReportSekolahItem[];
}
