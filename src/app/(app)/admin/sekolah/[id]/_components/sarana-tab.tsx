'use client';

import { useMemo, useState } from 'react';
import { DataTable } from '@/components/data-table';
import { ColumnDef, RowSelectionState } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { SekolahWithDetails } from '@/types/sekolah';

interface GroupedSarana {
  nama_sarana: string;
  total: number;
  baik: number;
  rusak: number;
  keterangan: string | null;
}

interface SaranaTabProps {
  data: SekolahWithDetails;
}

// SelectCell component similar to review-table
const SelectCell = ({
  isSelected,
  onToggle,
}: {
  isSelected: boolean;
  onToggle: (selected: boolean) => void;
}) => {
  return (
    <Checkbox
      checked={isSelected}
      onCheckedChange={(value) => onToggle(!!value)}
      aria-label="Select row"
    />
  );
};

export function SaranaTab({ data }: SaranaTabProps) {
  // Row selection state
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  // Transform sarana data to array format for DataTable
  const tableData: GroupedSarana[] = useMemo(() => {
    if (!data.sarana || data.sarana.length === 0) return [];

    // Group sarana by name
    const grouped = data.sarana.reduce(
      (acc, sarana) => {
        const name = sarana.nama_sarana;
        if (!acc[name]) {
          acc[name] = {
            total: 0,
            baik: 0,
            rusak: 0,
            keterangan: sarana.keterangan,
          };
        }
        acc[name].total += sarana.jumlah_total;
        acc[name].baik += sarana.jumlah_kondisi_baik;
        acc[name].rusak += sarana.jumlah_kondisi_rusak;
        // Use the first non-null keterangan found
        if (!acc[name].keterangan && sarana.keterangan) {
          acc[name].keterangan = sarana.keterangan;
        }
        return acc;
      },
      {} as Record<
        string,
        {
          total: number;
          baik: number;
          rusak: number;
          keterangan: string | null;
        }
      >,
    );

    // Convert to array format
    return Object.entries(grouped).map(([nama_sarana, saranaData]) => ({
      nama_sarana,
      total: saranaData.total,
      baik: saranaData.baik,
      rusak: saranaData.rusak,
      keterangan: saranaData.keterangan,
    }));
  }, [data.sarana]);

  // Define columns for DataTable
  const columns: ColumnDef<GroupedSarana>[] = useMemo(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <SelectCell
            isSelected={row.getIsSelected()}
            onToggle={(selected) => row.toggleSelected(selected)}
          />
        ),
        enableSorting: false,
        enableHiding: false,
        size: 40,
      },
      {
        accessorKey: 'nama_sarana',
        header: 'Nama Sarana',
        cell: ({ getValue }) => (
          <div className="font-medium">{getValue() as string}</div>
        ),
        enableSorting: false,
        size: 200,
      },
      {
        accessorKey: 'baik',
        header: 'Baik',
        cell: ({ getValue }) => (
          <div className="text-left">{getValue() as number}</div>
        ),
        enableSorting: false,
        size: 80,
      },
      {
        accessorKey: 'rusak',
        header: 'Rusak',
        cell: ({ getValue }) => (
          <div className="text-left">{getValue() as number}</div>
        ),
        enableSorting: false,
        size: 80,
      },
      {
        accessorKey: 'total',
        header: 'Total',
        cell: ({ getValue }) => (
          <div className="text-left">{getValue() as number}</div>
        ),
        enableSorting: false,
        size: 80,
      },
      {
        accessorKey: 'keterangan',
        header: 'Keterangan',
        cell: ({ getValue }) => (
          <div className="text-left">{(getValue() as string) || '-'}</div>
        ),
        enableSorting: false,
        size: 200,
      },
    ],
    [],
  );

  return (
    <div>
      {tableData.length > 0 ? (
        <DataTable
          columns={columns}
          data={tableData}
          pagination={{
            pageIndex: 0,
            pageSize: 10,
          }}
          rowSelection={rowSelection}
          onRowSelectionChange={setRowSelection}
        />
      ) : (
        <p className="text-muted-foreground text-center py-8">
          Belum ada data sarana
        </p>
      )}
    </div>
  );
}
