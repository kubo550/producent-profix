import { SignJWT, jwtVerify } from 'jose';

export const SESSION_COOKIE = 'profix_panel';
export const SESSION_TTL_DAYS = 90;
/** Proxy re-issues the cookie once less than this is left. */
export const SESSION_REFRESH_BELOW_DAYS = 60;

const DAY_S = 24 * 60 * 60;

export type SessionPayload = {
  /** Display name typed at login; shown as "dodał: ..." on pins. */
  name: string;
};

export type VerifiedSession = SessionPayload & { expiresAt: Date };

export type TokenSecrets = { sessionSecret: string; panelPassword: string };

/**
 * Derived from SESSION_SECRET and PANEL_PASSWORD, so changing the password invalidates
 * every issued session - that is how a former employee is locked out.
 * This module avoids `server-only` and Next APIs because Proxy imports it too.
 */
async function deriveKey({ sessionSecret, panelPassword }: TokenSecrets): Promise<Uint8Array> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(sessionSecret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  return new Uint8Array(await crypto.subtle.sign('HMAC', key, enc.encode(panelPassword)));
}

export async function signSessionToken(
  payload: SessionPayload,
  secrets: TokenSecrets,
  now: Date = new Date(),
): Promise<{ token: string; expiresAt: Date }> {
  const issuedAt = Math.floor(now.getTime() / 1000);
  const exp = issuedAt + SESSION_TTL_DAYS * DAY_S;
  const token = await new SignJWT({ name: payload.name })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt(issuedAt)
    .setExpirationTime(exp)
    .sign(await deriveKey(secrets));
  return { token, expiresAt: new Date(exp * 1000) };
}

/** Returns null for any invalid, expired or tampered token - never throws. */
export async function verifySessionToken(
  token: string | undefined,
  secrets: TokenSecrets,
  now: Date = new Date(),
): Promise<VerifiedSession | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, await deriveKey(secrets), {
      algorithms: ['HS256'],
      currentDate: now,
    });
    if (typeof payload.name !== 'string' || !payload.name || typeof payload.exp !== 'number') {
      return null;
    }
    return { name: payload.name, expiresAt: new Date(payload.exp * 1000) };
  } catch {
    return null;
  }
}

export function shouldRefresh(session: VerifiedSession, now: Date = new Date()): boolean {
  return session.expiresAt.getTime() - now.getTime() < SESSION_REFRESH_BELOW_DAYS * DAY_S * 1000;
}

export function sessionCookieOptions(expiresAt: Date) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/panel',
    expires: expiresAt,
  };
}
