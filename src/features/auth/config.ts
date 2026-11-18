import type { TokenSecrets } from './token';

/**
 * Shared password + per-IP rate limit is only as strong as the password, hence
 * the length floor. No `server-only`: Proxy imports this too.
 */
export const MIN_PASSWORD_LENGTH = 12;
const MIN_SECRET_LENGTH = 32;

export function getAuthSecrets(): TokenSecrets {
  const sessionSecret = process.env.SESSION_SECRET ?? '';
  const panelPassword = process.env.PANEL_PASSWORD ?? '';

  const problems = [
    sessionSecret.length < MIN_SECRET_LENGTH && `SESSION_SECRET (min. ${MIN_SECRET_LENGTH} chars)`,
    panelPassword.length < MIN_PASSWORD_LENGTH && `PANEL_PASSWORD (min. ${MIN_PASSWORD_LENGTH} chars)`,
  ].filter(Boolean);
  if (problems.length) throw new Error(`Panel auth misconfigured, set: ${problems.join(', ')}`);

  return { sessionSecret, panelPassword };
}
