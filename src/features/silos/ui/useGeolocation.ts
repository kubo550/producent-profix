'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { Coordinates } from '../domain';

export type GeoFix = Coordinates & { accuracyM: number };

export type GeolocationState =
  | { status: 'idle' }
  | { status: 'locating'; fix: GeoFix | null }
  | { status: 'done'; fix: GeoFix }
  | { status: 'error'; message: string };

/** Stop refining once the fix is at least this good (metres). */
const GOOD_ENOUGH_M = 15;
/** Give the GPS this long to settle before taking the best fix so far. */
const MAX_WAIT_MS = 15_000;

function errorMessage(err: GeolocationPositionError): string {
  switch (err.code) {
    case err.PERMISSION_DENIED:
      return 'Brak zgody na lokalizację. Włącz ją w ustawieniach telefonu albo wpisz adres.';
    case err.POSITION_UNAVAILABLE:
      return 'Telefon nie może ustalić pozycji. Wyjdź na otwartą przestrzeń albo wpisz adres.';
    case err.TIMEOUT:
      return 'Nie udało się złapać GPS na czas. Spróbuj ponownie albo wpisz adres.';
    default:
      return 'Nie udało się pobrać lokalizacji.';
  }
}

/**
 * Watches the GPS for a short while and keeps the most accurate fix: a phone's first
 * reading is often network-based (100 m+) and improves once satellites lock.
 * `onFix` gets every improvement, so the pin moves live while the fix refines.
 */
export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({ status: 'idle' });
  const watchId = useRef<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const best = useRef<GeoFix | null>(null);
  const onFix = useRef<((fix: GeoFix) => void) | null>(null);

  const clear = useCallback(() => {
    if (watchId.current !== null) navigator.geolocation.clearWatch(watchId.current);
    if (timer.current !== null) clearTimeout(timer.current);
    watchId.current = null;
    timer.current = null;
  }, []);

  const finish = useCallback(() => {
    clear();
    const fix = best.current;
    if (fix) onFix.current?.(fix);
    setState(
      fix
        ? { status: 'done', fix }
        : { status: 'error', message: 'Nie udało się złapać GPS. Spróbuj ponownie albo wpisz adres.' },
    );
  }, [clear]);

  const start = useCallback((handleFix: (fix: GeoFix) => void) => {
    if (typeof navigator === 'undefined' || !('geolocation' in navigator)) {
      setState({ status: 'error', message: 'Ta przeglądarka nie obsługuje lokalizacji. Wpisz adres.' });
      return;
    }
    clear();
    best.current = null;
    onFix.current = handleFix;
    setState({ status: 'locating', fix: null });

    watchId.current = navigator.geolocation.watchPosition(
      ({ coords }) => {
        const fix = { lat: coords.latitude, lng: coords.longitude, accuracyM: coords.accuracy };
        if (best.current && fix.accuracyM >= best.current.accuracyM) return;
        best.current = fix;
        if (fix.accuracyM <= GOOD_ENOUGH_M) return finish();
        handleFix(fix);
        setState({ status: 'locating', fix });
      },
      (err) => {
        // Keep a usable fix if we already have one; only fail when there is nothing.
        if (best.current) return finish();
        clear();
        setState({ status: 'error', message: errorMessage(err) });
      },
      { enableHighAccuracy: true, maximumAge: 0, timeout: MAX_WAIT_MS },
    );
    timer.current = setTimeout(finish, MAX_WAIT_MS);
  }, [clear, finish]);

  /** Accept the current best fix without waiting for a better one. */
  const stop = useCallback(() => finish(), [finish]);

  const reset = useCallback(() => {
    clear();
    best.current = null;
    onFix.current = null;
    setState({ status: 'idle' });
  }, [clear]);

  useEffect(() => clear, [clear]);

  return { state, start, stop, reset };
}
