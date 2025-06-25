'use client';

import { useState, useRef } from 'react';
import { BroadcastForm } from './_components/broadcast-form';
import { BroadcastStats } from './_components/broadcast-stats';
import { BroadcastHistory } from './_components/broadcast-history';

export default function BroadcastPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const historyRef = useRef<{ refresh: () => void } | null>(null);
  const statsRef = useRef<{ refresh: () => void } | null>(null);

  const handleBroadcastSuccess = () => {
    // Refresh history and stats
    setRefreshKey((prev) => prev + 1);
    historyRef.current?.refresh();
    statsRef.current?.refresh();
  };
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Broadcast Notification
          </h1>
          <p className="text-muted-foreground">
            Kirim notifikasi ke pengguna berdasarkan target audience yang
            dipilih
          </p>
        </div>{' '}
        <div className="flex items-center">
          <BroadcastForm onSuccess={handleBroadcastSuccess} />
        </div>
      </div>{' '}
      {/* Stats Section */}
      <BroadcastStats key={`stats-${refreshKey}`} />
      {/* Broadcast History */}
      <BroadcastHistory key={`history-${refreshKey}`} />
    </div>
  );
}
