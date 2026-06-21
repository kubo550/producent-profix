import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { HeroBackground } from '@/components/sections/HeroBackground';
import { PageHero } from '@/components/sections/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { USPStrip } from '@/components/sections/USPStrip';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'aboutPage' });
  return { title: t('title'), description: t('intro') };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('aboutPage');
  const body = t.raw('body') as string[];
  const facts = t.raw('facts') as Array<{ value: string; label: string }>;
  const values = t.raw('values') as Array<{ title: string; description: string }>;

  return (
    <div className="isolate">
      <HeroBackground />

      <div className="[&_h1]:text-halo [&_p]:text-halo [&_.h-eyebrow]:text-halo [&_p]:!text-[var(--color-fg)] [&_.h-eyebrow]:!text-[var(--color-fg)]">
        <PageHero eyebrow="O firmie" title={t('title')} subtitle={t('subtitle')} />
      </div>

      <section className="relative pb-24 pt-12">
        <Container size="xl">
          {/* Lead - first paragraph, editorial scale */}
          <Reveal className="max-w-3xl [&_p]:text-halo">
            <p className="text-balance font-display text-xl font-medium leading-snug text-[var(--color-fg)] sm:text-2xl">
              {body[0]}
            </p>
          </Reveal>

          {/* Pulled facts - full-width strip, evenly distributed across the page */}
          {facts.length > 0 && (
            <Reveal delay={0.05}>
              <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 border-y border-[var(--color-fg)]/15 py-8 sm:grid-cols-4">
                {facts.map((f) => (
                  <div key={f.label}>
                    <dt className="font-display text-4xl font-semibold leading-none text-[var(--color-accent)] text-halo lg:text-5xl">
                      {f.value}
                    </dt>
                    <dd className="mt-2.5 font-mono text-[11px] uppercase leading-tight tracking-[0.16em] text-[var(--color-fg)]/75 text-halo">
                      {f.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          )}

          {/* Body + values */}
          <div className="mt-12 grid gap-12 lg:grid-cols-[1.2fr_1fr]">
            <Reveal
              delay={0.1}
              className="space-y-5 leading-relaxed text-[var(--color-fg)] [&_p]:text-halo"
            >
              {body.slice(1).map((para, i) => (
                <p key={i} className="text-pretty">
                  {para}
                </p>
              ))}
            </Reveal>

            <Reveal delay={0.15} className="space-y-3">
              <h2 className="mb-4 font-display text-2xl font-semibold sm:text-3xl">
                {t('valuesTitle')}
              </h2>
              {values.map((v) => (
                <div
                  key={v.title}
                  className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/85 p-5 backdrop-blur-2xl"
                >
                  <h3 className="font-display text-lg font-semibold">{v.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{v.description}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Brand shot - real PROFIX product range (plasters, adhesives, concretes, mortars) */}
      <section className="relative pb-24">
        <Container size="md">
          <Reveal>
            <figure className="mx-auto max-w-sm">
              <div className="relative aspect-[9/16] overflow-hidden rounded-md border border-[var(--color-border-strong)] shadow-[var(--shadow-soft-lg)]">
                <Image
                  src="/photos/profix-linia-produktow.jpg"
                  alt={t('brandImage.alt')}
                  fill
                  sizes="(max-width: 640px) 90vw, 384px"
                  className="h-photo-warm object-cover"
                />
              </div>
              <figcaption className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">
                {t('brandImage.caption')}
              </figcaption>
            </figure>
          </Reveal>
        </Container>
      </section>

      <USPStrip />
    </div>
  );
}
