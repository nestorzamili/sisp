import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { nextCookies } from 'better-auth/next-js';

import prisma from '@/lib/prisma';
import { hashPassword, verifyPassword } from '@/lib/argon2';
import { sendEmail } from '@/lib/mail';
import { VerificationEmailTemplate } from '@/components/emails/verification-email';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  plugins: [nextCookies()],

  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: false,
    password: {
      hash: hashPassword,
      verify: verifyPassword,
    },
  },

  emailVerification: {
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      try {
        await sendEmail({
          to: user.email,
          subject: 'Verifikasi Email - SISP Nias Selatan',
          html: VerificationEmailTemplate(url, user.name),
        });
      } catch (error) {
        throw error;
      }
    },
  },

  rateLimit: {
    enabled: true,
    storage: 'database',
    modelName: 'rateLimit',
    window: 5 * 60,
    max: 1,
  },

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds
    },
  },

  advanced: {
    database: {
      generateId: false,
    },
    ipAddress: {
      ipAddressHeaders: ['x-client-ip', 'x-forwarded-for', 'x-real-ip'],
      disableIpTracking: false,
    },
  },
});
