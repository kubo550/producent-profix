import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/sections/PageHero';
import { Reveal } from '@/components/ui/Reveal';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'tendersPage' });
  return {
    title: t('title'),
    description: t('intro'),
    alternates: { canonical: `/${locale}/przetargi` },
  };
}

export default async function TendersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('tendersPage');

  return (
    <>
      <PageHero eyebrow="Przetargi" title={t('title')} subtitle={t('subtitle')} />

      <section className="relative pb-24">
        <Container size="md">
          <Reveal className="space-y-6 text-lg leading-relaxed text-fg-muted">
            <p className="text-pretty">{t('intro')}</p>
            <p className="rounded-2xl border border-dashed border-[var(--color-border-strong)] bg-[var(--color-surface-2)] p-6 text-sm">
              {t('placeholder')}
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
