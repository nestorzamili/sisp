'use client';

import { ReviewTable } from './_components/review-table';

export default function PermintaanReviewPage() {
  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">
            Permintaan Review Data Sekolah
          </h1>
          <p className="text-muted-foreground">
            Kelola dan review data sekolah yang telah disubmit untuk verifikasi
          </p>
        </div>
      </div>

      <ReviewTable />
    </div>
  );
}
