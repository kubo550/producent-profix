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
    <>
      <PageHero eyebrow="O firmie" title={t('title')} subtitle={t('subtitle')} />

      <section className="relative pb-24">
        <Container size="xl">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
            <Reveal className="space-y-6 text-lg leading-relaxed text-fg-muted">
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
                  className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 backdrop-blur-xl"
                >
                  <h3 className="font-display text-lg font-semibold">{v.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{v.description}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </Container>
      </section>

      <USPStrip />
      <Logistics />
    </>
  );
}
