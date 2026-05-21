import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { ArrowRight, Factory } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Counter } from '@/components/ui/Counter';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/cn';

export async function About() {
  const t = await getTranslations('about');
  const paragraphs = t.raw('paragraphs') as string[];
  const stats = t.raw('stats') as Array<{ value: string; label: string }>;

  return (
    <section id="o-firmie" className="relative py-24 sm:py-32">
      <Container size="xl">
        <div className="grid items-start gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <Reveal className="space-y-10">
            <SectionHeading
              eyebrow={t('eyebrow')}
              title={t('title')}
              subtitle={t('lead')}
            />
            <div className="space-y-6 text-[17px] leading-[1.75] text-[var(--color-fg)] sm:text-lg">
              {paragraphs.map((p, i) => (
                <p key={i} className={cn('text-halo', i === 0 ? 'h-drop-cap text-pretty' : 'text-pretty')}>
                  {p}
                </p>
              ))}
            </div>
            <Link
              href="/o-firmie"
              className="group inline-flex items-center gap-2 text-base font-medium text-[var(--color-accent)] transition-all hover:gap-3"
            >
              <span className="border-b border-[var(--color-accent)] pb-0.5">
                {t('cta')}
              </span>
              <ArrowRight size={18} strokeWidth={1.75} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>

          <Reveal delay={0.15} className="space-y-4">
            {/* Primary photo — factory hall */}
            <figure className="relative aspect-[4/5] overflow-hidden rounded-md border border-[var(--color-border-strong)] shadow-[var(--shadow-soft-lg)]">
              <Image
                src="/stock/factory.jpg"
                alt="Hala produkcyjna PROFIX w Krzeszowicach"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="h-photo-warm object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-deep)]/85 via-[var(--color-bg-deep)]/20 to-transparent" />
              <figcaption className="absolute inset-0 flex flex-col justify-between p-7 sm:p-8">
                <div className="flex items-center gap-3 text-[var(--color-fg-inverse)]">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-accent)] text-[var(--color-accent-fg)]">
                    <Factory size={16} strokeWidth={1.75} />
                  </span>
                  <span
                    className="font-display italic text-sm tracking-wide"
                    style={{ fontVariationSettings: '"SOFT" 100, "opsz" 14' }}
                  >
                    — Hala produkcyjna
                  </span>
                </div>
                <div>
                  <p
                    className="font-display text-3xl font-medium leading-[1.05] text-[var(--color-fg-inverse)] sm:text-4xl"
                    style={{ fontVariationSettings: '"SOFT" 50, "opsz" 48' }}
                  >
                    ul. Sienkiewicza 20
                  </p>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-[var(--color-fg-inverse-muted)]">
                    Pełen cykl produkcji chemii budowlanej pod jednym dachem — od surowca do palety.
                  </p>
                </div>
              </figcaption>
            </figure>

            {/* Stat row */}
            <dl className="grid grid-cols-3 gap-3">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-md border border-[var(--color-border)] bg-[var(--color-paper)] p-5 shadow-[var(--shadow-soft)]"
                >
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <Counter
                      value={s.value}
                      className="block font-display text-4xl font-medium leading-none text-[var(--color-accent)] sm:text-5xl"
                    />
                    <p className="mt-3 text-[11px] uppercase tracking-[0.14em] leading-tight text-fg-muted">
                      {s.label}
                    </p>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
