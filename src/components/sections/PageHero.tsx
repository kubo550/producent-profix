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
      {/* Dim atmospheric backdrop on detail pages */}
      <span className="atmo-quiet sr-only" aria-hidden />
      <Container size="xl">
        <div className="max-w-3xl space-y-6">
          {eyebrow && (
            <div className="flex items-center gap-3">
              <span className="h-rule" />
              <span className="h-eyebrow text-[var(--color-fg-muted)]">{eyebrow}</span>
            </div>
          )}
          <h1
            className="font-display text-balance text-5xl font-medium leading-[1.02] tracking-[-0.015em] sm:text-6xl lg:text-[4.5rem]"
            style={{ fontVariationSettings: '"SOFT" 50, "opsz" 144' }}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="text-pretty text-lg leading-[1.65] text-fg-muted sm:text-xl">
              {subtitle}
            </p>
          )}
          {children}
        </div>
      </Container>
    </section>
  );
}
