import { describe, expect, it } from 'vitest';
import { CachingGeocoder, NominatimGeocoder } from './geocoder';

describe('NominatimGeocoder', () => {
  it('queries Poland only with an identifying User-Agent and maps results', async () => {
    let seen: { url: string; ua: string | null } | null = null;
    const fakeFetch = (async (url: URL, init?: RequestInit) => {
      seen = { url: String(url), ua: new Headers(init?.headers).get('User-Agent') };
      return new Response(
        JSON.stringify([
          { lat: '50.1', lon: '19.6', display_name: 'Krzeszowice' },
          { lat: 'bad', lon: '19.6', display_name: 'Broken' },
        ]),
      );
    }) as typeof fetch;

    const results = await new NominatimGeocoder('Test/1.0', fakeFetch).search('Krzeszowice');
    expect(results).toEqual([{ lat: 50.1, lng: 19.6, label: 'Krzeszowice' }]);
    expect(seen!.url).toContain('countrycodes=pl');
    expect(seen!.ua).toBe('Test/1.0');
  });

  it('throws on HTTP errors so the caller can show a fallback', async () => {
    const fakeFetch = (async () => new Response('', { status: 503 })) as typeof fetch;
    await expect(new NominatimGeocoder('T', fakeFetch).search('x y z')).rejects.toThrow('503');
  });
});

describe('CachingGeocoder', () => {
  const result = [{ lat: 50.1, lng: 19.6, label: 'Krzeszowice' }];

  function givenCountingGeocoder() {
    const inner = { calls: 0, search: async () => (inner.calls++, result) };
    return inner;
  }

  it('answers a repeated query (ignoring case and spacing) without calling Nominatim again', async () => {
    const inner = givenCountingGeocoder();
    const cached = new CachingGeocoder(inner);
    await cached.search('Krzeszowice,  Sienkiewicza 20');
    expect(await cached.search(' krzeszowice, sienkiewicza 20 ')).toEqual(result);
    expect(inner.calls).toBe(1);
  });

  it('asks Nominatim again once the entry expired', async () => {
    const inner = givenCountingGeocoder();
    let now = 0;
    const cached = new CachingGeocoder(inner, 1000, 10, () => now);
    await cached.search('Krzeszowice');
    now = 1001;
    await cached.search('Krzeszowice');
    expect(inner.calls).toBe(2);
  });

  it('evicts the oldest entry when full', async () => {
    const inner = givenCountingGeocoder();
    const cached = new CachingGeocoder(inner, 1000, 2, () => 0);
    await cached.search('a a a');
    await cached.search('b b b');
    await cached.search('c c c');
    await cached.search('b b b');
    expect(inner.calls).toBe(3);
    await cached.search('a a a');
    expect(inner.calls).toBe(4);
  });

  it('does not cache failures', async () => {
    let fail = true;
    const inner = { search: async () => { if (fail) throw new Error('503'); return result; } };
    const cached = new CachingGeocoder(inner);
    await expect(cached.search('Krzeszowice')).rejects.toThrow('503');
    fail = false;
    expect(await cached.search('Krzeszowice')).toEqual(result);
  });
});
