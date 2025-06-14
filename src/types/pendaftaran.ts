export interface PendaftaranData {
  id: string;
  name: string;
  email: string;
  banned: boolean;
  banReason?: string | null;
  npsn: string;
  phone?: string | null;
  nama_sekolah: string;
  createdAt: Date;
}

export interface PendaftaranServiceResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PendaftaranPaginationParams {
  page: number;
  pageSize: number;
  search?: string;
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
}

export interface PendaftaranPaginationResult {
  data: PendaftaranData[];
  pagination: {
    totalCount: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
