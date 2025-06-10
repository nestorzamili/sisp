import { JenisKelamin } from '@prisma/client';

export { JenisKelamin } from '@prisma/client';

export interface CreateRombonganBelajarData {
  sekolahId: string;
  tingkatan_kelas: string;
  jenis_kelamin: JenisKelamin;
  jumlah_siswa: number;
  tahun_ajaran: string;
}

export interface UpdateRombonganBelajarData {
  tingkatan_kelas?: string;
  jenis_kelamin?: JenisKelamin;
  jumlah_siswa?: number;
  tahun_ajaran?: string;
}

export interface RombonganBelajarWithDetails {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  sekolahId: string;
  tingkatan_kelas: string;
  jenis_kelamin: JenisKelamin;
  jumlah_siswa: number;
  tahun_ajaran: string;
}

export interface RombonganBelajarFilters {
  sekolahId?: string;
  tingkatan_kelas?: string;
  jenis_kelamin?: JenisKelamin;
  tahun_ajaran?: string;
  limit?: number;
  offset?: number;
}

export interface RombonganBelajarServiceResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PaginatedRombonganBelajarResponse {
  rombonganBelajar: RombonganBelajarWithDetails[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface RombonganBelajarStatistics {
  totalSiswa: number;
  totalRombel: number;
  totalKelas7: number;
  totalKelas8: number;
  totalKelas9: number;
  totalLakiLaki: number;
  totalPerempuan: number;
}

export interface RombonganBelajarWhereInput {
  sekolahId?: string;
  tingkatan_kelas?: string;
  jenis_kelamin?: JenisKelamin;
  tahun_ajaran?: string;
}

export interface RombonganBelajarFormData {
  siswaKelas7Laki: number;
  siswaKelas7Perempuan: number;
  siswaKelas8Laki: number;
  siswaKelas8Perempuan: number;
  siswaKelas9Laki: number;
  siswaKelas9Perempuan: number;
  tahun_ajaran: string;
}
