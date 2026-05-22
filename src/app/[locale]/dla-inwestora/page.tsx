import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowRight, Home, Sparkles, Wallet, Sun, Building2, KeySquare } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/sections/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { LinkButton } from '@/components/ui/Button';
import { Distributors } from '@/components/sections/Distributors';

const sectionIcons = [Home, Sparkles, Wallet, Sun, Building2, KeySquare] as const;

// Real photos for each section card (matches pl.json investorPage.sections order).
const cardImages = [
  '/photos/inwestor-04-paint.jpg',        // Dobór produktów — paleta kolorów farb
  '/photos/inwestor-05-architecture.jpg', // Mapa punktów sprzedaży — nowoczesna architektura
  '/photos/inwestor-06-renovation.jpg',   // Konsultacja przed zakupem — para w trakcie remontu
  '/photos/inwestor-01-house.jpg',
  '/photos/inwestor-02-interior.jpg',
  '/photos/inwestor-03-facade.jpg',
];

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
        <p className="text-pretty text-base leading-[1.7] text-fg-muted sm:text-lg">
          {t('intro')}
        </p>
      </PageHero>

      {/* Editorial photo spread — real PROFIX photo */}
      <section className="relative pb-16">
        <Container size="xl">
          <Reveal>
            <figure className="relative aspect-[22/9] overflow-hidden rounded-md border border-[var(--color-border-strong)] shadow-[var(--shadow-soft-lg)]">
              <Image
                src="/photos/inwestor-hero.jpg"
                alt="Nowoczesny dom jednorodzinny - przykład realizacji z wykorzystaniem materiałów PROFIX"
                fill
                priority
                sizes="(min-width: 1024px) 1200px, 100vw"
                className="h-photo-warm object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-deep)]/40 via-transparent to-transparent" />
              <figcaption className="absolute bottom-6 left-6 flex items-center gap-3 rounded-md bg-[var(--color-paper)]/95 px-4 py-2.5 shadow-[var(--shadow-soft)]">
                <Home size={16} strokeWidth={1.75} className="text-[var(--color-accent)]" />
                <span className="text-[13px] font-medium uppercase tracking-[0.14em] text-[var(--color-fg)]">
                  Dom · elewacja · wnętrze
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
              const src = cardImages[i % cardImages.length];
              return (
                <Reveal key={s.title} delay={(i % 3) * 0.08}>
                  <article className="group flex h-full flex-col overflow-hidden rounded-md border border-[var(--color-border)] bg-[var(--color-paper)] shadow-[var(--shadow-soft)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[var(--color-border-hover)] hover:shadow-[var(--shadow-soft-lg)]">
                    <div className="relative aspect-[16/10] overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-bg-deep)]">
                      <Image
                        src={src}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 30vw, 100vw"
                        className="h-photo-warm object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-deep)]/45 via-transparent to-transparent" />
                      <span className="absolute left-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-paper)] text-[var(--color-accent)] shadow-[var(--shadow-soft)]">
                        <Icon size={20} strokeWidth={1.5} />
                      </span>
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

      <Distributors />

      {/* CTA spread — real PROFIX photo backdrop */}
      <section className="relative pb-24 pt-8">
        <Container size="xl">
          <Reveal>
            <div className="relative overflow-hidden rounded-md border border-[var(--color-border-strong)] bg-[var(--color-paper)] shadow-[var(--shadow-soft-lg)]">
              <Image
                src="/photos/inwestor-closing.jpg"
                alt=""
                aria-hidden
                fill
                sizes="(min-width: 1024px) 1200px, 100vw"
                className="h-photo-warm object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-paper)]/95 via-[var(--color-paper)]/85 to-[var(--color-paper)]/55" />
              <div className="relative flex flex-col items-start justify-between gap-7 p-8 sm:flex-row sm:items-center sm:p-12">
                <div className="max-w-xl space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="h-rule" />
                    <span className="h-eyebrow">Inwestycja</span>
                  </div>
                  <h2
                    className="font-display text-3xl font-medium leading-[1.05] tracking-tight sm:text-4xl"
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
