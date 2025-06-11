import { Metadata } from 'next';
import { Suspense } from 'react';
import { SignUpPageClient } from './components/sign-up-page-client';

export const metadata: Metadata = {
  title: 'Daftar Sekolah',
  description:
    'Daftarkan sekolah Anda ke dalam Sistem Informasi Sarana Prasarana (SISP) Kabupaten Nias Selatan',
  robots: 'noindex, nofollow',
};

export default function SignUpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUpPageClient />
    </Suspense>
  );
}
