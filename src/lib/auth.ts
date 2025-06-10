import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { nextCookies } from 'better-auth/next-js';

import prisma from '@/lib/prisma';
import { hashPassword, verifyPassword } from '@/lib/argon2';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  plugins: [nextCookies()],

  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    password: {
      hash: hashPassword,
      verify: verifyPassword,
    },
  },

  rateLimit: {
    enabled: true,
    storage: 'database',
    modelName: 'rateLimit',
    window: 5 * 60,
    max: 1,
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
