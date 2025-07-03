import { Metadata } from 'next';
import { Suspense } from 'react';
import AuthLayout from '../_components/auth-layout';
import { UserAuthForm } from './components/user-auth-form';

export const metadata: Metadata = {
  title: 'Masuk',
  description:
    'Masuk ke akun SISP Anda untuk mengakses sistem informasi sarana prasarana sekolah',
};

export default function SignInPage() {
  return (
    <AuthLayout
      title="Selamat Datang Kembali"
      subtitle="Masuk untuk melanjutkan ke akun Anda"
    >
      <div className="card-primary p-5 sm:p-6">
        <Suspense>
          <UserAuthForm />
        </Suspense>
      </div>
    </AuthLayout>
  );
}
