'use client';

import AuthLayout from '../auth-layout';
import { UserAuthForm } from './components/user-auth-form';
import { LogIn } from 'lucide-react';
import { AuthCard } from '@/app/(auth)/_components/auth-card';
import { TermsFooter } from '@/app/(auth)/_components/auth-footers';

export default function SignIn() {
  return (
    <AuthLayout
      title="Selamat Datang Kembali"
      subtitle="Masuk untuk melanjutkan ke akun Anda"
    >
      <AuthCard title="Masuk" icon={LogIn} footer={<TermsFooter />}>
        <UserAuthForm />
      </AuthCard>
    </AuthLayout>
  );
}
