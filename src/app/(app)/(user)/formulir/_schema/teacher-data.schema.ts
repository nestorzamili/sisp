import { z } from 'zod';

export const step2Schema = z.object({
  guruPnsLaki: z.number().min(0, 'Harus berupa angka positif'),
  guruPnsPerempuan: z.number().min(0, 'Harus berupa angka positif'),
  guruPpppLaki: z.number().min(0, 'Harus berupa angka positif'),
  guruPpppPerempuan: z.number().min(0, 'Harus berupa angka positif'),
  guruGttLaki: z.number().min(0, 'Harus berupa angka positif'),
  guruGttPerempuan: z.number().min(0, 'Harus berupa angka positif'),
});

export type Step2Data = z.infer<typeof step2Schema>;
