import { z } from 'zod';

export const step8Schema = z.object({
  // This step doesn't need validation as it's just for review
  confirmed: z.boolean().optional(),
});

export type Step8Data = z.infer<typeof step8Schema>;

export function getStep8InitialData(): Step8Data {
  return {
    confirmed: false,
  };
}
