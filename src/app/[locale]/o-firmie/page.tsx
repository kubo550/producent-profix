import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/sections/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { USPStrip } from '@/components/sections/USPStrip';
import { Logistics } from '@/components/sections/Logistics';

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
  const values = t.raw('values') as Array<{ title: string; description: string }>;

  return (
    <div className="isolate">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <Image
          src="/photos/about-profix-poster.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <video
          src="/photos/about-profix.mp4"
          poster="/photos/about-profix-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          tabIndex={-1}
          className="relative h-full w-full object-cover motion-reduce:hidden"
        />
        <div className="absolute inset-0 bg-[var(--color-bg)]/45 motion-reduce:bg-[var(--color-bg)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg)]/25 via-transparent to-[var(--color-bg)]/65" />
      </div>

      <div className="[&_h1]:text-halo [&_p]:text-halo [&_.h-eyebrow]:text-halo [&_p]:!text-[var(--color-fg)] [&_.h-eyebrow]:!text-[var(--color-fg)]">
        <PageHero eyebrow="O firmie" title={t('title')} subtitle={t('subtitle')} />
      </div>

      <section className="relative pb-24 pt-12">
        <Container size="xl">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
            <Reveal className="space-y-6 text-lg leading-relaxed text-[var(--color-fg)] [&_h2]:text-halo [&_p]:text-halo">
              <p className="text-pretty">{t('intro')}</p>
              <h2 className="pt-4 font-display text-2xl font-semibold text-[var(--color-fg)] sm:text-3xl">
                {t('missionTitle')}
              </h2>
              <p className="text-pretty">{t('mission')}</p>
              <h2 className="pt-4 font-display text-2xl font-semibold text-[var(--color-fg)] sm:text-3xl">
                {t('productionTitle')}
              </h2>
              <p className="text-pretty">{t('production')}</p>
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

      <section className="relative pb-24">
        <Container size="xl">
          <Reveal>
            <figure className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-deep)] shadow-[var(--shadow-soft-lg)]">
              <video
                src="/photos/about-production.mp4"
                poster="/photos/about-production-poster.jpg"
                controls
                playsInline
                preload="none"
                className="aspect-video w-full"
                aria-label={t('productionTitle')}
              />
            </figure>
            <figcaption className="mt-3 text-sm text-fg-muted">
              {t('productionTitle')} – Krzeszowice
            </figcaption>
          </Reveal>
        </Container>
      </section>

      <USPStrip />
      <Logistics />
    </div>
  );
}
