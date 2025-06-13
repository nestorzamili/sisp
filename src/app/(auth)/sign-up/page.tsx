import { Metadata } from 'next';
import { SignUpForm } from './components/sign-up-form';
import { RegistrationSuccess } from './components/registration-success';
import AuthLayout from '../_components/auth-layout';

export const metadata: Metadata = {
  title: 'Daftar Sekolah',
  description:
    'Daftarkan sekolah Anda ke dalam Sistem Informasi Sarana Prasarana (SISP) Kabupaten Nias Selatan',
  robots: 'noindex, nofollow',
};

interface SignUpPageProps {
  searchParams: Promise<{ success?: string }>;
}

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const params = await searchParams;
  const isSuccess = params.success === 'true';

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
