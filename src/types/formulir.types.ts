export interface FormulirSekolahInfo {
  id: string;
  nama_sekolah: string;
  npsn: string;
  nama_kepala_sekolah: string | null;
  nip_kepala_sekolah: string | null;
  alamat_sekolah: string | null;
  kecamatan: string | null;
  phone: string | null;
  status: 'DRAFT' | 'PENDING' | 'APPROVED' | 'REJECTED';
  reviewNotes: string | null;
}

export interface FormulirGuru {
  id?: string;
  status_guru: 'PNS' | 'PPPK' | 'Honorer';
  jenis_kelamin: 'L' | 'P';
  jumlah: number;
}

export interface FormulirRombonganBelajar {
  id?: string;
  tingkatan_kelas: string;
  jenis_kelamin: 'L' | 'P';
  jumlah_siswa: number;
}

export interface FormulirSarana {
  id?: string;
  jenis_sarana:
    | 'RuangKepalaSekolah'
    | 'RuangGuru'
    | 'RuangKelas'
    | 'LaboratoriumIPA'
    | 'LaboratoriumBahasa'
    | 'LaboratoriumTIK'
    | 'AulaPertemuan'
    | 'Perpustakaan'
    | 'JambanGuru'
    | 'JambanSiswa'
    | 'MejaKursiSiswa'
    | 'Komputer'
    | 'PrasaranaLainnya';
  nama_sarana: string;
  jumlah_total: number;
  jumlah_kondisi_baik: number;
  jumlah_kondisi_rusak: number;
  keterangan?: string;
}

export interface FormulirPrasarana {
  id?: string;
  jenis_prasarana:
    | 'RuangKepalaSekolah'
    | 'RuangGuru'
    | 'RuangKelas'
    | 'LaboratoriumIPA'
    | 'LaboratoriumBahasa'
    | 'LaboratoriumTIK'
    | 'AulaPertemuan'
    | 'Perpustakaan'
    | 'JambanGuru'
    | 'JambanSiswa'
    | 'MejaKursiSiswa'
    | 'Komputer'
    | 'PrasaranaLainnya';
  nama_prasarana: string;
  jumlah_total: number;
  jumlah_kondisi_baik: number;
  jumlah_kondisi_rusak: number;
  keterangan?: string;
}

export interface FormulirKebutuhanPrioritas {
  id?: string;
  jenis: 'Sarana' | 'Prasarana';
  penjelasan: string;
}

export interface FormulirLampiran {
  id?: string;
  nama_dokumen: string;
  url: string;
  keterangan: string;
}

export interface FormulirCompleteData {
  sekolah: FormulirSekolahInfo;
  guru: FormulirGuru[];
  rombonganBelajar: FormulirRombonganBelajar[];
  sarana: FormulirSarana[];
  prasarana: FormulirPrasarana[];
  kebutuhanPrioritas: FormulirKebutuhanPrioritas[];
  lampiran: FormulirLampiran[];
}

export interface FormulirStepStatus {
  sekolahStatus: 'DRAFT' | 'PENDING' | 'APPROVED' | 'REJECTED';
  reviewNote: string | null;
  step1: boolean; // Informasi Sekolah
  step2: boolean; // Data Guru
  step3: boolean; // Data Siswa
  step4: boolean; // Data Sarana
  step5: boolean; // Data Prasarana
  step6: boolean; // Kebutuhan Prioritas
  step7: boolean; // Lampiran
  step8: boolean; // Review & Submit
}

export interface FormulirServiceResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

// Input types for saving data
export interface SaveSekolahInfoInput {
  nama_sekolah: string;
  npsn: string;
  nama_kepala_sekolah: string;
  nip_kepala_sekolah: string;
  alamat_sekolah: string;
  kecamatan: string;
  phone?: string;
}

export interface SaveGuruInput {
  dataGuru: FormulirGuru[];
}

export interface SaveRombonganBelajarInput {
  dataRombonganBelajar: FormulirRombonganBelajar[];
}

export interface SaveSaranaInput {
  dataSarana: FormulirSarana[];
}

export interface SavePrasaranaInput {
  dataPrasarana: FormulirPrasarana[];
}

export interface SaveKebutuhanPrioritasInput {
  dataKebutuhanPrioritas: FormulirKebutuhanPrioritas[];
}

export interface SaveLampiranInput {
  dataLampiran: FormulirLampiran[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SubmitForReviewInput {
  // No additional data needed, just change status to PENDING
}
