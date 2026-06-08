'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Non-critical overlays: a scroll-triggered floating CTA and the cookie-consent
// banner. Neither is needed for first paint, both pull framer-motion, so we
// client-render them only after the browser goes idle to keep load-time main
// thread work (and TBT) down.
const MobileCTA = dynamic(() => import('@/components/ui/MobileCTA').then((m) => m.MobileCTA), {
  ssr: false,
});
const CookieBanner = dynamic(
  () => import('@/components/ui/CookieBanner').then((m) => m.CookieBanner),
  { ssr: false }
);

export function LazyChrome() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const idle =
      typeof window.requestIdleCallback === 'function'
        ? window.requestIdleCallback(() => setReady(true), { timeout: 3000 })
        : window.setTimeout(() => setReady(true), 1500);
    return () => {
      if (typeof window.cancelIdleCallback === 'function') window.cancelIdleCallback(idle as number);
      else clearTimeout(idle as number);
    };
  }, []);

  if (!ready) return null;
  return (
    <>
      <MobileCTA />
      <CookieBanner />
    </>
  );
}
