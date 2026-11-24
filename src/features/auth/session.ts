import 'server-only';
import { cache } from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getAuthSecrets } from './config';
import {
  SESSION_COOKIE,
  sessionCookieOptions,
  signSessionToken,
  verifySessionToken,
  type SessionPayload,
  type VerifiedSession,
} from './token';

export const LOGIN_PATH = '/panel/login';

export async function createSession(payload: SessionPayload): Promise<void> {
  const { token, expiresAt } = await signSessionToken(payload, getAuthSecrets());
  (await cookies()).set(SESSION_COOKIE, token, sessionCookieOptions(expiresAt));
}

export async function deleteSession(): Promise<void> {
  (await cookies()).delete({ name: SESSION_COOKIE, path: '/panel' });
}

/** Memoised per request, so layout + page + actions verify the cookie once. */
export const getSession = cache(async (): Promise<VerifiedSession | null> => {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  return verifySessionToken(token, getAuthSecrets());
});

/** Authoritative check; Proxy's redirect is only optimistic. */
export async function requireSession(): Promise<VerifiedSession> {
  const session = await getSession();
  if (!session) redirect(LOGIN_PATH);
  return session;
}
