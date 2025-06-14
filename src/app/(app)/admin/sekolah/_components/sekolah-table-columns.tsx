import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Eye, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SkeletonCell,
  SkeletonBadge,
  SkeletonActions,
  SkeletonCheckbox,
} from '@/components/skeleton-cells';
import { SelectAllHeader } from './table-headers';
import { SekolahWithDetails } from '@/types/sekolah';

// Status Badge Component
export const StatusBadge = ({ banned }: { banned: boolean }) => {
  if (banned) {
    return (
      <Badge variant="destructive" className="flex items-center gap-1">
        <svg
          className="h-3 w-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12,6 12,12 16,14" />
        </svg>
        Menunggu Persetujuan
      </Badge>
    );
  }

  return (
    <Badge
      variant="default"
      className="flex items-center gap-1 bg-green-600 hover:bg-green-700"
    >
      <Check className="h-3 w-3" />
      Disetujui
    </Badge>
  );
};

// Table Cell Components
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

export const NPSNCell = ({
  isLoading,
  value,
}: {
  isLoading: boolean;
  value: string;
}) => (
  <div className="font-medium min-w-[100px]">
    {isLoading ? <SkeletonCell width="w-20" /> : value}
  </div>
);

export const SekolahNameCell = ({
  isLoading,
  value,
}: {
  isLoading: boolean;
  value: string;
}) => (
  <div className="min-w-[250px] font-medium">
    {isLoading ? <SkeletonCell width="w-40" /> : value}
  </div>
);

export const KepalaSekolahCell = ({
  isLoading,
  value,
}: {
  isLoading: boolean;
  value?: string;
}) => (
  <div className="min-w-[180px]">
    {isLoading ? <SkeletonCell width="w-32" /> : value || '-'}
  </div>
);

export const KecamatanCell = ({
  isLoading,
  value,
}: {
  isLoading: boolean;
  value?: string;
}) => (
  <div className="min-w-[130px]">
    {isLoading ? <SkeletonCell width="w-24" /> : value || '-'}
  </div>
);

export const PhoneCell = ({
  isLoading,
  value,
}: {
  isLoading: boolean;
  value?: string;
}) => (
  <div className="min-w-[120px]">
    {isLoading ? <SkeletonCell width="w-28" /> : value || '-'}
  </div>
);

export const EmailCell = ({
  isLoading,
  value,
}: {
  isLoading: boolean;
  value?: string;
}) => (
  <div className="min-w-[200px]">
    {isLoading ? <SkeletonCell width="w-36" /> : value || '-'}
  </div>
);

export const StatusCell = ({
  isLoading,
  banned,
}: {
  isLoading: boolean;
  banned: boolean;
}) => (
  <div className="min-w-[150px]">
    {isLoading ? <SkeletonBadge /> : <StatusBadge banned={banned} />}
  </div>
);

// Actions Cell Component
export const ActionsCell = ({
  isLoading,
  sekolah,
  userBanned,
  onViewDetails,
  onApprove,
  onReject,
}: {
  isLoading: boolean;
  sekolah: SekolahWithDetails;
  userBanned: boolean;
  onViewDetails: (sekolah: SekolahWithDetails) => void;
  onApprove: (sekolah: SekolahWithDetails) => void;
  onReject: (sekolah: SekolahWithDetails) => void;
}) => (
  <div className="text-right min-w-[60px]">
    {isLoading ? (
      <SkeletonActions />
    ) : (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Buka menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Aksi</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex justify-between cursor-pointer"
            onClick={() => onViewDetails(sekolah)}
          >
            Lihat Detail <Eye className="h-4 w-4" />
          </DropdownMenuItem>

          {userBanned && (
            <>
              <DropdownMenuItem
                className="flex justify-between cursor-pointer text-green-600"
                onClick={() => onApprove(sekolah)}
              >
                Setujui <Check className="h-4 w-4" />
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex justify-between cursor-pointer text-red-600"
                onClick={() => onReject(sekolah)}
              >
                Tolak <X className="h-4 w-4" />
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    )}
  </div>
);

// Column Factory Functions
export const createSekolahColumns = ({
  isLoading,
  onViewDetails,
  onApprove,
  onReject,
}: {
  isLoading: boolean;
  onViewDetails: (sekolah: SekolahWithDetails) => void;
  onApprove: (sekolah: SekolahWithDetails) => void;
  onReject: (sekolah: SekolahWithDetails) => void;
}): ColumnDef<SekolahWithDetails>[] => [
  {
    id: 'select',
    header: ({ table }) => <SelectAllHeader table={table} />,
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
      <NPSNCell isLoading={isLoading} value={row.getValue('npsn')} />
    ),
    enableSorting: true,
    size: 120,
  },
  {
    accessorKey: 'nama_sekolah',
    header: 'Nama Sekolah',
    cell: ({ row }) => (
      <SekolahNameCell
        isLoading={isLoading}
        value={row.getValue('nama_sekolah')}
      />
    ),
    enableSorting: true,
    size: 300,
  },
  {
    accessorKey: 'nama_kepala_sekolah',
    header: 'Kepala Sekolah',
    cell: ({ row }) => (
      <KepalaSekolahCell
        isLoading={isLoading}
        value={row.getValue('nama_kepala_sekolah')}
      />
    ),
    enableSorting: true,
    size: 200,
  },
  {
    accessorKey: 'kecamatan',
    header: 'Kecamatan',
    cell: ({ row }) => (
      <KecamatanCell isLoading={isLoading} value={row.getValue('kecamatan')} />
    ),
    enableSorting: true,
    size: 150,
  },
  {
    accessorKey: 'phone',
    header: 'Telepon',
    cell: ({ row }) => (
      <PhoneCell isLoading={isLoading} value={row.getValue('phone')} />
    ),
    enableSorting: false,
    size: 140,
  },
  {
    id: 'email',
    header: 'Email',
    cell: ({ row }) => {
      const user = row.original.user;
      return <EmailCell isLoading={isLoading} value={user?.email} />;
    },
    enableSorting: false,
    size: 220,
  },
  {
    id: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const user = row.original.user as { banned?: boolean } | undefined;
      return <StatusCell isLoading={isLoading} banned={user?.banned ?? true} />;
    },
    enableSorting: false,
    size: 170,
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => {
      const sekolah = row.original;
      const user = sekolah.user as { banned: boolean } | undefined;
      return (
        <ActionsCell
          isLoading={isLoading}
          sekolah={sekolah}
          userBanned={user?.banned ?? true}
          onViewDetails={onViewDetails}
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
