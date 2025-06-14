import { createAuthClient } from 'better-auth/react';
import { adminClient } from 'better-auth/client/plugins';

const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  plugins: [adminClient()],
});

export const {
  signIn,
  signUp,
  getSession,
  signOut,
  useSession,
  forgetPassword,
  resetPassword,
  sendVerificationEmail,
} = authClient;
