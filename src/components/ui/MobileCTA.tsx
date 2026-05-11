'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';
import { siteConfig } from '@/content/site';

export function MobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
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
      )}
    </AnimatePresence>
  );
}
