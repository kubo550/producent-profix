import { describe, expect, it } from 'vitest';
import { SESSION_TTL_DAYS, shouldRefresh, signSessionToken, verifySessionToken } from './token';

const secrets = { sessionSecret: 'x'.repeat(32), panelPassword: 'silosy-test-2026' };
const DAY = 24 * 60 * 60 * 1000;

describe('session token', () => {
  it('round-trips the display name', async () => {
    const { token } = await signSessionToken({ name: 'Janek' }, secrets);
    expect(await verifySessionToken(token, secrets)).toMatchObject({ name: 'Janek' });
  });

  it('is invalidated by changing the panel password', async () => {
    const { token } = await signSessionToken({ name: 'Janek' }, secrets);
    expect(await verifySessionToken(token, { ...secrets, panelPassword: 'nowe-haslo-2026' })).toBeNull();
  });

  it('rejects expired, tampered and missing tokens', async () => {
    const issued = new Date('2026-01-01T00:00:00Z');
    const { token } = await signSessionToken({ name: 'Janek' }, secrets, issued);
    const afterExpiry = new Date(issued.getTime() + (SESSION_TTL_DAYS + 1) * DAY);
    expect(await verifySessionToken(token, secrets, afterExpiry)).toBeNull();
    expect(await verifySessionToken(`${token}x`, secrets, issued)).toBeNull();
    expect(await verifySessionToken(undefined, secrets)).toBeNull();
  });

  it('asks for a refresh only once the session is past its first month', async () => {
    const issued = new Date('2026-01-01T00:00:00Z');
    const { token } = await signSessionToken({ name: 'Janek' }, secrets, issued);
    const session = (await verifySessionToken(token, secrets, issued))!;
    expect(shouldRefresh(session, new Date(issued.getTime() + 5 * DAY))).toBe(false);
    expect(shouldRefresh(session, new Date(issued.getTime() + 31 * DAY))).toBe(true);
  });
});
