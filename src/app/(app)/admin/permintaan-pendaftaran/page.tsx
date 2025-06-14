'use client';

import { PendaftaranTable } from './_components/pendaftaran-table';

export default function PermintaanPendaftaranPage() {
  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">
            Permintaan Pendaftaran
          </h1>
          <p className="text-muted-foreground">
            Kelola permintaan pendaftaran sekolah yang perlu disetujui
          </p>
        </div>
      </div>

      <PendaftaranTable />
    </div>
  );
}
