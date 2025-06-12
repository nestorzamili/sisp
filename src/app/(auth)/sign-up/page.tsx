import { Metadata } from 'next';
import { SignUpPageClient } from './components/sign-up-page-client';

export const metadata: Metadata = {
  title: 'Daftar Sekolah',
  description:
    'Daftarkan sekolah Anda ke dalam Sistem Informasi Sarana Prasarana (SISP) Kabupaten Nias Selatan',
  robots: 'noindex, nofollow',
};

export default function SignUpPage() {
  return <SignUpPageClient />;
}
