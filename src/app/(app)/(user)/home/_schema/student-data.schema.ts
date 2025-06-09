import { z } from 'zod';

export const step3Schema = z.object({
  rombelKelas7: z
    .string()
    .min(1, 'Harus diisi')
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      'Harus berupa angka',
    ),
  rombelKelas8: z
    .string()
    .min(1, 'Harus diisi')
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      'Harus berupa angka',
    ),
  rombelKelas9: z
    .string()
    .min(1, 'Harus diisi')
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      'Harus berupa angka',
    ),
  siswaKelas7Laki: z
    .string()
    .min(1, 'Harus diisi')
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      'Harus berupa angka',
    ),
  siswaKelas7Perempuan: z
    .string()
    .min(1, 'Harus diisi')
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      'Harus berupa angka',
    ),
  siswaKelas8Laki: z
    .string()
    .min(1, 'Harus diisi')
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      'Harus berupa angka',
    ),
  siswaKelas8Perempuan: z
    .string()
    .min(1, 'Harus diisi')
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      'Harus berupa angka',
    ),
  siswaKelas9Laki: z
    .string()
    .min(1, 'Harus diisi')
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      'Harus berupa angka',
    ),
  siswaKelas9Perempuan: z
    .string()
    .min(1, 'Harus diisi')
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      'Harus berupa angka',
    ),
});

export type Step3Data = z.infer<typeof step3Schema>;
