import { z } from 'zod';
import { FormulirCompleteData } from '@/types/formulir.types';

export const step1Schema = z.object({
  namaSekolah: z.string().min(1, 'Nama sekolah harus diisi'),
  npsn: z.string().min(1, 'NPSN harus diisi'),
  namaKepalaSekolah: z.string().min(1, 'Nama kepala sekolah harus diisi'),
  nipKepalaSekolah: z.string().min(1, 'NIP kepala sekolah harus diisi'),
  alamatSekolah: z.string().min(1, 'Alamat sekolah harus diisi'),
  kecamatan: z.string().min(1, 'Kecamatan harus diisi'),
});

export type Step1Data = z.infer<typeof step1Schema>;

export function getStep1InitialData(
  completeData: FormulirCompleteData | null,
): Step1Data {
  return {
    namaSekolah: completeData?.sekolah.nama_sekolah || '',
    npsn: completeData?.sekolah.npsn || '',
    namaKepalaSekolah: completeData?.sekolah.nama_kepala_sekolah || '',
    nipKepalaSekolah: completeData?.sekolah.nip_kepala_sekolah || '',
    alamatSekolah: completeData?.sekolah.alamat_sekolah || '',
    kecamatan: completeData?.sekolah.kecamatan || '',
  };
}
