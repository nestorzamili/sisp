import { z } from 'zod';

export const step2Schema = z.object({
  guruPnsLaki: z.number().min(0, 'Harus berupa angka positif'),
  guruPnsPerempuan: z.number().min(0, 'Harus berupa angka positif'),
  guruPppkLaki: z.number().min(0, 'Harus berupa angka positif'),
  guruPppkPerempuan: z.number().min(0, 'Harus berupa angka positif'),
  guruHonorerLaki: z.number().min(0, 'Harus berupa angka positif'),
  guruHonorerPerempuan: z.number().min(0, 'Harus berupa angka positif'),
});

export type Step2Data = z.infer<typeof step2Schema>;
