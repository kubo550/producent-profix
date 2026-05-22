'use client';

import { useTranslations } from 'next-intl';
import { Calendar, BadgeCheck, Truck, Sparkles } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';

const icons = [Calendar, BadgeCheck, Truck, Sparkles] as const;

export function USPStrip() {
  const t = useTranslations('usp');
  const items = t.raw('items') as Array<{ title: string; description: string }>;

  return (
    <section className="section-alt relative py-20 sm:py-28">
      <Container size="xl">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {items.map((item, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={item.title} delay={i * 0.08}>
                <article className="group relative flex h-full flex-col rounded-md border border-[var(--color-border)] bg-[var(--color-paper)] p-7 shadow-[var(--shadow-soft)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[var(--color-border-hover)] hover:shadow-[var(--shadow-soft-lg)] sm:p-8">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)] transition-transform group-hover:scale-105">
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                  <h3
                    className="font-display text-2xl font-medium leading-tight tracking-tight"
                    style={{ fontVariationSettings: '"SOFT" 50, "opsz" 36' }}
                  >
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">
                    {item.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
