import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { nextCookies } from 'better-auth/next-js';
import { admin } from 'better-auth/plugins';

import prisma from '@/lib/prisma';
import { hashPassword, verifyPassword } from '@/lib/argon2';
import { sendEmail } from '@/lib/mail';
import { VerificationEmailTemplate } from '@/templates/account-approved';
import { ResetPasswordEmailTemplate } from '@/templates/password-reset-email';
import { ChangeEmailVerificationTemplate } from '@/templates/change-email-verification';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),

  appName: 'SISP SMP Nias Selatan',
  plugins: [
    admin({
      bannedUserMessage:
        'Akun Anda belum diaktifkan. Mohon tunggu persetujuan dari admin',
    }),
    nextCookies(),
  ],

  user: {
    additionalFields: {
      role: {
        type: ['admin', 'user'],
        input: false,
      },
    },
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async ({ user, newEmail, url }) => {
        try {
          await sendEmail({
            to: newEmail,
            subject: 'Verifikasi Perubahan Email - SISP SMP Nias Selatan',
            html: ChangeEmailVerificationTemplate(url, newEmail, user.name),
          });
        } catch (error) {
          throw error;
        }
      },
    },
  },

  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: false,
    password: {
      hash: hashPassword,
      verify: verifyPassword,
    },

    sendResetPassword: async ({ user, url }) => {
      try {
        await sendEmail({
          to: user.email,
          subject: 'Reset Password - SISP MSP Nias Selatan',
          html: ResetPasswordEmailTemplate(url, user.name),
        });
      } catch (error) {
        throw error;
      }
    },
  },

  emailVerification: {
    sendOnSignUp: false,
    autoSignInAfterVerification: true,
    expiresIn: 60 * 60 * 24,
    sendVerificationEmail: async ({ user, url }) => {
      try {
        await sendEmail({
          to: user.email,
          subject: 'Verifikasi Email - SISP SMP Nias Selatan',
          html: VerificationEmailTemplate(url, user.name),
        });
      } catch (error) {
        throw error;
      }
    },
  },
  rateLimit: {
    enabled: true,
    window: 5 * 60, // 5 minutes
    max: 10, // 10 requests per window
    storage: 'database',
    modelName: 'rateLimit',
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  advanced: {
    database: {
      generateId: false,
    },
    ipAddress: {
      ipAddressHeaders: [
        'cf-connecting-ip',
        'x-forwarded-for',
        'x-real-ip',
        'x-client-ip',
      ],
      disableIpTracking: false,
    },
  },

  trustedOrigins: [
    process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    'http://localhost:3223',
  ],
});
