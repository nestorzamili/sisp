import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  totalCount?: number;
}

export function DataTablePagination<TData>({
  table,
  totalCount,
}: DataTablePaginationProps<TData>) {
  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();
  const pageSize = table.getState().pagination.pageSize;
  const selectedRowsCount = table.getFilteredSelectedRowModel().rows.length;
  const totalRowsCount = totalCount || table.getFilteredRowModel().rows.length;

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Row count info - always show total, conditionally show selected */}
      <div className="flex-1 text-sm text-muted-foreground">
        {selectedRowsCount > 0 ? (
          <span>
            {selectedRowsCount} dari {totalRowsCount} baris dipilih.
          </span>
        ) : (
          <span>Total {totalRowsCount} baris.</span>
        )}
      </div>

      {/* Pagination controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6 lg:gap-8">
        {/* Page size selector */}
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium whitespace-nowrap">
            Baris per halaman
          </p>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Page info */}
        <div className="flex items-center justify-center text-sm font-medium min-w-fit">
          <span className="whitespace-nowrap">
            Halaman {currentPage} dari {totalPages}
          </span>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Ke halaman pertama</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Ke halaman sebelumnya</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Ke halaman selanjutnya</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Ke halaman terakhir</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
