import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/sections/PageHero';
import { Reveal } from '@/components/ui/Reveal';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacyPage' });
  return { title: t('title'), description: t('subtitle') };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('privacyPage');

  return (
    <>
      <PageHero eyebrow="Polityka" title={t('title')} subtitle={t('subtitle')} />

      <section className="relative pb-24">
        <Container size="md">
          <Reveal>
            <p className="rounded-2xl border border-dashed border-[var(--color-border-strong)] bg-[var(--color-surface-2)] p-6 text-sm leading-relaxed text-fg-muted">
              {t('placeholder')}
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
