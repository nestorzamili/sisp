import { useState } from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  RowData,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  RowSelectionState,
  OnChangeFn,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { DataTablePagination } from './table-pagination';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    className: string;
  }
}

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  pageCount?: number;
  pagination?: {
    pageIndex: number;
    pageSize: number;
  };
  onPaginationChange?: {
    onPageChange: (page: number) => void;
    onPageSizeChange: (pageSize: number) => void;
  };
  sorting?: SortingState;
  onSortingChange?: (sorting: SortingState) => void;
  totalCount?: number;
  rowSelection?: RowSelectionState;
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  isLoading?: boolean;
}

export function DataTable<TData>({
  columns,
  data,
  pageCount = 0,
  pagination,
  onPaginationChange,
  sorting,
  onSortingChange,
  totalCount,
  rowSelection,
  onRowSelectionChange,
  isLoading = false,
}: DataTableProps<TData>) {
  const [internalRowSelection, setInternalRowSelection] =
    useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [internalSorting, setInternalSorting] = useState<SortingState>([]);

  const finalRowSelection =
    rowSelection !== undefined ? rowSelection : internalRowSelection;
  const finalOnRowSelectionChange: OnChangeFn<RowSelectionState> =
    onRowSelectionChange || setInternalRowSelection;

  const finalSorting = sorting !== undefined ? sorting : internalSorting;
  const finalOnSortingChange: OnChangeFn<SortingState> = onSortingChange
    ? (updaterOrValue) => {
        if (typeof updaterOrValue === 'function') {
          const newSorting = updaterOrValue(finalSorting);
          onSortingChange(newSorting);
        } else {
          onSortingChange(updaterOrValue);
        }
      }
    : setInternalSorting;
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting: finalSorting,
      columnVisibility,
      rowSelection: finalRowSelection,
      columnFilters,
      pagination: pagination
        ? {
            pageIndex: pagination.pageIndex,
            pageSize: pagination.pageSize,
          }
        : undefined,
    },
    pageCount,
    enableRowSelection: true,
    onRowSelectionChange: finalOnRowSelectionChange,
    onSortingChange: finalOnSortingChange,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange:
      pagination && onPaginationChange
        ? (updater) => {
            if (typeof updater === 'function') {
              const newState = updater({
                pageIndex: pagination.pageIndex,
                pageSize: pagination.pageSize,
              });

              if (newState.pageIndex !== pagination.pageIndex) {
                onPaginationChange.onPageChange(newState.pageIndex + 1);
              }
              if (newState.pageSize !== pagination.pageSize) {
                onPaginationChange.onPageSizeChange(newState.pageSize);
              }
            } else {
              if (updater.pageIndex !== pagination.pageIndex) {
                onPaginationChange.onPageChange(updater.pageIndex + 1);
              }
              if (updater.pageSize !== pagination.pageSize) {
                onPaginationChange.onPageSizeChange(updater.pageSize);
              }
            }
          }
        : undefined,
    manualPagination: !!pagination,
    manualSorting: !!onSortingChange,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="space-y-4">
      {/* Data Table */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="group/row">
                  {headerGroup.headers.map((header) => {
                    const canSort = header.column.getCanSort();
                    const sortDirection = header.column.getIsSorted();

                    return (
                      <TableHead
                        key={header.id}
                        colSpan={header.colSpan}
                        className={cn(
                          header.column.columnDef.meta?.className ?? '',
                          canSort && 'cursor-pointer select-none',
                        )}
                      >
                        {header.isPlaceholder ? null : (
                          <div
                            className={cn(
                              'flex items-center gap-2',
                              canSort && 'hover:bg-muted/50 p-1 rounded',
                            )}
                            onClick={
                              canSort
                                ? header.column.getToggleSortingHandler()
                                : undefined
                            }
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                            {canSort && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-4 w-4 p-0"
                              >
                                {sortDirection === 'asc' ? (
                                  <ArrowUp className="h-3 w-3" />
                                ) : sortDirection === 'desc' ? (
                                  <ArrowDown className="h-3 w-3" />
                                ) : (
                                  <ArrowUpDown className="h-3 w-3" />
                                )}
                              </Button>
                            )}
                          </div>
                        )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    className="group/row"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={cell.column.columnDef.meta?.className ?? ''}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Tidak ada data
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <DataTablePagination table={table} totalCount={totalCount} />
    </div>
  );
}
