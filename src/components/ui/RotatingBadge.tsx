'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { BadgeCheck } from 'lucide-react';
import { cn } from '@/lib/cn';

/**
 * Trust badge whose label rotates through several messages (a common landing-page
 * ticker). The pill reserves width for the longest item, so swapping text never
 * shifts layout. Honors prefers-reduced-motion: still rotates, but without movement.
 */
export function RotatingBadge({
  items,
  intervalMs = 3200,
  halo = false,
  className,
}: {
  items: string[];
  /** Time each message stays on screen before swapping. */
  intervalMs?: number;
  /** Add text-halo for legibility when sitting over a video/photo background. */
  halo?: boolean;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [items.length, intervalMs]);

  if (items.length === 0) return null;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/85 px-4 py-2 text-sm text-fg-muted backdrop-blur-2xl',
        halo && 'text-halo',
        className
      )}
    >
      <BadgeCheck size={16} strokeWidth={1.75} className="shrink-0 text-[var(--color-accent)]" />
      {/* Grid stacking: invisible sizers reserve the widest label; the active one overlays. */}
      <span className="relative grid">
        {items.map((text, i) => (
          <span
            key={i}
            aria-hidden="true"
            className="invisible col-start-1 row-start-1 whitespace-nowrap"
          >
            {text}
          </span>
        ))}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={index}
            className="col-start-1 row-start-1 whitespace-nowrap"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -6 }}
            transition={{ duration: reduceMotion ? 0 : 0.3, ease: 'easeOut' }}
          >
            {items[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
