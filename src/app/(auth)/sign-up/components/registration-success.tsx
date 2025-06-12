import { CheckCircle, Clock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function RegistrationSuccess() {
  return (
    <div className="card-primary p-5 sm:p-6">
      <div className="text-center space-y-6">
        {/* Success Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>

        {/* Success Message */}
        <h2 className="text-lg sm:text-xl font-semibold text-foreground">
          Pendaftaran Berhasil
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Akun Anda telah terdaftar dan sedang menunggu verifikasi dari admin.
        </p>

        {/* Status Info */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-center justify-center gap-2">
            <Clock className="w-5 h-5 text-amber-600" />
            <p className="font-medium text-amber-800 text-sm sm:text-base">
              Menunggu Verifikasi Admin
            </p>
          </div>
          <p className="text-amber-700 text-xs sm:text-sm mt-1">
            Estimasi aktivasi: 1 hari kerja
          </p>
        </div>

        {/* Info */}
        <p className="text-xs sm:text-sm text-muted-foreground">
          Anda akan diberi notifikasi melalui email atau WhatsApp saat akun
          aktif.
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3 w-full">
          <Link href="/" className="w-full">
            <Button
              variant="outline"
              className="w-full h-9 sm:h-10 text-sm gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Beranda
            </Button>
          </Link>
          <Link href="/sign-in" className="w-full">
            <Button className="btn-primary w-full h-9 sm:h-10 text-sm">
              Masuk
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
