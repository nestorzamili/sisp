import { StatusGuru, JenisKelamin } from '@prisma/client';

export { StatusGuru, JenisKelamin } from '@prisma/client';

export interface CreateGuruData {
  sekolahId: string;
  status_guru: StatusGuru;
  jenis_kelamin: JenisKelamin;
  jumlah: number;
  tahun_ajaran: string;
}

export interface UpdateGuruData {
  status_guru?: StatusGuru;
  jenis_kelamin?: JenisKelamin;
  jumlah?: number;
  tahun_ajaran?: string;
}

export interface GuruWithDetails {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  sekolahId: string;
  status_guru: StatusGuru;
  jenis_kelamin: JenisKelamin;
  jumlah: number;
  tahun_ajaran: string;
}

export interface GuruFilters {
  sekolahId?: string;
  status_guru?: StatusGuru;
  jenis_kelamin?: JenisKelamin;
  tahun_ajaran?: string;
  limit?: number;
  offset?: number;
}

export interface GuruServiceResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PaginatedGuruResponse {
  guru: GuruWithDetails[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GuruStatistics {
  totalGuru: number;
  totalPNS: number;
  totalPPPK: number;
  totalHonorer: number;
  totalLakiLaki: number;
  totalPerempuan: number;
}

export interface GuruWhereInput {
  sekolahId?: string;
  status_guru?: StatusGuru;
  jenis_kelamin?: JenisKelamin;
  tahun_ajaran?: string;
}

export interface GuruFormData {
  guruPnsLaki: number;
  guruPnsPerempuan: number;
  guruPpppLaki: number;
  guruPpppPerempuan: number;
  guruGttLaki: number;
  guruGttPerempuan: number;
  tahun_ajaran: string;
}
