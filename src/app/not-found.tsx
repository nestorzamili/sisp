'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Home, ArrowLeft, AlertCircle } from 'lucide-react';

export default function NotFoundError() {
  const router = useRouter();
  return (
    <div className="min-h-svh bg-background">
      <div className="container mx-auto flex h-svh flex-col items-center justify-center px-4">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 opacity-20 blur-xl"></div>
          <h1 className="relative text-8xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent sm:text-9xl">
            404
          </h1>
        </div>
        {/* Icon */}
        <div className="mb-6 rounded-full bg-red-100 p-4 dark:bg-red-900/20">
          <AlertCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
        </div>
        {/* Content */}
        <div className="text-center space-y-4 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white sm:text-3xl">
            Ups! Halaman Tidak Ditemukan
          </h2>
          <p className="max-w-md text-gray-600 dark:text-gray-400 leading-relaxed">
            Sepertinya halaman yang Anda cari tidak ada atau telah dipindahkan.
          </p>
        </div>
        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Button
            variant="outline"
            className="group transition-all duration-200 hover:scale-105 hover:shadow-lg"
            onClick={() => router.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Kembali
          </Button>
          <Button
            className="group bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:from-blue-700 hover:to-indigo-700"
            onClick={() => router.push('/')}
          >
            <Home className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
            Ke Beranda
          </Button>{' '}
        </div>
      </div>
    </div>
  );
}
