export interface Lampiran {
  id: string;
  createdAt: Date;
  sekolahId: string;
  nama_dokumen: string;
  url: string;
  keterangan: string;
}

export interface CreateLampiranData {
  nama_dokumen: string;
  url: string;
  keterangan: string;
}

export interface LampiranFormData {
  nama_dokumen: string;
  url: string;
  keterangan: string;
  file?: File; // For form handling
}

export interface UploadResponse {
  success: boolean;
  url?: string;
  publicId?: string;
  fileType?: 'image' | 'pdf';
  originalFilename?: string;
  size?: number;
  format?: string;
  error?: string;
}
