'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export type FleetSlide = { src: string; alt: string };

export function FleetGallery({
  slides,
  captions,
  prevLabel,
  nextLabel,
  interval = 5000,
}: {
  slides: FleetSlide[];
  captions?: string[];
  prevLabel: string;
  nextLabel: string;
  interval?: number;
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;
  const go = useCallback((delta: number) => setActive((p) => (p + delta + count) % count), [count]);

  // Autoplay - pauses on hover/focus and when the tab is hidden; respects reduced motion.
  useEffect(() => {
    if (count <= 1 || paused) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setActive((p) => (p + 1) % count), interval);
    return () => clearInterval(id);
  }, [count, paused, interval]);

  if (count === 0) return null;

  return (
    <div
      className="space-y-3"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* Featured */}
      <div className="group relative aspect-[16/9] overflow-hidden rounded-lg border border-[var(--color-border-strong)] shadow-[var(--shadow-soft-lg)]">
        {slides.map((s, idx) => (
          <Image
            key={s.src}
            src={s.src}
            alt={s.alt}
            fill
            priority={idx === 0}
            sizes="(min-width: 1024px) 70vw, 100vw"
            className={`h-photo-warm object-cover transition-opacity duration-700 ${
              idx === active ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

        {captions?.[active] && (
          <p className="absolute bottom-3 left-3 right-16 max-w-[75%] text-pretty text-sm font-medium text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)] sm:text-base">
            {captions[active]}
          </p>
        )}

        <button
          type="button"
          onClick={() => go(-1)}
          aria-label={prevLabel}
          className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--color-paper)]/90 text-[var(--color-fg)] shadow-[var(--shadow-soft)] backdrop-blur transition hover:scale-105 hover:bg-[var(--color-paper)]"
        >
          <ChevronLeft size={20} strokeWidth={2} />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label={nextLabel}
          className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--color-paper)]/90 text-[var(--color-fg)] shadow-[var(--shadow-soft)] backdrop-blur transition hover:scale-105 hover:bg-[var(--color-paper)]"
        >
          <ChevronRight size={20} strokeWidth={2} />
        </button>

        <span className="absolute right-3 top-3 rounded-full bg-black/55 px-2.5 py-1 font-mono text-[11px] tabular-nums text-white">
          {active + 1} / {count}
        </span>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
        {slides.map((s, idx) => (
          <button
            key={s.src}
            type="button"
            onClick={() => setActive(idx)}
            aria-label={s.alt}
            aria-current={idx === active}
            className={`relative aspect-[4/3] overflow-hidden rounded-md border transition ${
              idx === active
                ? 'border-[var(--color-accent)] ring-1 ring-[var(--color-accent)]'
                : 'border-[var(--color-border)] opacity-70 hover:opacity-100'
            }`}
          >
            <Image src={s.src} alt="" fill sizes="160px" className="h-photo-warm object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
