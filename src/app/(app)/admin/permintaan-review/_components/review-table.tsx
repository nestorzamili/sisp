'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { DataTable } from '@/components/data-table';
import { ReviewData } from '@/types/review';
import { createReviewColumns } from './review-table-columns';
import { ReviewTableFilters } from './review-table-filters';
import { ReviewApprovalDialog } from './review-approval-dialog';
import { ReviewRevisionDialog } from './review-revision-dialog';
import {
  getAllPendingReviews,
  approveReview,
  requestRevision,
} from '../action';

// Types for better type safety
interface SortState {
  id: string;
  desc: boolean;
}

// Constants
const DEFAULT_PAGE_SIZE = 10;

export function ReviewTable() {
  const router = useRouter();

  // State management
  const [data, setData] = useState<ReviewData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  // Filters
  const [search, setSearch] = useState('');

  // Sorting
  const [sortBy, setSortBy] = useState<SortState>({
    id: 'createdAt',
    desc: true,
  });

  // UI state
  const [approvalDialog, setApprovalDialog] = useState(false);
  const [revisionDialog, setRevisionDialog] = useState(false);
  const [selectedReview, setSelectedReview] = useState<ReviewData | null>(null);

  // Helper function to create skeleton data
  const createSkeletonData = useCallback((count: number): ReviewData[] => {
    return Array.from({ length: count }, (_, index) => ({
      id: `skeleton-${index}`,
      nama_sekolah: '',
      npsn: '',
      nama_kepala_sekolah: '',
      alamat_sekolah: '',
      kecamatan: '',
      phone: '',
      status: 'PENDING' as const,
      createdAt: new Date(),
      updatedAt: new Date(),
      reviewedAt: null,
      reviewedById: null,
      reviewNotes: null,
      user: {
        id: '',
        name: '',
        email: '',
      },
      reviewedBy: null,
    }));
  }, []);

  // Memoized skeleton data
  const skeletonData = useMemo(
    () => createSkeletonData(pageSize),
    [pageSize, createSkeletonData],
  );

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getAllPendingReviews({
        page: currentPage + 1,
        limit: pageSize,
        search,
        sortBy: sortBy.id,
        sortOrder: sortBy.desc ? 'desc' : 'asc',
      });
      if (response.success) {
        setData(response.data as ReviewData[]);
        setTotalRows(response.totalRows);
      } else {
        toast.error(response.error || 'Gagal mengambil data review');
        setData([]);
        setTotalRows(0);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Terjadi kesalahan saat mengambil data');
      setData([]);
      setTotalRows(0);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, pageSize, search, sortBy]);

  // Debounced search with automatic page reset
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
  }, [currentPage, pageSize, sortBy, fetchData]);

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
  const handleApprove = useCallback((review: ReviewData) => {
    if (!review.id.startsWith('skeleton-')) {
      setSelectedReview(review);
      setApprovalDialog(true);
    }
  }, []);
  const handleRequestRevision = useCallback((review: ReviewData) => {
    if (!review.id.startsWith('skeleton-')) {
      setSelectedReview(review);
      setRevisionDialog(true);
    }
  }, []);

  const handleDetail = useCallback(
    (review: ReviewData) => {
      if (!review.id.startsWith('skeleton-')) {
        router.push(`/admin/permintaan-review/${review.id}`);
      }
    },
    [router],
  );

  // Action handlers with error handling
  const handleConfirmApproval = useCallback(
    async (sekolahId: string, notes?: string) => {
      try {
        const response = await approveReview(sekolahId, notes);

        if (response.success) {
          toast.success(response.message || 'Review berhasil disetujui');
          await fetchData();
        } else {
          toast.error(response.error || 'Gagal menyetujui review');
        }
      } catch (error) {
        console.error('Error approving review:', error);
        toast.error('Terjadi kesalahan saat menyetujui review');
      }
    },
    [fetchData],
  );

  const handleConfirmRevision = useCallback(
    async (sekolahId: string, reason: string) => {
      try {
        const response = await requestRevision(sekolahId, reason);

        if (response.success) {
          toast.success(
            response.message || 'Permintaan revisi berhasil dikirim',
          );
          await fetchData();
        } else {
          toast.error(response.error || 'Gagal mengirim permintaan revisi');
        }
      } catch (error) {
        console.error('Error requesting revision:', error);
        toast.error('Terjadi kesalahan saat mengirim permintaan revisi');
      }
    },
    [fetchData],
  );
  // Memoized columns using factory function
  const columns = useMemo(
    () =>
      createReviewColumns({
        isLoading,
        onApprove: handleApprove,
        onRequestRevision: handleRequestRevision,
        onDetail: handleDetail,
      }),
    [isLoading, handleApprove, handleRequestRevision, handleDetail],
  );

  return (
    <div className="space-y-4">
      {/* Filters */}
      <ReviewTableFilters
        searchValue={search}
        onSearchChange={setSearch}
        onClearFilters={handleClearFilters}
      />

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
      <ReviewApprovalDialog
        open={approvalDialog}
        onOpenChange={setApprovalDialog}
        review={selectedReview}
        onConfirm={handleConfirmApproval}
      />

      <ReviewRevisionDialog
        open={revisionDialog}
        onOpenChange={setRevisionDialog}
        review={selectedReview}
        onConfirm={handleConfirmRevision}
      />
    </div>
  );
}
