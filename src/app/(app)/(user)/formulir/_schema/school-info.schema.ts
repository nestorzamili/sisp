import { z } from 'zod';

export const step1Schema = z.object({
  namaSekolah: z.string().min(1, 'Nama sekolah harus diisi'),
  npsn: z.string().min(8, 'NPSN harus 8 digit').max(8, 'NPSN harus 8 digit'),
  namaKepalaSekolah: z.string().min(1, 'Nama kepala sekolah harus diisi'),
  nipKepalaSekolah: z
    .string()
    .min(18, 'NIP harus 18 digit')
    .max(18, 'NIP harus 18 digit'),
  alamatSekolah: z.string().min(1, 'Alamat sekolah harus diisi'),
  kecamatan: z.string().min(1, 'Kecamatan harus dipilih'),
});

// Schema for existing data (allows empty strings for incomplete data)
export const existingSchoolDataSchema = z.object({
  namaSekolah: z.string(),
  npsn: z.string(),
  namaKepalaSekolah: z.string(),
  nipKepalaSekolah: z.string(),
  alamatSekolah: z.string(),
  kecamatan: z.string(),
});

export type Step1Data = z.infer<typeof step1Schema>;
export type ExistingSchoolData = z.infer<typeof existingSchoolDataSchema>;
