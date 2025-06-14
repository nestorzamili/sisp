import { z } from 'zod';

export const step7Schema = z.object({
  lampiran: z
    .array(
      z.object({
        nama_dokumen: z
          .string()
          .min(1, 'Nama dokumen harus diisi')
          .max(255, 'Nama dokumen maksimal 255 karakter'),
        url: z.string().url('URL tidak valid').min(1, 'File harus diupload'),
        keterangan: z
          .string()
          .min(5, 'Keterangan minimal 5 karakter')
          .max(500, 'Keterangan maksimal 500 karakter'),
      }),
    )
    .optional(),
});

export type Step7Data = z.infer<typeof step7Schema>;
