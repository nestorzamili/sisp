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
        <Suspense>
          <ResetPasswordContent />
        </Suspense>
      </div>
    </AuthLayout>
  );
}
