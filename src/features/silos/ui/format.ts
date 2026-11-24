import { pluralPl } from '@/lib/plural';
import type { Coordinates } from '../domain';

export function formatDaysAgo(days: number): string {
  if (days <= 0) return 'dziś';
  if (days === 1) return 'wczoraj';
  return `${days} ${pluralPl(days, 'dzień', 'dni', 'dni')} temu`;
}

const dateFormatter = new Intl.DateTimeFormat('pl-PL', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'Europe/Warsaw',
});

export function formatDate(iso: string): string {
  return dateFormatter.format(new Date(iso));
}

/** Universal Google Maps link: opens the app with a route on iOS/Android, web elsewhere. */
export function navigationUrl({ lat, lng }: Coordinates): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}

export function formatCoords({ lat, lng }: Coordinates): string {
  return `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
}
