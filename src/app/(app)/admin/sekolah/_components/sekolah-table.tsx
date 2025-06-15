'use client';

import * as React from 'react';
import { useState, useCallback, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DataTable } from '@/components/data-table';
import { SekolahTableFilters } from './sekolah-table-filters';
import { createSekolahColumns } from './sekolah-table-columns';
import { SekolahWithDetails } from '@/types/sekolah';
import { getAllSekolahWithCount } from '../action';
import { toast } from 'sonner';

// Types for better type safety
interface SortState {
  id: string;
  desc: boolean;
}

// Constants
const DEFAULT_PAGE_SIZE = 10;

export function SekolahTable() {
  const router = useRouter();

  // State management
  const [data, setData] = useState<SekolahWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  // Filters
  const [search, setSearch] = useState('');
  const [kecamatanFilter, setKecamatanFilter] = useState('all');

  // Sorting
  const [sortBy, setSortBy] = useState<SortState>({
    id: 'nama_sekolah',
    desc: false,
  });

  // UI state
  const [rowSelection, setRowSelection] = useState({}); // Helper function to create skeleton data
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
        status: 'APPROVED',
        reviewedAt: null,
        reviewedById: null,
        reviewNotes: null,
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
        status: 'APPROVED', // Always filter for approved schools only
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
  }, [currentPage, pageSize, search, kecamatanFilter, sortBy]); // Debounced search with automatic page reset
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
  }, [currentPage, pageSize, sortBy, kecamatanFilter, fetchData]);
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
    }
  }, []);

  const handleClearFilters = useCallback(() => {
    setSearch('');
    setKecamatanFilter('all');
    setCurrentPage(0);
  }, []); // Dialog handlers
  const handleViewDetails = useCallback(
    (sekolah: SekolahWithDetails) => {
      if (sekolah?.id && !sekolah.id.startsWith('skeleton-')) {
        router.push(`/admin/sekolah/${sekolah.id}`);
      }
    },
    [router],
  );

  // Download handler (placeholder for now)
  const handleDownloadData = useCallback((sekolah: SekolahWithDetails) => {
    if (sekolah.id.startsWith('skeleton-')) return;

    // TODO: Implement download functionality
    toast.info('Fitur unduh data akan segera tersedia');
  }, []);
  // Memoized columns using factory function
  const columns = useMemo(
    () =>
      createSekolahColumns({
        isLoading,
        onViewDetails: handleViewDetails,
        onDownloadData: handleDownloadData,
      }),
    [isLoading, handleViewDetails, handleDownloadData],
  );
  return (
    <div className="space-y-4">
      {/* Filters */}{' '}
      <SekolahTableFilters
        searchValue={search}
        onSearchChange={(value) => handleFilterChange('search', value)}
        selectedKecamatan={kecamatanFilter}
        onKecamatanChange={(value) => handleFilterChange('kecamatan', value)}
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
    </div>
  );
}
