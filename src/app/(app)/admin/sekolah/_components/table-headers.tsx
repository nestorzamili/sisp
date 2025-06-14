import { Checkbox } from '@/components/ui/checkbox';
import { Table } from '@tanstack/react-table';

// Reusable table header components
export const SelectAllHeader = <T,>({ table }: { table: Table<T> }) => (
  <Checkbox
    checked={
      table.getIsAllPageRowsSelected() ||
      (table.getIsSomePageRowsSelected() && 'indeterminate')
    }
    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    aria-label="Select all"
  />
);

export const SortableHeader = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`flex items-center gap-2 ${className || ''}`}>{children}</div>
);
