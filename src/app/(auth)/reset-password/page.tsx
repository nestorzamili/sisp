'use client';

import { Suspense } from 'react';
import AuthLayout from '../auth-layout';
import { KeyRound } from 'lucide-react';
import ResetPasswordContent from './components/reset-password-content';
import { AuthCard } from '@/app/(auth)/_components/auth-card';

export default function ResetPassword() {
  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Buat password baru untuk akun Anda"
    >
      <AuthCard title="Buat Password Baru" icon={KeyRound}>
        <Suspense
          fallback={
            <p className="text-center py-4 text-muted-foreground">
              Memuat formulir...
            </p>
          }
        >
          <ResetPasswordContent />
        </Suspense>
      </AuthCard>
    </AuthLayout>
  );
}
