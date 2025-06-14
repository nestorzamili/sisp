'use client';

import * as React from 'react';
import { useState, useCallback, useMemo, useEffect } from 'react';
import { DataTable } from '@/components/data-table';
import { SekolahDetailDialog } from './sekolah-detail-dialog';
import { SekolahTableFilters } from './sekolah-table-filters';
import { createSekolahColumns } from './sekolah-table-columns';
import { SekolahWithDetails } from '@/types/sekolah';
import {
  getAllSekolahWithCount,
  approveSekolah,
  rejectSekolah,
} from '../action';
import { toast } from 'sonner';

// Types for better type safety
interface SortState {
  id: string;
  desc: boolean;
}

// Constants
const DEFAULT_PAGE_SIZE = 10;

export function SekolahTable() {
  // State management
  const [data, setData] = useState<SekolahWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  // Filters
  const [search, setSearch] = useState('');
  const [kecamatanFilter, setKecamatanFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'approved' | 'pending'
  >('all');

  // Sorting
  const [sortBy, setSortBy] = useState<SortState>({
    id: 'nama_sekolah',
    desc: false,
  });

  // UI state
  const [rowSelection, setRowSelection] = useState({});
  const [detailDialog, setDetailDialog] = useState(false);
  const [detailId, setDetailId] = useState<string | null>(null);
  // Helper function to create skeleton data
  const createSkeletonData = useCallback(
    (count: number): SekolahWithDetails[] => {
      return Array.from({ length: count }, (_, index) => ({
        id: `skeleton-${index}`,
        createdAt: new Date(),
        updatedAt: new Date(),
        nama_sekolah: '',
        npsn: '',
        nama_kepala_sekolah: '',
        nip_kepala_sekolah: '',
        alamat_sekolah: '',
        kecamatan: '',
        phone: '',
        userId: '',
        user: {
          id: '',
          name: '',
          email: '',
        },
      }));
    },
    [],
  );

  // Memoized skeleton data
  const skeletonData = useMemo(
    () => createSkeletonData(pageSize),
    [pageSize, createSkeletonData],
  );
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getAllSekolahWithCount({
        page: currentPage + 1,
        limit: pageSize,
        search: search,
        kecamatan: kecamatanFilter !== 'all' ? kecamatanFilter : undefined,
        status: statusFilter,
        sortBy: sortBy.id,
        sortOrder: sortBy.desc ? 'desc' : 'asc',
      });

      if (response.success) {
        setData(response.data || []);
        setTotalRows(response.totalRows || 0);
      } else {
        console.error('Failed to fetch sekolah:', response.error);
        setData([]);
        setTotalRows(0);
      }
    } catch (error) {
      console.error('Error fetching sekolah:', error);
      setData([]);
      setTotalRows(0);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, pageSize, search, kecamatanFilter, statusFilter, sortBy]); // Debounced search with automatic page reset
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(0);
      fetchData();
    }, 300);
    return () => clearTimeout(timer);
  }, [search, fetchData]);

  // Effect for other filters and pagination
  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize, sortBy, statusFilter, kecamatanFilter, fetchData]);
  // Optimized handlers with useCallback
  const handlePaginationChange = useCallback(
    (newPagination: { pageIndex: number; pageSize: number }) => {
      setCurrentPage(newPagination.pageIndex);
      setPageSize(newPagination.pageSize);
    },
    [],
  );

  const handleSortingChange = useCallback((newSorting: Array<SortState>) => {
    setSortBy(
      newSorting.length > 0
        ? newSorting[0]
        : { id: 'nama_sekolah', desc: false },
    );
  }, []);

  const handleFilterChange = useCallback((type: string, value: string) => {
    setCurrentPage(0); // Reset to first page when filtering
    switch (type) {
      case 'search':
        setSearch(value);
        break;
      case 'kecamatan':
        setKecamatanFilter(value);
        break;
      case 'status':
        setStatusFilter(value as typeof statusFilter);
        break;
    }
  }, []);

  const handleClearFilters = useCallback(() => {
    setSearch('');
    setKecamatanFilter('all');
    setStatusFilter('all');
    setCurrentPage(0);
  }, []);
  // Dialog handlers
  const handleViewDetails = useCallback((sekolah: SekolahWithDetails) => {
    if (sekolah?.id && !sekolah.id.startsWith('skeleton-')) {
      setDetailId(sekolah.id);
      setDetailDialog(true);
    }
  }, []);

  // Action handlers with error handling
  const handleApproveSekolah = useCallback(
    async (sekolah: SekolahWithDetails) => {
      if (sekolah.id.startsWith('skeleton-')) return;

      try {
        const result = await approveSekolah(sekolah.id);
        if (result.success) {
          toast.success(result.message || 'Sekolah berhasil disetujui');
          fetchData();
        } else {
          toast.error(result.error || 'Gagal menyetujui sekolah');
        }
      } catch (error) {
        console.error('Error approving sekolah:', error);
        toast.error('Terjadi kesalahan saat menyetujui sekolah');
      }
    },
    [fetchData],
  );

  const handleRejectSekolah = useCallback(
    async (sekolah: SekolahWithDetails) => {
      if (sekolah.id.startsWith('skeleton-')) return;

      try {
        const result = await rejectSekolah(sekolah.id);
        if (result.success) {
          toast.success(result.message || 'Sekolah berhasil ditolak');
          fetchData();
        } else {
          toast.error(result.error || 'Gagal menolak sekolah');
        }
      } catch (error) {
        console.error('Error rejecting sekolah:', error);
        toast.error('Terjadi kesalahan saat menolak sekolah');
      }
    },
    [fetchData],
  );

  // Memoized columns using factory function
  const columns = useMemo(
    () =>
      createSekolahColumns({
        isLoading,
        onViewDetails: handleViewDetails,
        onApprove: handleApproveSekolah,
        onReject: handleRejectSekolah,
      }),
    [isLoading, handleViewDetails, handleApproveSekolah, handleRejectSekolah],
  );
  return (
    <div className="space-y-4">
      {/* Filters */}{' '}
      <SekolahTableFilters
        searchValue={search}
        onSearchChange={(value) => handleFilterChange('search', value)}
        selectedKecamatan={kecamatanFilter}
        onKecamatanChange={(value) => handleFilterChange('kecamatan', value)}
        selectedStatus={statusFilter}
        onStatusChange={(value) => handleFilterChange('status', value)}
        onClearFilters={handleClearFilters}
      />
      <DataTable
        columns={columns}
        data={isLoading ? skeletonData : data}
        isLoading={false}
        pageCount={Math.ceil(totalRows / pageSize)}
        pagination={{
          pageIndex: currentPage,
          pageSize: pageSize,
        }}
        onPaginationChange={{
          onPageChange: (page) =>
            handlePaginationChange({
              pageIndex: page - 1,
              pageSize: pageSize,
            }),
          onPageSizeChange: (newPageSize) =>
            handlePaginationChange({
              pageIndex: currentPage,
              pageSize: newPageSize,
            }),
        }}
        sorting={[sortBy]}
        onSortingChange={handleSortingChange}
        totalCount={totalRows}
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
      />
      {detailDialog && (
        <SekolahDetailDialog
          open={detailDialog}
          onOpenChange={setDetailDialog}
          sekolahId={detailId}
        />
      )}
    </div>
  );
}
