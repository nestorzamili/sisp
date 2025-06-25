'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function GeneralError() {
  const router = useRouter();

  return (
    <div className="h-svh w-full">
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        <h1 className="text-[7rem] font-bold leading-tight">500</h1>
        <span className="font-medium">Oops! Terjadi kesalahan {`:')`}</span>
        <p className="text-center text-muted-foreground">
          Mohon maaf atas ketidaknyamanannya. <br /> Silakan coba beberapa saat
          lagi.
        </p>
        <div className="mt-6 flex gap-4">
          <Button variant="outline" onClick={() => router.back()}>
            Kembali
          </Button>
          <Button onClick={() => router.push('/')}>Ke Beranda</Button>
        </div>
      </div>
    </div>
  );
}
