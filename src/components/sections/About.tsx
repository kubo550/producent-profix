import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { ArrowRight, Factory } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Counter } from '@/components/ui/Counter';
import { Link } from '@/i18n/navigation';

export async function About() {
  const t = await getTranslations('about');
  const paragraphs = t.raw('paragraphs') as string[];
  const stats = t.raw('stats') as Array<{ value: string; label: string }>;

  return (
    <section id="o-firmie" className="relative py-24 sm:py-32">
      <Container size="xl">
        <div className="grid items-start gap-16 lg:grid-cols-[1.1fr_1fr]">
          <Reveal className="space-y-8">
            <SectionHeading
              eyebrow={t('eyebrow')}
              title={t('title')}
              subtitle={t('lead')}
            />
            <div className="space-y-5 text-base leading-relaxed text-fg-muted sm:text-lg">
              {paragraphs.map((p, i) => (
                <p key={i} className="text-pretty">
                  {p}
                </p>
              ))}
            </div>
            <Link
              href="/o-firmie"
              className="inline-flex items-center gap-2 text-base font-medium text-[var(--color-accent)] transition-all hover:gap-3"
            >
              {t('cta')}
              <ArrowRight size={18} strokeWidth={1.75} />
            </Link>
          </Reveal>

          <Reveal delay={0.15} className="space-y-4">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-[var(--color-border)]">
              <Image
                src="/stock/factory.jpg"
                alt="Hala produkcyjna"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-between p-8">
                <div className="flex items-center gap-3 text-white/85">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-accent)] text-[var(--color-accent-fg)]">
                    <Factory size={18} strokeWidth={1.75} />
                  </div>
                  <p className="font-mono text-xs uppercase tracking-[0.18em]">
                    Hala produkcyjna
                  </p>
                </div>
                <div>
                  <p className="font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
                    Skawina, ul. Piłsudskiego 23
                  </p>
                  <p className="mt-2 text-sm text-white/85">
                    Pełen cykl produkcji chemii budowlanej pod jednym dachem.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-center backdrop-blur-xl"
                >
                  <Counter
                    value={s.value}
                    className="block font-display text-2xl font-bold text-[var(--color-accent)] sm:text-3xl"
                  />
                  <p className="mt-1 text-xs leading-tight text-fg-muted">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
