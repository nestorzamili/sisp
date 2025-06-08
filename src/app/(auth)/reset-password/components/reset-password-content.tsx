'use client';

import { ResetForm } from './reset-password-form';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

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
        console.error('Error validating token:', error);
        setTokenValid(false);
      } finally {
        setIsValidating(false);
      }
    };

    validateToken();
  }, [token]);

  if (isValidating) {
    return (
      <div className="w-full text-center py-4">
        <p className="text-sm text-muted-foreground">
          Memverifikasi link reset password...
        </p>
      </div>
    );
  }

  if (!token || !tokenValid) {
    return (
      <div className="w-full space-y-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Link reset password tidak valid atau sudah kedaluwarsa.
          </AlertDescription>
        </Alert>

        <div className="flex flex-col items-center gap-3 pt-2">
          <p className="text-sm text-center text-muted-foreground">
            Silakan minta link reset password yang baru.
          </p>
          <Link href="/forgot-password" className="w-full">
            <Button variant="outline" className="w-full">
              Minta Link Baru
            </Button>
          </Link>
        </div>

        <div className="text-center text-sm pt-2">
          <p className="text-muted-foreground">
            Sudah ingat password?{' '}
            <Link
              href="/sign-in"
              className="text-primary font-medium hover:underline"
            >
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-4 sm:mb-5">
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Buat password baru yang kuat untuk akun Anda. Password harus
          mengandung minimal 8 karakter dengan kombinasi huruf besar, kecil,
          angka, dan simbol.
        </p>
      </div>

      <ResetForm token={token} />

      <div className="text-center text-sm mt-4 pt-3 border-t border-border">
        <p className="text-muted-foreground">
          Sudah ingat password?{' '}
          <Link
            href="/sign-in"
            className="text-primary font-medium hover:underline"
          >
            Masuk di sini
          </Link>
        </p>
      </div>
    </div>
  );
}
