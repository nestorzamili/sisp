import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, Search, ArrowLeft, FileX } from 'lucide-react';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Logo Section */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <Image
            src="/logo-nias-selatan.png"
            alt="Logo Nias Selatan"
            width={60}
            height={60}
            className="object-contain"
          />
          <div className="text-left">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              SISP
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              SMP Nias Selatan
            </p>
          </div>
        </div>

        {/* Main 404 Content */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
          <CardContent className="p-12">
            {/* 404 Icon */}
            <div className="relative mb-8">
              <div className="mx-auto w-32 h-32 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <FileX className="w-16 h-16 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">!</span>
              </div>
            </div>

            {/* Error Message */}
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Halaman Tidak Ditemukan
              </h2>
              <div className="text-6xl font-black text-blue-600 dark:text-blue-400 mb-4">
                404
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
                Maaf, halaman yang Anda cari tidak dapat ditemukan.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Halaman mungkin telah dipindahkan, dihapus, atau URL tidak
                valid.
              </p>
            </div>

            {/* Suggestions */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                Apa yang dapat Anda lakukan?
              </h3>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2 text-left">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                  Periksa kembali URL yang Anda masukkan
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                  Kembali ke halaman utama dan navigasi dari sana
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                  Gunakan fitur pencarian untuk menemukan konten yang Anda
                  butuhkan
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                  Hubungi administrator jika masalah berlanjut
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="font-medium">
                <Link href="/" className="flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Kembali ke Beranda
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="font-medium"
              >
                <Link href="/sign-in" className="flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  Masuk ke Sistem
                </Link>
              </Button>
            </div>

            {/* Back Button */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="ghost"
                onClick={() => window.history.back()}
                className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali ke halaman sebelumnya
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer Info */}
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-8">
          Sistem Informasi Sarana dan Prasarana (SISP) - Dinas Pendidikan
          Kabupaten Nias Selatan
        </p>
      </div>
    </div>
  );
}
