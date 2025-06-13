import { z } from 'zod';

export const step2Schema = z.object({
  guruPnsLaki: z
    .string()
    .min(1, 'Harus diisi')
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      'Harus berupa angka',
    ),
  guruPnsPerempuan: z
    .string()
    .min(1, 'Harus diisi')
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      'Harus berupa angka',
    ),
  guruPpppLaki: z
    .string()
    .min(1, 'Harus diisi')
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      'Harus berupa angka',
    ),
  guruPpppPerempuan: z
    .string()
    .min(1, 'Harus diisi')
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      'Harus berupa angka',
    ),
  guruGttLaki: z
    .string()
    .min(1, 'Harus diisi')
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      'Harus berupa angka',
    ),
  guruGttPerempuan: z
    .string()
    .min(1, 'Harus diisi')
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      'Harus berupa angka',
    ),
});

export type Step2Data = z.infer<typeof step2Schema>;
