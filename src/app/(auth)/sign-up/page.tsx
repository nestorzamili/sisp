import { SignUpForm } from './components/sign-up-form';
import AuthLayout from '../auth-layout';

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
