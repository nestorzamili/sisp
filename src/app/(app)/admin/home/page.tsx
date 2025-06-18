'use client';

import { StatsCards } from './_components/stats-cards';
import { StatusChart } from './_components/status-chart';
import { GuruChart } from './_components/guru-chart';
import { SiswaChart } from './_components/siswa-chart';
import { SaranaPrasaranaChart } from './_components/sarana-prasarana-chart';
import { RecentSekolahTable } from './_components/recent-sekolah-table';
import { PendingReviewTable } from './_components/pending-review-table';

export default function AdminDashboard() {
  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Dashboard Admin</h1>
          <p className="text-muted-foreground">
            Overview statistik dan data sekolah
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Statistics Cards */}
        <StatsCards /> {/* Charts Section - Guru, Siswa, dan Status */}
        <div className="grid gap-4 md:grid-cols-3">
          <GuruChart />
          <SiswaChart />
          <StatusChart />
        </div>
        {/* Sarana dan Prasarana Chart */}
        <div className="w-full">
          <SaranaPrasaranaChart />
        </div>
        {/* Tables Section */}
        <div className="grid gap-4 md:grid-cols-2">
          <RecentSekolahTable />
          <PendingReviewTable />
        </div>
      </div>
    </div>
  );
}
