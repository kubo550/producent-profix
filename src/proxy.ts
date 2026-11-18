import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';
import { routing } from './i18n/routing';
import { isPanelPath, panelProxy } from './features/auth/panelProxy';

const intlMiddleware = createMiddleware(routing);

export default function proxy(req: NextRequest) {
  // The employee panel lives outside the localized site (PL only, no /pl prefix).
  if (isPanelPath(req.nextUrl.pathname)) return panelProxy(req);
  return intlMiddleware(req);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
