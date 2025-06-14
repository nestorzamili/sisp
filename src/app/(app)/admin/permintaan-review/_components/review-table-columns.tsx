'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Check, Edit, School, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
import { ReviewData } from '@/types/review';
import {
  SkeletonCell,
  SkeletonBadge,
  SkeletonCheckbox,
  SkeletonActions,
} from '@/components/skeleton-cells';

// Cell components
export const SelectCell = ({
  isLoading,
  isSelected,
  onToggle,
}: {
  isLoading: boolean;
  isSelected: boolean;
  onToggle: (selected: boolean) => void;
}) => {
  if (isLoading) return <SkeletonCheckbox />;

  return (
    <Checkbox
      checked={isSelected}
      onCheckedChange={(value) => onToggle(!!value)}
      aria-label="Select row"
    />
  );
};

export const NpsnCell = ({
  isLoading,
  value,
}: {
  isLoading: boolean;
  value: string;
}) => (
  <div className="min-w-[120px]">
    {isLoading ? (
      <SkeletonCell width="w-20" />
    ) : (
      <div className="flex items-center gap-2">
        <Hash className="h-4 w-4 text-muted-foreground" />
        <span className="font-mono text-sm">{value}</span>
      </div>
    )}
  </div>
);

export const SekolahCell = ({
  isLoading,
  value,
}: {
  isLoading: boolean;
  value: string;
}) => (
  <div className="min-w-[250px]">
    {isLoading ? (
      <SkeletonCell width="w-40" />
    ) : (
      <div className="flex items-center gap-2">
        <School className="h-4 w-4 text-muted-foreground" />
        <span className="font-medium">{value}</span>
      </div>
    )}
  </div>
);

export const UserCell = ({
  isLoading,
  name,
  email,
}: {
  isLoading: boolean;
  name: string;
  email: string;
}) => (
  <div className="min-w-[200px]">
    {isLoading ? (
      <SkeletonCell width="w-36" />
    ) : (
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm">{name}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{email}</span>
        </div>
      </div>
    )}
  </div>
);

export const KepalaSekolahCell = ({
  isLoading,
  value,
}: {
  isLoading: boolean;
  value?: string | null;
}) => (
  <div className="min-w-[180px]">
    {isLoading ? (
      <SkeletonCell width="w-32" />
    ) : value ? (
      <span className="text-sm">{value}</span>
    ) : (
      <span className="text-muted-foreground text-sm">-</span>
    )}
  </div>
);

export const AlamatCell = ({
  isLoading,
  alamat,
  kecamatan,
}: {
  isLoading: boolean;
  alamat?: string | null;
  kecamatan?: string | null;
}) => (
  <div className="min-w-[200px]">
    {isLoading ? (
      <SkeletonCell width="w-36" />
    ) : (
      <div className="space-y-1">
        {' '}
        {alamat && (
          <div className="flex items-start gap-2">
            <span className="text-sm line-clamp-2">{alamat}</span>
          </div>
        )}
        {kecamatan && (
          <span className="text-xs text-muted-foreground pl-6">
            Kec. {kecamatan}
          </span>
        )}
        {!alamat && !kecamatan && (
          <span className="text-muted-foreground text-sm">-</span>
        )}
      </div>
    )}
  </div>
);

export const PhoneCell = ({
  isLoading,
  value,
}: {
  isLoading: boolean;
  value?: string | null;
}) => (
  <div className="min-w-[140px]">
    {isLoading ? (
      <SkeletonCell width="w-28" />
    ) : value ? (
      <div className="flex items-center gap-2">
        <span className="text-sm">{value}</span>
      </div>
    ) : (
      <span className="text-muted-foreground text-sm">-</span>
    )}
  </div>
);

export const StatusCell = ({ isLoading }: { isLoading: boolean }) => (
  <div className="min-w-[150px]">
    {isLoading ? (
      <SkeletonBadge />
    ) : (
      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
        Menunggu Review
      </Badge>
    )}
  </div>
);

export const DateCell = ({
  isLoading,
  date,
}: {
  isLoading: boolean;
  date: Date;
}) => (
  <div className="min-w-[160px]">
    {isLoading ? (
      <SkeletonCell width="w-24" />
    ) : (
      <span className="text-sm text-muted-foreground">
        {formatDistanceToNow(date, { addSuffix: true, locale: id })}
      </span>
    )}
  </div>
);

// Actions Cell Component
export const ActionsCell = ({
  isLoading,
  review,
  onApprove,
  onRequestRevision,
}: {
  isLoading: boolean;
  review: ReviewData;
  onApprove: (review: ReviewData) => void;
  onRequestRevision: (review: ReviewData) => void;
}) => (
  <div className="text-right min-w-[60px]">
    {isLoading ? (
      <SkeletonActions />
    ) : (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => onApprove(review)}
            className="cursor-pointer text-green-600"
          >
            <Check className="mr-2 h-4 w-4" />
            Setujui
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onRequestRevision(review)}
            className="cursor-pointer text-orange-600"
          >
            <Edit className="mr-2 h-4 w-4" />
            Minta Revisi
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )}
  </div>
);

// Column Factory Function
export const createReviewColumns = ({
  isLoading,
  onApprove,
  onRequestRevision,
}: {
  isLoading: boolean;
  onApprove: (review: ReviewData) => void;
  onRequestRevision: (review: ReviewData) => void;
}): ColumnDef<ReviewData>[] => [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <SelectCell
        isLoading={isLoading}
        isSelected={row.getIsSelected()}
        onToggle={(selected) => row.toggleSelected(selected)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 40,
  },
  {
    accessorKey: 'npsn',
    header: 'NPSN',
    cell: ({ row }) => (
      <NpsnCell isLoading={isLoading} value={row.getValue('npsn')} />
    ),
    enableSorting: true,
    size: 140,
  },
  {
    accessorKey: 'nama_sekolah',
    header: 'Nama Sekolah',
    cell: ({ row }) => (
      <SekolahCell isLoading={isLoading} value={row.getValue('nama_sekolah')} />
    ),
    enableSorting: true,
    size: 300,
  },
  {
    accessorKey: 'createdAt',
    header: 'Tanggal Submit',
    cell: ({ row }) => (
      <DateCell isLoading={isLoading} date={row.getValue('createdAt')} />
    ),
    enableSorting: true,
    size: 160,
  },
  {
    id: 'status',
    header: 'Status',
    cell: () => <StatusCell isLoading={isLoading} />,
    enableSorting: false,
    size: 170,
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => {
      const review = row.original;
      return (
        <ActionsCell
          isLoading={isLoading}
          review={review}
          onApprove={onApprove}
          onRequestRevision={onRequestRevision}
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
    size: 80,
  },
];
