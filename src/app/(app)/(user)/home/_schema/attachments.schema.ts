import { z } from 'zod';

export const jenisLampiranOptions = [
  { value: 'foto-kondisi-sarana', label: 'Foto Kondisi Sarana' },
  { value: 'foto-kondisi-prasarana', label: 'Foto Kondisi Prasarana' },
  { value: 'dokumen-data-siswa', label: 'Dokumen Data Siswa' },
  { value: 'dokumen-data-guru', label: 'Dokumen Data Guru' },
  { value: 'rencana-pengembangan', label: 'Rencana Pengembangan Sekolah' },
  { value: 'anggaran-kebutuhan', label: 'Anggaran Kebutuhan' },
  { value: 'surat-permohonan', label: 'Surat Permohonan' },
  { value: 'lainnya', label: 'Lainnya' },
];

export const step7Schema = z.object({
  lampiran: z
    .array(
      z.object({
        jenisLampiran: z.string().min(1, 'Jenis lampiran harus dipilih'),
        namaFile: z.string().min(1, 'Nama file harus diisi'),
        keterangan: z
          .string()
          .min(5, 'Keterangan minimal 5 karakter')
          .max(500, 'Keterangan maksimal 500 karakter'),
        file: z.any().optional(), // In real implementation, this would be proper file validation
      }),
    )
    .optional(),
});

export type Step7Data = z.infer<typeof step7Schema>;
