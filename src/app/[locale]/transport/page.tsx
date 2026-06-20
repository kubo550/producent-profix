import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHero } from '@/components/sections/PageHero';
import { Logistics } from '@/components/sections/Logistics';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'logistics' });
  return {
    title: t('title'),
    description: t('lead'),
    keywords: [
      'transport HDS',
      'dostawa HDS',
      'dostawa luzem',
      'transport luzem',
      'technika silosowa',
      'silos',
      'agregat tynkarski',
      'dostawa tynków',
      'transport materiałów budowlanych',
    ],
    alternates: { canonical: '/transport' },
  };
}

export default async function TransportPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('logistics');

  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('lead')} />
      <Logistics />
    </>
  );
}
