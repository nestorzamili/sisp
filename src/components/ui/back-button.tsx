'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function BackButton() {
  return (
    <Button
      variant="ghost"
      onClick={() => window.history.back()}
      className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      Kembali ke halaman sebelumnya
    </Button>
  );
}
