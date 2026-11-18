import type { Coordinates } from './domain';

export type GeocodeResult = Coordinates & { label: string };

export interface Geocoder {
  search(query: string): Promise<GeocodeResult[]>;
}

/**
 * Nominatim policy: max 1 req/s, identifying User-Agent, no search-as-you-type.
 * Hence server-side (browsers cannot set User-Agent) and only on explicit submit.
 * https://operations.osmfoundation.org/policies/nominatim/
 */
export class NominatimGeocoder implements Geocoder {
  constructor(
    private readonly userAgent: string,
    private readonly fetchImpl: typeof fetch = fetch,
  ) {}

  async search(query: string): Promise<GeocodeResult[]> {
    const url = new URL('https://nominatim.openstreetmap.org/search');
    url.search = new URLSearchParams({
      q: query,
      format: 'jsonv2',
      countrycodes: 'pl',
      limit: '5',
      'accept-language': 'pl',
    }).toString();

    const res = await this.fetchImpl(url, {
      headers: { 'User-Agent': this.userAgent, Accept: 'application/json' },
      signal: AbortSignal.timeout(8000),
      cache: 'no-store',
    });
    if (!res.ok) throw new Error(`Nominatim responded ${res.status}`);

    const data = (await res.json()) as { lat: string; lon: string; display_name: string }[];
    return data
      .map((r) => ({ lat: Number(r.lat), lng: Number(r.lon), label: r.display_name }))
      .filter((r) => Number.isFinite(r.lat) && Number.isFinite(r.lng));
  }
}

/**
 * Nominatim's policy requires clients to cache results. Per warm server instance
 * only (no shared cache on the free stack), which covers the common case of
 * re-searching the same address while placing one pin.
 */
export class CachingGeocoder implements Geocoder {
  private readonly entries = new Map<string, { results: GeocodeResult[]; expiresAt: number }>();

  constructor(
    private readonly inner: Geocoder,
    private readonly ttlMs = 24 * 60 * 60 * 1000,
    private readonly maxEntries = 500,
    private readonly now: () => number = Date.now,
  ) {}

  async search(query: string): Promise<GeocodeResult[]> {
    const key = query.trim().toLowerCase().replace(/\s+/g, ' ');
    const hit = this.entries.get(key);
    if (hit && hit.expiresAt > this.now()) return hit.results;

    const results = await this.inner.search(query);
    // Map keeps insertion order, so the first key is the oldest entry.
    if (this.entries.size >= this.maxEntries) this.entries.delete(this.entries.keys().next().value!);
    this.entries.set(key, { results, expiresAt: this.now() + this.ttlMs });
    return results;
  }
}
