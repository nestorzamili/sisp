import { z } from 'zod';
import { FormulirCompleteData } from '@/types/formulir.types';

export const step6Schema = z.object({
  kebutuhanPrioritas: z
    .string()
    .min(20, 'Jelaskan kebutuhan prioritas minimal 20 karakter')
    .max(2000, 'Maksimal 2000 karakter'),
});

export type Step6Data = z.infer<typeof step6Schema>;

export function getStep6InitialData(
  completeData: FormulirCompleteData | null,
): Step6Data {
  return {
    kebutuhanPrioritas: completeData?.kebutuhanPrioritas?.[0]?.penjelasan || '',
  };
}
