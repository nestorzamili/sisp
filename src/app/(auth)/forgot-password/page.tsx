'use client';

import AuthLayout from '../auth-layout';
import { ForgotForm } from './components/forgot-password-form';
import { AlertCircle } from 'lucide-react';
import { AuthCard } from '@/app/(auth)/_components/auth-card';
import { BackToLoginLink } from '@/app/(auth)/_components/auth-footers';

export default function ForgotPassword() {
  return (
    <AuthLayout
      title="Lupa Password?"
      subtitle="Masukkan email Anda untuk menerima link reset password"
    >
      <AuthCard
        title="Reset Password"
        icon={AlertCircle}
        footer={<BackToLoginLink />}
      >
        <div className="mb-4 sm:mb-5">
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Masukkan alamat email yang terdaftar di akun Anda. Kami akan
            mengirimkan link untuk mereset password.
          </p>
        </div>

        <ForgotForm />
      </AuthCard>
    </AuthLayout>
  );
}
