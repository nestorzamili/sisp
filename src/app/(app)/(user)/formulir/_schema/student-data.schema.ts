import { z } from 'zod';
import { FormulirCompleteData } from '@/types/formulir.types';

export const step3Schema = z.object({
  siswaKelas7Laki: z.number().min(0, 'Jumlah tidak boleh negatif'),
  siswaKelas7Perempuan: z.number().min(0, 'Jumlah tidak boleh negatif'),
  siswaKelas8Laki: z.number().min(0, 'Jumlah tidak boleh negatif'),
  siswaKelas8Perempuan: z.number().min(0, 'Jumlah tidak boleh negatif'),
  siswaKelas9Laki: z.number().min(0, 'Jumlah tidak boleh negatif'),
  siswaKelas9Perempuan: z.number().min(0, 'Jumlah tidak boleh negatif'),
});

export type Step3Data = z.infer<typeof step3Schema>;

export function getStep3InitialData(
  completeData: FormulirCompleteData | null,
): Step3Data {
  return {
    siswaKelas7Laki:
      completeData?.rombonganBelajar.find(
        (rb) => rb.tingkatan_kelas === '7' && rb.jenis_kelamin === 'L',
      )?.jumlah_siswa || 0,
    siswaKelas7Perempuan:
      completeData?.rombonganBelajar.find(
        (rb) => rb.tingkatan_kelas === '7' && rb.jenis_kelamin === 'P',
      )?.jumlah_siswa || 0,
    siswaKelas8Laki:
      completeData?.rombonganBelajar.find(
        (rb) => rb.tingkatan_kelas === '8' && rb.jenis_kelamin === 'L',
      )?.jumlah_siswa || 0,
    siswaKelas8Perempuan:
      completeData?.rombonganBelajar.find(
        (rb) => rb.tingkatan_kelas === '8' && rb.jenis_kelamin === 'P',
      )?.jumlah_siswa || 0,
    siswaKelas9Laki:
      completeData?.rombonganBelajar.find(
        (rb) => rb.tingkatan_kelas === '9' && rb.jenis_kelamin === 'L',
      )?.jumlah_siswa || 0,
    siswaKelas9Perempuan:
      completeData?.rombonganBelajar.find(
        (rb) => rb.tingkatan_kelas === '9' && rb.jenis_kelamin === 'P',
      )?.jumlah_siswa || 0,
  };
}
