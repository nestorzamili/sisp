import { ReviewStatus } from '@prisma/client';

export { ReviewStatus } from '@prisma/client';

export interface ReviewData {
  id: string;
  nama_sekolah: string;
  npsn: string;
  nama_kepala_sekolah: string | null;
  alamat_sekolah: string | null;
  kecamatan: string | null;
  phone: string | null;
  status: ReviewStatus;
  createdAt: Date;
  updatedAt: Date;
  reviewedAt: Date | null;
  reviewedById: string | null;
  reviewNotes: string | null;
  user: {
    id: string;
    name: string;
    email: string;
  };
  reviewedBy?: {
    id: string;
    name: string;
    email: string;
  } | null;
}

export interface ReviewServiceResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface ReviewPaginationParams {
  page?: number;
  pageSize?: number;
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
  search?: string;
}

export interface ReviewPaginationResult {
  reviews: ReviewData[];
  pagination: {
    totalCount: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
}

export interface ReviewHistoryItem {
  id: string;
  status: ReviewStatus;
  reviewedAt: Date | null;
  reviewNotes: string | null;
  reviewedBy: {
    id: string;
    name: string;
    email: string;
  } | null;
}

export interface ReviewStats {
  pending: number;
  approved: number;
  rejected: number;
  draft: number;
}

export interface ReviewAction {
  action: 'approve' | 'request_revision';
  notes?: string;
}
