'use client';

import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { KECAMATAN_LIST } from '@/constants/kecamatan';

interface SekolahTableFiltersProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  selectedKecamatan: string;
  onKecamatanChange: (value: string) => void;
  onClearFilters: () => void;
}

export function SekolahTableFilters({
  searchValue,
  onSearchChange,
  selectedKecamatan,
  onKecamatanChange,
  onClearFilters,
}: SekolahTableFiltersProps) {
  const hasActiveFilters =
    searchValue || (selectedKecamatan && selectedKecamatan !== 'all');

  return (
    <div className="flex items-center gap-4">
      {' '}
      {/* Search Bar */}
      <div className="relative w-[300px]">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Cari sekolah, NPSN, kepala sekolah..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
      {/* Kecamatan Filter */}
      <Select value={selectedKecamatan} onValueChange={onKecamatanChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Pilih kecamatan" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Semua Kecamatan</SelectItem>
          {KECAMATAN_LIST.map((kecamatan) => (
            <SelectItem key={kecamatan} value={kecamatan}>
              {kecamatan}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
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
