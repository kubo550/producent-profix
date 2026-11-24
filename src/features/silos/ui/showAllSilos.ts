'use client';

import { useEffect, useEffectEvent } from 'react';

// The header lives in the panel layout, outside the board's React tree.
const SHOW_ALL_EVENT = 'profix:silos-show-all';

export function requestShowAllSilos() {
  window.dispatchEvent(new Event(SHOW_ALL_EVENT));
}

export function useShowAllSilosRequest(handle: () => void) {
  const onRequest = useEffectEvent(handle);
  useEffect(() => {
    const listener = () => onRequest();
    window.addEventListener(SHOW_ALL_EVENT, listener);
    return () => window.removeEventListener(SHOW_ALL_EVENT, listener);
  }, []);
}
