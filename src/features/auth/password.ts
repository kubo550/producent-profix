import 'server-only';
import { createHash, timingSafeEqual } from 'node:crypto';

/**
 * Constant-time comparison. Hashing both sides first gives equal-length
 * buffers, so neither the content nor the length of the real password leaks
 * through response timing.
 */
export function passwordMatches(candidate: string, expected: string): boolean {
  const a = createHash('sha256').update(candidate).digest();
  const b = createHash('sha256').update(expected).digest();
  return timingSafeEqual(a, b);
}
