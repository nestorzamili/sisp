import { ulid } from 'ulid';

export const prefixes = {
  accounts: 'acc',
  rate_limits: 'rtl',
  sessions: 'ses',
  users: 'usr',
  verifications: 'ver',
} as const;

export function createID(prefix: keyof typeof prefixes): string {
  return [prefixes[prefix], ulid()].join('_');
}
