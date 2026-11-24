'use client';

import { useCallback, useMemo, useSyncExternalStore } from 'react';
import type { Coordinates, LocationSource } from '../domain';

/** Position is null until located. */
export type SiloDraft = {
  id: string;
  lat: number | null;
  lng: number | null;
  accuracyM: number | null;
  source: LocationSource;
  name: string;
  comment: string;
};

export function newDraft(position?: Coordinates & { source: LocationSource }): SiloDraft {
  return {
    id: crypto.randomUUID(),
    lat: position?.lat ?? null,
    lng: position?.lng ?? null,
    accuracyM: null,
    source: position?.source ?? 'gps',
    name: '',
    comment: '',
  };
}

export function hasPosition(d: SiloDraft): d is SiloDraft & { lat: number; lng: number } {
  return d.lat !== null && d.lng !== null;
}

/** A draft worth keeping: has a position or any typed text. */
export function isMeaningful(d: SiloDraft): boolean {
  return hasPosition(d) || d.name.trim() !== '' || d.comment.trim() !== '';
}

const STORAGE_KEY = 'profix:silo-draft:v1';

// localStorage can throw (private mode, blocked site data); the feature then degrades to "no draft".
const listeners = new Set<() => void>();

function readRaw(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function writeRaw(value: string | null) {
  try {
    if (value === null) localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, value);
  } catch {
    /* storage unavailable */
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  // Keeps several open tabs in sync.
  window.addEventListener('storage', listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', listener);
  };
}

function parse(raw: string | null): SiloDraft | null {
  if (!raw) return null;
  try {
    const draft = JSON.parse(raw) as SiloDraft;
    return typeof draft.id === 'string' ? draft : null;
  } catch {
    return null;
  }
}

/** An unsent new pin survives closing the browser on a site without signal. */
export function usePersistedDraft() {
  // The snapshot must be referentially stable between reads, so it is the raw string.
  const raw = useSyncExternalStore(subscribe, readRaw, () => null);
  const stored = useMemo(() => parse(raw), [raw]);

  const save = useCallback((draft: SiloDraft) => {
    const next = isMeaningful(draft) ? JSON.stringify(draft) : null;
    if (next !== readRaw()) writeRaw(next);
  }, []);

  const clear = useCallback(() => writeRaw(null), []);

  return { stored, save, clear };
}
