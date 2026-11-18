'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getSql } from '@/lib/db';
import * as z from 'zod';
import { loginSchema } from './schema';
import { getAuthSecrets } from './config';
import { passwordMatches } from './password';
import { PgLoginRateLimiter, WINDOW_MINUTES } from './rateLimit';
import { createSession, deleteSession, LOGIN_PATH } from './session';

export type LoginState = {
  error?: string;
  fieldErrors?: Partial<Record<'password' | 'displayName', string[]>>;
  /** Echoed back so the name field survives a wrong password. */
  displayName?: string;
};

const PANEL_HOME = '/panel/silosy';

async function clientIp(): Promise<string> {
  const h = await headers();
  // Vercel overwrites x-forwarded-for with the real client IP, so it cannot be spoofed there.
  return h.get('x-forwarded-for')?.split(',')[0]?.trim() || h.get('x-real-ip') || 'unknown';
}

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const parsed = loginSchema.safeParse(Object.fromEntries(formData));
  const displayName = String(formData.get('displayName') ?? '');
  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors, displayName };
  }

  const ip = await clientIp();
  const limiter = new PgLoginRateLimiter(getSql());

  if (await limiter.isBlocked(ip)) {
    return { error: `Za dużo nieudanych prób. Spróbuj ponownie za ${WINDOW_MINUTES} minut.`, displayName };
  }

  if (!passwordMatches(parsed.data.password, getAuthSecrets().panelPassword)) {
    await limiter.recordFailure(ip);
    return { error: 'Nieprawidłowe hasło.', displayName };
  }

  await limiter.reset(ip);
  await createSession({ name: parsed.data.displayName });
  redirect(PANEL_HOME);
}

export async function logout(): Promise<void> {
  await deleteSession();
  redirect(LOGIN_PATH);
}
