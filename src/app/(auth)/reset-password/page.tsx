import { Metadata } from 'next';
import { Suspense } from 'react';
import AuthLayout from '../_components/auth-layout';
import ResetPasswordContent from './components/reset-password-content';

export const metadata: Metadata = {
  title: 'Reset Password',
  description: 'Buat password baru yang kuat untuk akun SISP Anda',
  robots: 'noindex, nofollow',
};

export default function ResetPasswordPage() {
  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Buat password baru untuk akun Anda"
    >
      <div className="card-primary p-5 sm:p-6">
        <Suspense
          fallback={
            <div className="text-center py-8">
              <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-muted-foreground text-sm">
                Memuat formulir...
              </p>
            </div>
          }
        >
          <ResetPasswordContent />
        </Suspense>
      </div>
    </AuthLayout>
  );
}
