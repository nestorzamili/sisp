'use client';

import * as React from 'react';
import { useState, useCallback, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DataTable } from '@/components/data-table';
import { SekolahTableFilters } from './sekolah-table-filters';
import { createSekolahColumns } from './sekolah-table-columns';
import { SekolahWithDetails } from '@/types/sekolah';
import { getAllSekolahWithCount, getSekolahDetail } from '../action';
import { downloadSekolahPDF } from '@/lib/pdf-utils';
import { toast } from 'sonner';

interface SortState {
  id: string;
  desc: boolean;
}

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
  const [rowSelection, setRowSelection] = useState({});

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
        status: 'APPROVED',
        sortBy: sortBy.id,
        sortOrder: sortBy.desc ? 'desc' : 'asc',
      });
      if (response.success) {
        setData(response.data || []);
        setTotalRows(response.totalRows || 0);
      } else {
        setData([]);
        setTotalRows(0);
      }
    } catch {
      setData([]);
      setTotalRows(0);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, pageSize, search, kecamatanFilter, sortBy]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search.length === 0 || search.length >= 2) {
        fetchData();
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [search, fetchData]);

  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize, kecamatanFilter, sortBy, fetchData]);

  useEffect(() => {
    if (search.length >= 2 && currentPage !== 0) {
      setCurrentPage(0);
    }
  }, [search, currentPage]);

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
    setCurrentPage(0);
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
  }, []);

  const handleViewDetails = useCallback(
    (sekolah: SekolahWithDetails) => {
      if (sekolah?.id && !sekolah.id.startsWith('skeleton-')) {
        router.push(`/admin/sekolah/${sekolah.id}`);
      }
    },
    [router],
  );

  const handleDownloadData = useCallback(
    async (sekolah: SekolahWithDetails) => {
      if (sekolah.id.startsWith('skeleton-')) return;

      try {
        toast.info('Mempersiapkan PDF...');

        const detailResponse = await getSekolahDetail(sekolah.id);

        if (!detailResponse.success || !detailResponse.data) {
          toast.error('Gagal mengambil data detail sekolah');
          return;
        }

        await downloadSekolahPDF(detailResponse.data);
        toast.success('PDF berhasil diunduh');
      } catch {
        toast.error('Gagal mengunduh PDF. Silakan coba lagi.');
      }
    },
    [],
  );

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
