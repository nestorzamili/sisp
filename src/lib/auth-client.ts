import { createAuthClient } from 'better-auth/react';
import { adminClient } from 'better-auth/client/plugins';

const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
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
  changeEmail,
  changePassword,
  updateUser,
} = authClient;
