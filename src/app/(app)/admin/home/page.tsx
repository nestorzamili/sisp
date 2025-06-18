'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  getDashboardStats,
  getSekolahStatusDistribution,
  getSaranaDistribution,
  getPrasaranaDistribution,
  getGuruDistribution,
  getSiswaDistribution,
  getRecentSekolah,
  getPendingReviews,
} from './action';
import { StatsCards } from './_components/stats-cards';
import { StatusChart } from './_components/status-chart';
import { SaranaPrasaranaChart } from './_components/sarana-prasarana-chart';
import { GuruChart } from './_components/guru-chart';
import { SiswaChart } from './_components/siswa-chart';
import { RecentSekolahTable } from './_components/recent-sekolah-table';
import { PendingReviewTable } from './_components/pending-review-table';
import type {
  DashboardStats,
  SekolahStats,
  SaranaStats,
  PrasaranaStats,
  GuruStats,
  SiswaStats,
  RecentSekolah,
  PendingReview,
} from '@/types/dashboard.types';

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      {/* Stats Cards Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                <Skeleton className="h-4 w-24" />
              </CardTitle>
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-3 w-32 mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 3 Charts Skeleton - Guru, Siswa, Status */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-5 w-32" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[300px] w-full" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-5 w-40" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[300px] w-full" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-5 w-32" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[300px] w-full" />
          </CardContent>
        </Card>
      </div>

      {/* Sarana Prasarana Chart Skeleton - Full Width */}
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-5 w-64" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[400px] w-full" />
        </CardContent>
      </Card>

      {/* Tables Skeleton */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-5 w-32" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[200px] w-full" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-5 w-48" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[200px] w-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<{
    stats: DashboardStats | null;
    statusDistribution: SekolahStats[];
    saranaData: SaranaStats[];
    prasaranaData: PrasaranaStats[];
    guruData: GuruStats[];
    siswaData: SiswaStats[];
    recentSekolah: RecentSekolah[];
    pendingReviews: PendingReview[];
  }>({
    stats: null,
    statusDistribution: [],
    saranaData: [],
    prasaranaData: [],
    guruData: [],
    siswaData: [],
    recentSekolah: [],
    pendingReviews: [],
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const [
          statsResult,
          statusResult,
          saranaResult,
          prasaranaResult,
          guruResult,
          siswaResult,
          recentSekolahResult,
          pendingReviewsResult,
        ] = await Promise.all([
          getDashboardStats(),
          getSekolahStatusDistribution(),
          getSaranaDistribution(),
          getPrasaranaDistribution(),
          getGuruDistribution(),
          getSiswaDistribution(),
          getRecentSekolah(5),
          getPendingReviews(10),
        ]);

        setDashboardData({
          stats: statsResult.success ? statsResult.data : null,
          statusDistribution: statusResult.success ? statusResult.data : [],
          saranaData: saranaResult.success ? saranaResult.data : [],
          prasaranaData: prasaranaResult.success ? prasaranaResult.data : [],
          guruData: guruResult.success ? guruResult.data : [],
          siswaData: siswaResult.success ? siswaResult.data : [],
          recentSekolah: recentSekolahResult.success
            ? recentSekolahResult.data
            : [],
          pendingReviews: pendingReviewsResult.success
            ? pendingReviewsResult.data
            : [],
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);
  if (loading) {
    return (
      <div className="w-full space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              Dashboard Admin
            </h1>
            <p className="text-muted-foreground">
              Overview statistik dan data sekolah
            </p>
          </div>
        </div>
        <LoadingSkeleton />
      </div>
    );
  }

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
      </div>{' '}
      <div className="space-y-6">
        {/* Statistics Cards */}
        {dashboardData.stats && <StatsCards stats={dashboardData.stats} />}

        {/* Charts Section - Guru, Siswa, dan Status */}
        <div className="grid gap-4 md:grid-cols-3">
          <GuruChart data={dashboardData.guruData} />
          <SiswaChart data={dashboardData.siswaData} />
          <StatusChart data={dashboardData.statusDistribution} />
        </div>

        {/* Sarana dan Prasarana Chart */}
        <div className="w-full">
          <SaranaPrasaranaChart
            saranaData={dashboardData.saranaData}
            prasaranaData={dashboardData.prasaranaData}
          />
        </div>

        {/* Tables Section */}
        <div className="grid gap-4 md:grid-cols-2">
          <RecentSekolahTable data={dashboardData.recentSekolah} />
          <PendingReviewTable data={dashboardData.pendingReviews} />
        </div>
      </div>
    </div>
  );
}
