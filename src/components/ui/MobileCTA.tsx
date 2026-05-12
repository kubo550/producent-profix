'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageSquare, Phone } from 'lucide-react';
import { siteConfig } from '@/content/site';

/**
 * Floating CTAs that appear after the user scrolls past the hero.
 * Mobile: full-width pair (Zadzwoń + Napisz).
 * Desktop: single pill (Zapytaj o ofertę) bottom-right that scrolls to #kontakt.
 */
export function MobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const past480 = window.scrollY > 480;
      // Hide when near the footer / kontakt section to avoid double-CTA stacking
      const doc = document.documentElement;
      const distanceFromBottom = doc.scrollHeight - (window.scrollY + window.innerHeight);
      const nearBottom = distanceFromBottom < 600;
      setVisible(past480 && !nearBottom);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Mobile: pair of action buttons across the bottom */}
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-3 bottom-3 z-30 grid grid-cols-2 gap-2 lg:hidden"
          >
            <a
              href={`tel:${siteConfig.phone}`}
              className="flex items-center justify-center gap-2 rounded-2xl bg-[var(--color-accent)] px-5 py-3.5 text-sm font-semibold text-[var(--color-accent-fg)] shadow-[0_12px_32px_-12px_rgba(232,132,58,0.55)] active:scale-95"
              aria-label={`Zadzwoń ${siteConfig.phoneDisplay}`}
            >
              <Phone size={18} strokeWidth={2} />
              Zadzwoń
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center justify-center gap-2 rounded-2xl border border-[var(--color-border-strong)] bg-[var(--color-surface-strong)] px-5 py-3.5 text-sm font-semibold text-[var(--color-fg)] backdrop-blur-xl active:scale-95"
              aria-label={`Napisz na ${siteConfig.email}`}
            >
              <Mail size={18} strokeWidth={2} />
              Napisz
            </a>
          </motion.div>

          {/* Desktop: single floating pill bottom-right */}
          <motion.a
            href="/kontakt"
            initial={{ y: 40, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -2 }}
            className="group fixed bottom-6 right-6 z-30 hidden items-center gap-2.5 rounded-full bg-[var(--color-accent)] py-3.5 pl-4 pr-5 text-sm font-semibold text-[var(--color-accent-fg)] shadow-[0_18px_40px_-14px_rgba(232,132,58,0.55)] ring-1 ring-[var(--color-accent-fg)]/10 transition-shadow hover:shadow-[0_22px_56px_-12px_rgba(232,132,58,0.7)] lg:inline-flex"
            aria-label="Przejdź do kontaktu"
          >
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-accent-fg)]/15 ring-1 ring-[var(--color-accent-fg)]/20 transition-transform group-hover:scale-110">
              <MessageSquare size={14} strokeWidth={2} />
            </span>
            Zapytaj o ofertę
          </motion.a>
        </>
      )}
    </AnimatePresence>
  );
}
