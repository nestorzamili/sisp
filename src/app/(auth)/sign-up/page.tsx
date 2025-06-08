import { Metadata } from 'next';
import { SignUpForm } from './components/sign-up-form';
import AuthLayout from '../_components/auth-layout';

export const metadata: Metadata = {
  title: 'Daftar Sekolah',
  description:
    'Daftarkan sekolah Anda ke dalam Sistem Informasi Sarana Prasarana (SISP) Kabupaten Nias Selatan',
  robots: 'noindex, nofollow',
};

export default function SignUpPage() {
  return (
    <AuthLayout
      title="Daftarkan Sekolah"
      subtitle="Buat akun SISP untuk sekolah Anda"
    >
      <SignUpForm />
    </AuthLayout>
  );
}
