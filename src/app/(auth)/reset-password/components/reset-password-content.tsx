'use client';

import { ResetForm } from './reset-password-form';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IconAlertCircle, IconKey } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AuthLink } from '@/app/(auth)/_components/auth-footers';
import logger from '@/lib/logger';

export default function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams?.get('token');
  const [isValidating, setIsValidating] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      // Small delay to prevent UI flash
      await new Promise((resolve) => setTimeout(resolve, 100));

      if (!token) {
        setIsValidating(false);
        return;
      }

      try {
        // Simple token validation (in a real app, you'd verify this with your backend)
        setTokenValid(token.length > 0);
      } catch (error) {
        logger.error('Error validating token:', error);
        setTokenValid(false);
      } finally {
        setIsValidating(false);
      }
    };

    validateToken();
  }, [token]);

  if (isValidating) {
    return (
      <div className="w-full text-center py-8">
        <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-sm text-muted-foreground">
          Memverifikasi link reset password...
        </p>
      </div>
    );
  }

  if (!token || !tokenValid) {
    return (
      <div className="w-full space-y-4">
        {/* Header with Icon */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-red-500/10 rounded-lg">
              <IconAlertCircle className="h-5 w-5 text-red-600" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">
              Link Tidak Valid
            </h2>
          </div>
        </div>

        <Alert variant="destructive">
          <IconAlertCircle className="h-4 w-4" />
          <AlertDescription>
            Link reset password tidak valid atau sudah kedaluwarsa.
          </AlertDescription>
        </Alert>

        <div className="flex flex-col items-center gap-3 pt-2">
          <p className="text-sm text-center text-muted-foreground">
            Silakan minta link reset password yang baru.
          </p>
          <Link href="/forgot-password" className="w-full">
            <Button variant="outline" className="w-full h-9 sm:h-10 text-sm">
              Minta Link Baru
            </Button>
          </Link>
        </div>

        <AuthLink
          question="Sudah ingat password?"
          linkText="Masuk di sini"
          href="/sign-in"
        />
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header with Icon */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <IconKey className="h-5 w-5 text-blue-600" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">
            Buat Password Baru
          </h2>
        </div>
      </div>

      <div className="mb-4 sm:mb-5">
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed text-center">
          Buat password baru yang kuat untuk akun Anda. Password harus
          mengandung minimal 8 karakter dengan kombinasi huruf besar, kecil,
          angka, dan simbol.
        </p>
      </div>

      <ResetForm token={token} />
    </div>
  );
}
