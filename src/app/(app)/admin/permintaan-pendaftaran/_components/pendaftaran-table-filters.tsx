'use client';

import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface PendaftaranTableFiltersProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onClearFilters: () => void;
}

export function PendaftaranTableFilters({
  searchValue,
  onSearchChange,
  onClearFilters,
}: PendaftaranTableFiltersProps) {
  const hasActiveFilters = searchValue.length > 0;

  return (
    <div className="flex items-center gap-4">
      {/* Search Bar */}
      <div className="relative w-[400px]">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Cari nama, email, sekolah, NPSN..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={onClearFilters}
          className="shrink-0"
        >
          <X className="h-4 w-4 mr-1" />
          Clear
        </Button>
      )}
    </div>
  );
}
