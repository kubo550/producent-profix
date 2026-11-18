import { daysSince, isStale, type LocationSource, type Silo } from './domain';

/** Derived values are computed on the server so client code never reimplements the staleness rule. */
export type SiloDto = {
  id: string;
  name: string;
  comment: string | null;
  lat: number;
  lng: number;
  accuracyM: number | null;
  source: LocationSource;
  createdBy: string;
  createdAt: string;
  verifiedBy: string;
  daysSinceVerified: number;
  stale: boolean;
  collectedAt: string | null;
  collectedBy: string | null;
};

export function toSiloDto(silo: Silo, now: Date): SiloDto {
  return {
    id: silo.id,
    name: silo.name,
    comment: silo.comment,
    lat: silo.lat,
    lng: silo.lng,
    accuracyM: silo.accuracyM,
    source: silo.source,
    createdBy: silo.createdBy,
    createdAt: silo.createdAt.toISOString(),
    verifiedBy: silo.verifiedBy,
    daysSinceVerified: daysSince(silo.verifiedAt, now),
    stale: isStale(silo, now),
    collectedAt: silo.collectedAt?.toISOString() ?? null,
    collectedBy: silo.collectedBy,
  };
}
