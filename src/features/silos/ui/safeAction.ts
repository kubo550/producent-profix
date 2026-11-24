import type { ActionResult } from '../actions';

export const OFFLINE_MESSAGE = 'Brak połączenia z internetem. Spróbuj ponownie, gdy złapiesz zasięg.';

/** Without signal a server action call rejects, and a rejection in a transition hits the error boundary. */
export async function safeAction<T extends { ok: boolean }>(
  call: () => Promise<T>,
  offline: () => T,
): Promise<T> {
  try {
    return await call();
  } catch (err) {
    console.error('[silos] request failed', err);
    return offline();
  }
}

export const offlineResult = (): ActionResult => ({ ok: false, error: OFFLINE_MESSAGE });
