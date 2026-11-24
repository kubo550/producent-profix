import { NextResponse, type NextRequest } from 'next/server';
import { getAuthSecrets } from './config';
import {
  SESSION_COOKIE,
  sessionCookieOptions,
  shouldRefresh,
  signSessionToken,
  verifySessionToken,
  type VerifiedSession,
} from './token';

export const PANEL_PREFIX = '/panel';
const LOGIN = '/panel/login';
const HOME = '/panel/silosy';

export function isPanelPath(pathname: string): boolean {
  return pathname === PANEL_PREFIX || pathname.startsWith(`${PANEL_PREFIX}/`);
}

function readSession(req: NextRequest): Promise<VerifiedSession | null> {
  return verifySessionToken(req.cookies.get(SESSION_COOKIE)?.value, getAuthSecrets());
}

/**
 * Optimistic guard only (cookie, no DB); pages and actions re-check via getSession.
 * Also slides the expiry so a driver who opens the app regularly never gets logged out.
 */
export async function panelProxy(req: NextRequest): Promise<NextResponse> {
  const { pathname } = req.nextUrl;
  const session = await readSession(req);

  if (pathname === LOGIN) {
    return session ? NextResponse.redirect(new URL(HOME, req.nextUrl)) : NextResponse.next();
  }
  if (!session) {
    return NextResponse.redirect(new URL(LOGIN, req.nextUrl));
  }

  const res = NextResponse.next();
  if (shouldRefresh(session)) {
    const { token, expiresAt } = await signSessionToken({ name: session.name }, getAuthSecrets());
    res.cookies.set(SESSION_COOKIE, token, sessionCookieOptions(expiresAt));
  }
  return res;
}
