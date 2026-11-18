/** After this many days without confirmation a silo is flagged "do weryfikacji". */
export const STALE_AFTER_DAYS = 45;

/** GPS fixes worse than this (metres) trigger a warning in the form. */
export const POOR_ACCURACY_M = 50;

export const NAME_MAX = 120;
export const COMMENT_MAX = 1000;

export const LOCATION_SOURCES = ['gps', 'manual', 'address'] as const;
export type LocationSource = (typeof LOCATION_SOURCES)[number];

export type Coordinates = {
  lat: number;
  lng: number;
};

export type Silo = Coordinates & {
  id: string;
  name: string;
  comment: string | null;
  accuracyM: number | null;
  source: LocationSource;
  createdAt: Date;
  createdBy: string;
  /** Last time someone confirmed the silo is still at this spot (create, move, "Nadal stoi"). */
  verifiedAt: Date;
  verifiedBy: string;
  updatedAt: Date;
  updatedBy: string;
  collectedAt: Date | null;
  collectedBy: string | null;
};

const DAY_MS = 24 * 60 * 60 * 1000;

export function daysSince(date: Date, now: Date): number {
  return Math.max(0, Math.floor((now.getTime() - date.getTime()) / DAY_MS));
}

export function isCollected(silo: Pick<Silo, 'collectedAt'>): boolean {
  return silo.collectedAt !== null;
}

export function isStale(silo: Pick<Silo, 'verifiedAt' | 'collectedAt'>, now: Date): boolean {
  return !isCollected(silo) && daysSince(silo.verifiedAt, now) >= STALE_AFTER_DAYS;
}

/** Stale silos first (oldest confirmation first), then the rest by newest activity. */
export function sortForReview<T extends Pick<Silo, 'verifiedAt' | 'collectedAt'>>(
  silos: readonly T[],
  now: Date,
): T[] {
  return [...silos].sort((a, b) => {
    const aStale = isStale(a, now);
    const bStale = isStale(b, now);
    if (aStale !== bStale) return aStale ? -1 : 1;
    return aStale
      ? a.verifiedAt.getTime() - b.verifiedAt.getTime()
      : b.verifiedAt.getTime() - a.verifiedAt.getTime();
  });
}

export function hasMoved(before: Coordinates, after: Coordinates): boolean {
  return before.lat !== after.lat || before.lng !== after.lng;
}
