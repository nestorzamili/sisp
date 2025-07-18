'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { DataTable } from '@/components/data-table';
import { toast } from 'sonner';
import { PendaftaranData } from '@/types/pendaftaran';
import {
  getAllPendingRegistrations,
  approvePendaftaran,
  rejectPendaftaran,
} from '../action';
import { createPendaftaranColumns } from './pendaftaran-table-columns';
import { PendaftaranTableFilters } from './pendaftaran-table-filters';
import { ApprovalDialog } from './approval-dialog';
import { RejectionDialog } from './rejection-dialog';

interface SortState {
  id: string;
  desc: boolean;
}

const DEFAULT_PAGE_SIZE = 10;

export function PendaftaranTable() {
  const [data, setData] = useState<PendaftaranData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortState>({
    id: 'createdAt',
    desc: true,
  });
  const [approvalDialog, setApprovalDialog] = useState(false);
  const [rejectionDialog, setRejectionDialog] = useState(false);
  const [selectedPendaftaran, setSelectedPendaftaran] =
    useState<PendaftaranData | null>(null);

  const createSkeletonData = useCallback((count: number): PendaftaranData[] => {
    return Array.from({ length: count }, (_, index) => ({
      id: `skeleton-${index}`,
      name: '',
      email: '',
      banned: true,
      npsn: '',
      phone: '',
      nama_sekolah: '',
      createdAt: new Date(),
    }));
  }, []);

  const skeletonData = useMemo(
    () => createSkeletonData(pageSize),
    [pageSize, createSkeletonData],
  );

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getAllPendingRegistrations({
        page: currentPage + 1,
        limit: pageSize,
        search,
        sortBy: sortBy.id,
        sortOrder: sortBy.desc ? 'desc' : 'asc',
      });

      if (response.success) {
        setData(response.data);
        setTotalRows(response.totalRows);
      } else {
        toast.error(response.error || 'Gagal mengambil data');
        setData([]);
        setTotalRows(0);
      }
    } catch {
      toast.error('Terjadi kesalahan saat mengambil data');
      setData([]);
      setTotalRows(0);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, pageSize, search, sortBy]);

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
  }, [currentPage, pageSize, sortBy, fetchData]);

  useEffect(() => {
    if (search.length >= 2 && currentPage !== 0) {
      setCurrentPage(0);
    }
  }, [search, currentPage]);
  // Sorting handler
  const handleSortingChange = useCallback((sortingArray: SortState[]) => {
    setSortBy(
      sortingArray.length > 0
        ? sortingArray[0]
        : { id: 'createdAt', desc: true },
    );
  }, []);

  const handleClearFilters = useCallback(() => {
    setSearch('');
    setCurrentPage(0);
  }, []);

  // Dialog handlers
  const handleApprove = useCallback((pendaftaran: PendaftaranData) => {
    if (!pendaftaran.id.startsWith('skeleton-')) {
      setSelectedPendaftaran(pendaftaran);
      setApprovalDialog(true);
    }
  }, []);

  const handleReject = useCallback((pendaftaran: PendaftaranData) => {
    if (!pendaftaran.id.startsWith('skeleton-')) {
      setSelectedPendaftaran(pendaftaran);
      setRejectionDialog(true);
    }
  }, []);

  // Action handlers with error handling
  const handleConfirmApproval = useCallback(
    async (userId: string) => {
      try {
        const response = await approvePendaftaran(userId);

        if (response.success) {
          toast.success(response.message || 'Pendaftaran berhasil disetujui');
          await fetchData();
        } else {
          toast.error(response.error || 'Gagal menyetujui pendaftaran');
        }
      } catch {
        toast.error('Terjadi kesalahan saat menyetujui pendaftaran');
      }
    },
    [fetchData],
  );

  const handleConfirmRejection = useCallback(
    async (userId: string, reason: string) => {
      try {
        const response = await rejectPendaftaran(userId, reason);

        if (response.success) {
          toast.success(response.message || 'Pendaftaran berhasil ditolak');
          await fetchData();
        } else {
          toast.error(response.error || 'Gagal menolak pendaftaran');
        }
      } catch {
        toast.error('Terjadi kesalahan saat menolak pendaftaran');
      }
    },
    [fetchData],
  );

  // Memoized columns using factory function
  const columns = useMemo(
    () =>
      createPendaftaranColumns({
        isLoading,
        onApprove: handleApprove,
        onReject: handleReject,
      }),
    [isLoading, handleApprove, handleReject],
  );

  return (
    <div className="space-y-4">
      {/* Filters */}
      <PendaftaranTableFilters
        searchValue={search}
        onSearchChange={setSearch}
        onClearFilters={handleClearFilters}
      />{' '}
      {/* Table */}
      <DataTable
        columns={columns}
        data={isLoading ? skeletonData : data}
        pageCount={Math.ceil(totalRows / pageSize)}
        pagination={{
          pageIndex: currentPage,
          pageSize: pageSize,
        }}
        onPaginationChange={{
          onPageChange: (page: number) => setCurrentPage(page),
          onPageSizeChange: (newPageSize: number) => {
            setPageSize(newPageSize);
            setCurrentPage(0);
          },
        }}
        sorting={[sortBy]}
        onSortingChange={(sorting) => {
          handleSortingChange(sorting);
        }}
        totalCount={totalRows}
        isLoading={false}
      />
      {/* Dialogs */}
      <ApprovalDialog
        open={approvalDialog}
        onOpenChange={setApprovalDialog}
        pendaftaran={selectedPendaftaran}
        onConfirm={handleConfirmApproval}
      />
      <RejectionDialog
        open={rejectionDialog}
        onOpenChange={setRejectionDialog}
        pendaftaran={selectedPendaftaran}
        onConfirm={handleConfirmRejection}
      />
    </div>
  );
}
