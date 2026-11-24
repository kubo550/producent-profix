import 'server-only';
import { getSql } from '@/lib/db';
import { siteConfig } from '@/content/site';
import { CachingGeocoder, NominatimGeocoder, type Geocoder } from './geocoder';
import { PgSiloRepository } from './pgRepository';
import { SiloService } from './service';

export function getSiloService(): SiloService {
  return new SiloService(new PgSiloRepository(getSql()));
}

// Module scope: the cache must outlive a single request.
const geocoder: Geocoder = new CachingGeocoder(new NominatimGeocoder(`PROFIX-Silosy/1.0 (+${siteConfig.url})`));

export function getGeocoder(): Geocoder {
  return geocoder;
}
