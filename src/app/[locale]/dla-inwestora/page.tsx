import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/sections/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { LinkButton } from '@/components/ui/Button';
import { Distributors } from '@/components/sections/Distributors';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'investorPage' });
  return { title: t('title'), description: t('intro') };
}

export default async function InvestorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('investorPage');
  const sections = t.raw('sections') as Array<{ title: string; description: string }>;

  return (
    <>
      <PageHero eyebrow="Dla inwestora" title={t('title')} subtitle={t('subtitle')}>
        <p className="text-base leading-relaxed text-fg-muted sm:text-lg">{t('intro')}</p>
      </PageHero>

      <section className="relative pb-12">
        <Container size="xl">
          <Reveal>
            <div className="relative aspect-[22/9] overflow-hidden rounded-3xl border border-[var(--color-border)]">
              <Image
                src="/photos/investor-house.jpg"
                alt="Nowoczesny dom jednorodzinny - przykład realizacji z wykorzystaniem materiałów PROFIX"
                fill
                priority
                sizes="(min-width: 1024px) 1200px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="relative pb-20">
        <Container size="xl">
          <div className="grid gap-4 lg:grid-cols-3">
            {sections.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 backdrop-blur-xl">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-accent)]">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h2 className="mt-3 font-display text-xl font-semibold">{s.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">{s.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <Distributors />

      <section className="relative pb-24">
        <Container size="xl">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 backdrop-blur-xl sm:flex-row sm:items-center sm:p-12">
              <h2 className="max-w-xl font-display text-2xl font-semibold sm:text-3xl">
                {t('ctaTitle')}
              </h2>
              <LinkButton href="/kontakt" variant="primary" size="lg">
                {t('ctaButton')}
              </LinkButton>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
