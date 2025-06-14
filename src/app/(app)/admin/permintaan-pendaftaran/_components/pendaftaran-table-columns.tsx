'use client';

import { ColumnDef } from '@tanstack/react-table';
import {
  MoreHorizontal,
  Check,
  X,
  Mail,
  School,
  Hash,
  Phone,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
import { PendaftaranData } from '@/types/pendaftaran';
import {
  SkeletonCell,
  SkeletonBadge,
  SkeletonActions,
  SkeletonCheckbox,
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

export const EmailCell = ({
  isLoading,
  value,
}: {
  isLoading: boolean;
  value: string;
}) => (
  <div className="min-w-[200px]">
    {isLoading ? (
      <SkeletonCell width="w-36" />
    ) : (
      <div className="flex items-center gap-2">
        <Mail className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm">{value}</span>
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
        <Phone className="h-4 w-4 text-muted-foreground" />
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
      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
        Menunggu Persetujuan
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
  <div className="min-w-[120px]">
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
  pendaftaran,
  onApprove,
  onReject,
}: {
  isLoading: boolean;
  pendaftaran: PendaftaranData;
  onApprove: (pendaftaran: PendaftaranData) => void;
  onReject: (pendaftaran: PendaftaranData) => void;
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
            onClick={() => onApprove(pendaftaran)}
            className="cursor-pointer text-green-600"
          >
            <Check className="mr-2 h-4 w-4" />
            Setujui
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onReject(pendaftaran)}
            className="cursor-pointer text-red-600"
          >
            <X className="mr-2 h-4 w-4" />
            Tolak
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )}
  </div>
);

// Column Factory Function
export const createPendaftaranColumns = ({
  isLoading,
  onApprove,
  onReject,
}: {
  isLoading: boolean;
  onApprove: (pendaftaran: PendaftaranData) => void;
  onReject: (pendaftaran: PendaftaranData) => void;
}): ColumnDef<PendaftaranData>[] => [
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
    size: 270,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => (
      <EmailCell isLoading={isLoading} value={row.getValue('email')} />
    ),
    enableSorting: true,
    size: 220,
  },
  {
    accessorKey: 'phone',
    header: 'Telepon',
    cell: ({ row }) => (
      <PhoneCell isLoading={isLoading} value={row.getValue('phone')} />
    ),
    enableSorting: false,
    size: 160,
  },
  {
    accessorKey: 'createdAt',
    header: 'Tanggal Daftar',
    cell: ({ row }) => (
      <DateCell isLoading={isLoading} date={row.getValue('createdAt')} />
    ),
    enableSorting: true,
    size: 140,
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
      const pendaftaran = row.original;
      return (
        <ActionsCell
          isLoading={isLoading}
          pendaftaran={pendaftaran}
          onApprove={onApprove}
          onReject={onReject}
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
    size: 80,
  },
];
