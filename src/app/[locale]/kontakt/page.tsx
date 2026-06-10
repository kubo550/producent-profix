import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHero } from '@/components/sections/PageHero';
import { Contact } from '@/components/sections/Contact';
import { SalesReps } from '@/components/sections/SalesReps';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contactPage' });
  return { title: t('title'), description: t('intro') };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('contactPage');

  return (
    <>
      <PageHero eyebrow="Kontakt" title={t('title')} subtitle={t('subtitle')}>
        <p className="text-base leading-relaxed text-fg-muted sm:text-lg">{t('intro')}</p>
      </PageHero>
      <SalesReps />
      <Contact />
    </>
  );
}
