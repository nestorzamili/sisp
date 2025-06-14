export interface HomeSekolahData {
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
  status: 'DRAFT' | 'PENDING' | 'APPROVED' | 'REJECTED';
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
  } | null;
  guru?: Array<{
    id: string;
    status_guru: string;
    jenis_kelamin: string;
    jumlah: number;
    tahun_ajaran: string;
  }>;
  rombonganBelajar?: Array<{
    id: string;
    tingkatan_kelas: string;
    jenis_kelamin: string;
    jumlah_siswa: number;
    tahun_ajaran: string;
  }>;
  sarana?: Array<{
    id: string;
    jenis_sarana: string;
    nama_sarana: string;
    jumlah_total: number;
    jumlah_kondisi_baik: number;
    jumlah_kondisi_rusak: number;
    tahun_ajaran: string;
  }>;
  prasarana?: Array<{
    id: string;
    jenis_prasarana: string;
    nama_prasarana: string;
    jumlah_total: number;
    jumlah_kondisi_baik: number;
    jumlah_kondisi_rusak: number;
    tahun_ajaran: string;
  }>;
}

export interface UserHomeData {
  user: {
    id: string;
    name: string;
    email: string;
  };
  sekolah?: HomeSekolahData | null;
}

export interface HomeDataResponse {
  success: boolean;
  data?: UserHomeData;
  error?: string;
}
