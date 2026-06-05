import { Check } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { RotatingBadge } from '@/components/ui/RotatingBadge';
import { cn } from '@/lib/cn';

type Highlight = { title: string; description: string };

/**
 * Line-level selling points, rendered from a category's `highlights` data.
 * Reused on the category page (with title/lead/trust + halo over bg video)
 * and on each product detail page (just the benefit cards + a heading).
 */
export function CategoryHighlights({
  items,
  title,
  lead,
  trustNote,
  halo = false,
  className,
}: {
  items: Highlight[];
  title?: string;
  lead?: string;
  /** A single trust line, or several that rotate through a ticker badge. */
  trustNote?: string | string[];
  /** Add text-halo for legibility when sitting over a video/photo background. */
  halo?: boolean;
  className?: string;
}) {
  if (!items || items.length === 0) return null;

  const colsClass =
    items.length === 3
      ? 'sm:grid-cols-2 lg:grid-cols-3'
      : items.length === 2
        ? 'sm:grid-cols-2'
        : 'sm:grid-cols-2 lg:grid-cols-4';

  return (
    <section className={cn('relative pb-20', className)}>
      <Container size="xl">
        {(title || lead) && (
          <Reveal className="max-w-2xl space-y-3">
            {title && (
              <h2
                className={cn('font-display text-2xl font-semibold sm:text-3xl', halo && 'text-halo')}
              >
                {title}
              </h2>
            )}
            {lead && (
              <p
                className={cn(
                  'text-pretty text-base leading-relaxed text-fg-muted',
                  halo && 'text-halo'
                )}
              >
                {lead}
              </p>
            )}
          </Reveal>
        )}
        <div className={cn('mt-8 grid gap-4', colsClass)}>
          {items.map((h, i) => (
            <Reveal key={h.title} delay={(i % 4) * 0.06}>
              <div className="h-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/85 p-5 backdrop-blur-2xl">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                  <Check size={16} strokeWidth={2} />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold leading-tight">{h.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{h.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
        {trustNote && (
          <Reveal delay={0.1}>
            <RotatingBadge
              items={Array.isArray(trustNote) ? trustNote : [trustNote]}
              halo={halo}
              className="mt-6"
            />
          </Reveal>
        )}
      </Container>
    </section>
  );
}
