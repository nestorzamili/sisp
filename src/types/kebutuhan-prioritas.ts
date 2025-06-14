import { JenisKebutuhan } from '@prisma/client';

// Base interface for KebutuhanPrioritas from Prisma
export interface KebutuhanPrioritas {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  sekolahId: string;
  jenis: JenisKebutuhan;
  penjelasan: string;
  tahun_ajaran: string;
}

// Data for creating new KebutuhanPrioritas
export interface CreateKebutuhanPrioritasData {
  sekolahId: string;
  jenis: JenisKebutuhan;
  penjelasan: string;
  tahun_ajaran: string;
}

// Form data structure for priority needs
export interface KebutuhanPrioritasFormData {
  kebutuhanPrioritas: string;
  tahun_ajaran: string;
}

// Service response type
export interface KebutuhanPrioritasServiceResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
