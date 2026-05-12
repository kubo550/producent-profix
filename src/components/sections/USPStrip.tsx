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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={item.title} delay={i * 0.08}>
                <div className="group relative h-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)] hover:shadow-[0_20px_60px_-20px_rgba(232,132,58,0.4)]">
                  <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-accent-soft)] text-[var(--color-accent)] transition-transform group-hover:scale-110">
                    <Icon size={20} strokeWidth={1.75} />
                  </div>
                  <h3 className="mb-2 font-display text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-fg-muted">{item.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
