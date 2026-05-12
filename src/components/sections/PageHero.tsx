import type { ReactNode } from 'react';
import { Container } from '@/components/ui/Container';

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative pb-12 pt-36 sm:pb-20 sm:pt-44">
      {/* Marker triggers body:has(.atmo-quiet)::before to dim atmospheric on detail pages. */}
      <span className="atmo-quiet sr-only" aria-hidden />
      <Container size="xl">
        <div className="max-w-3xl space-y-5">
          {eyebrow && (
            <p className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-accent)]">
              <span className="h-px w-8 bg-[var(--color-accent)]" />
              {eyebrow}
            </p>
          )}
          <h1 className="text-balance text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="text-pretty text-lg leading-relaxed text-fg-muted sm:text-xl">
              {subtitle}
            </p>
          )}
          {children}
        </div>
      </Container>
    </section>
  );
}
