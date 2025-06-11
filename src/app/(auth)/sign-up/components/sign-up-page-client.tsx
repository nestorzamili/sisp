'use client';

import { useSearchParams } from 'next/navigation';
import { SignUpForm } from './sign-up-form';
import { RegistrationSuccess } from './registration-success';
import AuthLayout from '../../_components/auth-layout';

export function SignUpPageClient() {
  const searchParams = useSearchParams();
  const isSuccess = searchParams.get('success') === 'true';

  if (isSuccess) {
    return (
      <AuthLayout
        title="Pendaftaran Berhasil!"
        subtitle="Sekolah Anda telah berhasil terdaftar di SISP Kabupaten Nias Selatan"
      >
        <RegistrationSuccess />
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Daftarkan Sekolah"
      subtitle="Buat akun SISP untuk sekolah Anda"
    >
      <SignUpForm />
    </AuthLayout>
  );
}
