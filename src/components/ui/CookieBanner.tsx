'use client';

import { useState, useSyncExternalStore } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';

const STORAGE_KEY = 'profix.cookies.consent';

const subscribe = () => () => {};
const readClient = (): boolean => {
  try {
    return !localStorage.getItem(STORAGE_KEY);
  } catch {
    return false;
  }
};
const readServer = () => false;

export function CookieBanner() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const needsConsent = useSyncExternalStore(subscribe, readClient, readServer);
  const [dismissed, setDismissed] = useState(false);

  if (!gaId || !needsConsent || dismissed) return null;

  const accept = (value: 'accepted' | 'rejected') => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    setDismissed(true);
    // Real consent wiring (gtag consent update) goes here once GA is integrated.
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        role="dialog"
        aria-label="Pliki cookies"
        className="fixed bottom-4 left-1/2 z-40 w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 rounded-2xl border border-[var(--color-border-strong)] bg-[var(--color-surface-strong)] p-5 shadow-2xl backdrop-blur-xl sm:p-6"
      >
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
              <Cookie size={18} strokeWidth={1.75} />
            </span>
            <p className="text-sm leading-relaxed text-fg-muted">
              Używamy plików cookies do analizy ruchu i ulepszania strony. Szczegóły w{' '}
              <Link
                href="/polityka-prywatnosci"
                className="text-[var(--color-accent)] hover:underline"
              >
                polityce prywatności
              </Link>
              .
            </p>
          </div>
          <div className="flex w-full flex-shrink-0 gap-2 sm:w-auto">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => accept('rejected')}
              className="flex-1 sm:flex-none"
            >
              Odrzuć
            </Button>
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={() => accept('accepted')}
              className="flex-1 sm:flex-none"
            >
              Akceptuję
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
