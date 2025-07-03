import { Metadata } from 'next';
import AuthLayout from '../_components/auth-layout';
import { ForgotForm } from './components/forgot-password-form';

export const metadata: Metadata = {
  title: 'Lupa Password',
  description:
    'Reset password akun SISP Anda dengan memasukkan alamat email yang terdaftar',
};

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Lupa Password?"
      subtitle="Masukkan email Anda untuk menerima link reset password"
    >
      <div className="card-primary p-5 sm:p-6">
        <ForgotForm />
      </div>
    </AuthLayout>
  );
}
