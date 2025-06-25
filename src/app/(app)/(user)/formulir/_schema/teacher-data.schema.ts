import { z } from 'zod';
import { FormulirCompleteData } from '@/types/formulir.types';

export const step2Schema = z.object({
  guruPnsLaki: z.number().min(0, 'Harus berupa angka positif'),
  guruPnsPerempuan: z.number().min(0, 'Harus berupa angka positif'),
  guruPppkLaki: z.number().min(0, 'Harus berupa angka positif'),
  guruPppkPerempuan: z.number().min(0, 'Harus berupa angka positif'),
  guruHonorerLaki: z.number().min(0, 'Harus berupa angka positif'),
  guruHonorerPerempuan: z.number().min(0, 'Harus berupa angka positif'),
});

export type Step2Data = z.infer<typeof step2Schema>;

export function getStep2InitialData(
  completeData: FormulirCompleteData | null,
): Step2Data {
  return {
    guruPnsLaki:
      completeData?.guru.find(
        (g) => g.status_guru === 'PNS' && g.jenis_kelamin === 'L',
      )?.jumlah || 0,
    guruPnsPerempuan:
      completeData?.guru.find(
        (g) => g.status_guru === 'PNS' && g.jenis_kelamin === 'P',
      )?.jumlah || 0,
    guruPppkLaki:
      completeData?.guru.find(
        (g) => g.status_guru === 'PPPK' && g.jenis_kelamin === 'L',
      )?.jumlah || 0,
    guruPppkPerempuan:
      completeData?.guru.find(
        (g) => g.status_guru === 'PPPK' && g.jenis_kelamin === 'P',
      )?.jumlah || 0,
    guruHonorerLaki:
      completeData?.guru.find(
        (g) => g.status_guru === 'Honorer' && g.jenis_kelamin === 'L',
      )?.jumlah || 0,
    guruHonorerPerempuan:
      completeData?.guru.find(
        (g) => g.status_guru === 'Honorer' && g.jenis_kelamin === 'P',
      )?.jumlah || 0,
  };
}
