'use client';

import { useState } from 'react';
import {
  School,
  Users,
  Building2,
  Target,
  BookOpen,
  FileText,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SekolahWithDetails } from '@/types/sekolah';
import { InfoTab } from './info-tab';
import { GuruTab } from './guru-tab';
import { SaranaTab } from './sarana-tab';
import { PrasaranaTab } from './prasarana-tab';
import { RombelTab } from './rombel-tab';
import { PrioritasTab } from './prioritas-tab';
import { LampiranTab } from './lampiran-tab';

interface ReviewDetailCardProps {
  data: SekolahWithDetails;
  onApprove: () => void;
  onRequestRevision: () => void;
  isLoading?: boolean;
}

export function ReviewDetailCard({
  data,
  onApprove,
  onRequestRevision,
  isLoading = false,
}: ReviewDetailCardProps) {
  const [selectedTab, setSelectedTab] = useState<
    | 'info'
    | 'guru'
    | 'sarana'
    | 'prasarana'
    | 'rombel'
    | 'prioritas'
    | 'lampiran'
  >('info');

  // Helper functions to calculate totals
  const getTotalGuru = () => {
    if (!data.guru) return 0;
    return data.guru.reduce((total, guru) => total + guru.jumlah, 0);
  };

  const getTotalSiswa = () => {
    if (!data.rombonganBelajar) return 0;
    return data.rombonganBelajar.reduce(
      (total, rombel) => total + rombel.jumlah_siswa,
      0,
    );
  };

  const tabs = [
    { id: 'info', label: 'Informasi Dasar', icon: School },
    { id: 'guru', label: 'Data Guru', icon: Users, count: getTotalGuru() },
    {
      id: 'rombel',
      label: 'Rombongan Belajar',
      icon: BookOpen,
      count: getTotalSiswa(),
    },
    {
      id: 'sarana',
      label: 'Sarana',
      icon: Building2,
      count: data.sarana?.length,
    },
    {
      id: 'prasarana',
      label: 'Prasarana',
      icon: Building2,
      count: data.prasarana?.length,
    },
    {
      id: 'prioritas',
      label: 'Kebutuhan Prioritas',
      icon: Target,
      count: data.kebutuhanPrioritas?.length,
    },
    {
      id: 'lampiran',
      label: 'Lampiran',
      icon: FileText,
      count: data.lampiran?.length,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">{data.nama_sekolah}</h1>{' '}
          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <School className="h-4 w-4" />
              NPSN: {data.npsn}
            </span>{' '}
            <Badge
              variant="secondary"
              className={
                data.status === 'PENDING'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-red-100 text-red-800'
              }
            >
              {data.status === 'PENDING' ? 'Menunggu Review' : 'Ditolak'}
            </Badge>
            {data.status === 'REJECTED' && data.reviewedBy && (
              <span className="text-xs text-red-600">
                oleh {data.reviewedBy.name}
              </span>
            )}
          </div>
        </div>{' '}
        <div className="flex gap-2">
          {data.status === 'PENDING' && (
            <Button
              variant="outline"
              onClick={onRequestRevision}
              disabled={isLoading}
              className="text-orange-600 border-orange-600 hover:bg-orange-50"
            >
              Minta Revisi
            </Button>
          )}
          <Button
            onClick={onApprove}
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-700"
          >
            Setuju
          </Button>{' '}
        </div>
      </div>
      {/* Review Notes for Rejected Status */}
      {data.status === 'REJECTED' && data.reviewNotes && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <FileText className="h-5 w-5 text-red-600 mt-0.5" />
            </div>
            <div className="flex-1">
              {' '}
              <h3 className="font-medium text-red-900 mb-2">
                Catatan Penolakan
              </h3>
              <p className="text-red-800 text-sm leading-relaxed">
                {data.reviewNotes}
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Tab Navigation */}
      <div className="border-b">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as typeof selectedTab)}
                className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  selectedTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
                {tab.count !== undefined && tab.count > 0 && (
                  <Badge variant="secondary" className="ml-1 h-5 text-xs">
                    {tab.count}
                  </Badge>
                )}
              </button>
            );
          })}
        </nav>
      </div>{' '}
      {/* Tab Content */}
      <div className="space-y-6">
        {selectedTab === 'info' && <InfoTab data={data} />}
        {selectedTab === 'guru' && <GuruTab data={data} />}
        {selectedTab === 'sarana' && <SaranaTab data={data} />}
        {selectedTab === 'prasarana' && <PrasaranaTab data={data} />}
        {selectedTab === 'rombel' && <RombelTab data={data} />}
        {selectedTab === 'prioritas' && <PrioritasTab data={data} />}
        {selectedTab === 'lampiran' && <LampiranTab data={data} />}
      </div>
    </div>
  );
}
