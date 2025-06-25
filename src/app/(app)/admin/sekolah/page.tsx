'use client';

import { SekolahTable } from './_components/sekolah-table';
import { DownloadReportButton } from './_components/download-report-button';

export default function SekolahPage() {
  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Data Sekolah</h1>
          <p className="text-muted-foreground">
            Kelola data sekolah yang terdaftar dalam sistem
          </p>
        </div>
        <div className="flex items-center gap-2">
          <DownloadReportButton />
        </div>
      </div>

      <SekolahTable />
    </div>
  );
}
