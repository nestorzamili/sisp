import { z } from 'zod';

export const step3Schema = z.object({
  siswaKelas7Laki: z.number().min(0, 'Jumlah tidak boleh negatif'),
  siswaKelas7Perempuan: z.number().min(0, 'Jumlah tidak boleh negatif'),
  siswaKelas8Laki: z.number().min(0, 'Jumlah tidak boleh negatif'),
  siswaKelas8Perempuan: z.number().min(0, 'Jumlah tidak boleh negatif'),
  siswaKelas9Laki: z.number().min(0, 'Jumlah tidak boleh negatif'),
  siswaKelas9Perempuan: z.number().min(0, 'Jumlah tidak boleh negatif'),
});

export type Step3Data = z.infer<typeof step3Schema>;
