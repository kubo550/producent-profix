import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * CSS-only fade-up reveal. Bez 'use client', bez useState, bez IntersectionObserver.
 * Animacja startuje od razu po pierwszym paint z fill-mode `backwards`, więc nawet
 * gdy JS nie wykona się w ogóle (np. blokada na mobile), content i tak jest widoczny.
 * Trade-off: brak scroll-trigger, ale 99% sekcji jest powyżej fold albo widoczne
 * zaraz po scrollu, więc visually wygląda tak samo.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <div
      className={cn('reveal-fade-up', className)}
      style={
        {
          '--reveal-delay': `${delay}s`,
          '--reveal-y': `${y}px`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
