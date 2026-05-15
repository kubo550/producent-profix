import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowRight, HardHat, Wrench, ShieldCheck, Truck, ClipboardList, Layers } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/sections/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { LinkButton } from '@/components/ui/Button';
import { PlaceholderBadge } from '@/components/ui/PlaceholderBadge';
import { Logistics } from '@/components/sections/Logistics';

const sectionIcons = [HardHat, Wrench, ShieldCheck, Truck, ClipboardList, Layers] as const;

// Themed Loremflickr tags per card slot (cycled if more sections than entries).
const cardThemes = [
  { tag: 'construction', lock: 41 },
  { tag: 'tools', lock: 42 },
  { tag: 'plaster', lock: 43 },
  { tag: 'truck', lock: 44 },
  { tag: 'blueprint', lock: 45 },
  { tag: 'scaffolding', lock: 46 },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'professionalPage' });
  return { title: t('title'), description: t('intro') };
}

export default async function ProfessionalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('professionalPage');
  const sections = t.raw('sections') as Array<{ title: string; description: string }>;

  return (
    <>
      <PageHero eyebrow="Dla fachowca" title={t('title')} subtitle={t('subtitle')}>
        <p className="text-pretty text-base leading-[1.7] text-fg-muted sm:text-lg">
          {t('intro')}
        </p>
      </PageHero>

      {/* Editorial hero strip — real photo */}
      <section className="relative pb-16">
        <Container size="xl">
          <Reveal>
            <figure className="relative aspect-[22/9] overflow-hidden rounded-md border border-[var(--color-border-strong)] shadow-[var(--shadow-soft-lg)]">
              <Image
                src="/photos/worker-hall.jpg"
                alt="Ekipa fachowców pracująca z materiałami PROFIX na większym obiekcie"
                fill
                priority
                sizes="(min-width: 1024px) 1200px, 100vw"
                className="h-photo-warm object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-deep)]/55 via-transparent to-transparent" />
              <figcaption className="absolute bottom-6 left-6 flex items-center gap-3 rounded-md bg-[var(--color-paper)]/95 px-4 py-2.5 shadow-[var(--shadow-soft)]">
                <HardHat size={16} strokeWidth={1.75} className="text-[var(--color-accent)]" />
                <span className="text-[13px] font-medium uppercase tracking-[0.14em] text-[var(--color-fg)]">
                  Partner ekipy budowlanej
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </Container>
      </section>

      {/* Section cards — themed placeholders */}
      <section className="relative pb-20">
        <Container size="xl">
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((s, i) => {
              const Icon = sectionIcons[i % sectionIcons.length];
              const theme = cardThemes[i % cardThemes.length];
              const src = `https://loremflickr.com/720/450/${theme.tag}?lock=${theme.lock}`;
              return (
                <Reveal key={s.title} delay={(i % 3) * 0.08}>
                  <article className="group flex h-full flex-col overflow-hidden rounded-md border border-[var(--color-border)] bg-[var(--color-paper)] shadow-[var(--shadow-soft)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[rgb(31_24_21/0.22)] hover:shadow-[var(--shadow-soft-lg)]">
                    <div className="relative aspect-[16/10] overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-bg-deep)]">
                      <Image
                        src={src}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 30vw, 100vw"
                        unoptimized
                        className="h-photo-warm object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-deep)]/45 via-transparent to-transparent" />
                      <span className="absolute left-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-paper)] text-[var(--color-accent)] shadow-[var(--shadow-soft)]">
                        <Icon size={20} strokeWidth={1.5} />
                      </span>
                      <PlaceholderBadge className="bottom-3 right-3" />
                    </div>
                    <div className="flex flex-1 flex-col p-7">
                      <h2
                        className="font-display text-2xl font-medium leading-[1.1] tracking-tight"
                        style={{ fontVariationSettings: '"SOFT" 50, "opsz" 36' }}
                      >
                        {s.title}
                      </h2>
                      <p className="mt-3 flex-1 text-[15px] leading-relaxed text-fg-muted">
                        {s.description}
                      </p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <Logistics />

      {/* CTA spread — real PROFIX photo backdrop */}
      <section className="relative pb-24 pt-8">
        <Container size="xl">
          <Reveal>
            <div className="relative overflow-hidden rounded-md border border-[var(--color-border-strong)] bg-[var(--color-bg-deep)] shadow-[var(--shadow-soft-lg)]">
              <Image
                src="/photos/workers-team.jpg"
                alt=""
                aria-hidden
                fill
                sizes="(min-width: 1024px) 1200px, 100vw"
                className="h-photo-warm object-cover opacity-30 mix-blend-luminosity"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg-deep)]/95 via-[var(--color-bg-deep)]/70 to-[var(--color-bg-deep)]/40" />
              <div className="relative flex flex-col items-start justify-between gap-7 p-8 sm:flex-row sm:items-center sm:p-12">
                <div className="max-w-xl space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="h-rule" />
                    <span className="h-eyebrow text-[var(--color-fg-inverse-muted)]">Współpraca</span>
                  </div>
                  <h2
                    className="font-display text-3xl font-medium leading-[1.05] tracking-tight text-[var(--color-fg-inverse)] sm:text-4xl"
                    style={{ fontVariationSettings: '"SOFT" 50, "opsz" 48' }}
                  >
                    {t('ctaTitle')}
                  </h2>
                </div>
                <LinkButton href="/kontakt" variant="primary" size="lg">
                  {t('ctaButton')}
                  <ArrowRight size={18} strokeWidth={1.75} />
                </LinkButton>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
