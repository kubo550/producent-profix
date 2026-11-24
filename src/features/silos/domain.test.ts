import { describe, expect, it } from 'vitest';
import { daysSince, hasMoved, isStale, sortForReview, STALE_AFTER_DAYS } from './domain';

const NOW = new Date('2026-11-15T12:00:00Z');
const daysAgo = (n: number) => new Date(NOW.getTime() - n * 24 * 60 * 60 * 1000);

describe('daysSince', () => {
  it('counts whole days and never goes negative', () => {
    expect(daysSince(daysAgo(3), NOW)).toBe(3);
    expect(daysSince(new Date(NOW.getTime() + 60_000), NOW)).toBe(0);
  });
});

describe('isStale', () => {
  it('flags active silos at the threshold', () => {
    expect(isStale({ verifiedAt: daysAgo(STALE_AFTER_DAYS - 1), collectedAt: null }, NOW)).toBe(false);
    expect(isStale({ verifiedAt: daysAgo(STALE_AFTER_DAYS), collectedAt: null }, NOW)).toBe(true);
  });

  it('never flags collected silos', () => {
    expect(isStale({ verifiedAt: daysAgo(400), collectedAt: daysAgo(1) }, NOW)).toBe(false);
  });
});

describe('sortForReview', () => {
  it('puts stale first (oldest first), then fresh by newest confirmation', () => {
    const silos = [
      { id: 'fresh-old', verifiedAt: daysAgo(10), collectedAt: null },
      { id: 'stale-recent', verifiedAt: daysAgo(50), collectedAt: null },
      { id: 'fresh-new', verifiedAt: daysAgo(1), collectedAt: null },
      { id: 'stale-oldest', verifiedAt: daysAgo(90), collectedAt: null },
    ];
    expect(sortForReview(silos, NOW).map((s) => s.id)).toEqual([
      'stale-oldest',
      'stale-recent',
      'fresh-new',
      'fresh-old',
    ]);
  });

  it('does not mutate the input', () => {
    const silos = [
      { verifiedAt: daysAgo(1), collectedAt: null },
      { verifiedAt: daysAgo(90), collectedAt: null },
    ];
    const copy = [...silos];
    sortForReview(silos, NOW);
    expect(silos).toEqual(copy);
  });
});

describe('hasMoved', () => {
  it('compares coordinates exactly', () => {
    expect(hasMoved({ lat: 50, lng: 19 }, { lat: 50, lng: 19 })).toBe(false);
    expect(hasMoved({ lat: 50, lng: 19 }, { lat: 50.0001, lng: 19 })).toBe(true);
  });
});
