import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Check, ShieldCheck, Clock, Zap, Wallet, Phone, Mail, MapPin, MessageSquare } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { LinkButton } from '@/components/ui/Button';
import { FleetGallery } from '@/components/ui/FleetGallery';
import { siteConfig } from '@/content/site';

type Item = { title: string; description: string };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'transportPage' });
  return {
    title: t('meta.title'),
    description: t('meta.description'),
    keywords: [
      'transport HDS',
      'dostawa HDS',
      'transport materiałów luzem',
      'technika silosowa',
      'cysterny do materiałów sypkich',
      'transport materiałów budowlanych',
      'logistyka budowlana',
      'transport krajowy i międzynarodowy',
    ],
    alternates: { canonical: `/${locale}/transport` },
  };
}

const advantageIcons = [Clock, Zap, Wallet, ShieldCheck] as const;

const gallerySlides = [
  { src: '/photos/truck-cysterna.jpg', alt: 'Niebieska cysterna PROFIX w trasie wśród pól rzepaku' },
  { src: '/photos/fleet-loading.jpg', alt: 'Załadunek zestawu PROFIX wózkiem widłowym' },
  { src: '/photos/fleet-cysterna-road.jpg', alt: 'Cysterna silosowa PROFIX w trasie' },
  { src: '/photos/truck-delivery.jpg', alt: 'Dostawa materiałów PROFIX na osiedle domów' },
  { src: '/photos/fleet-cysterna-loading.jpg', alt: 'Cysterna PROFIX na stacji załadunku materiałów sypkich' },
  { src: '/photos/fleet-flatbed.jpg', alt: 'Zestaw PROFIX z dźwigiem HDS i długim ładunkiem' },
];

function Bullets({ items }: { items: Item[] }) {
  return (
    <ul className="space-y-3 pt-1">
      {items.map((it) => (
        <li key={it.title} className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[var(--color-accent)] text-[var(--color-accent-fg)]">
            <Check size={14} strokeWidth={2.5} />
          </span>
          <span className="text-[15px] leading-relaxed">
            <strong className="font-semibold text-[var(--color-fg)]">{it.title}.</strong>{' '}
            <span className="text-fg-muted">{it.description}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

export default async function TransportPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('transportPage');

  const introBody = t.raw('intro.body') as string[];
  const certs = t.raw('intro.certs') as string[];
  const hdsItems = t.raw('hds.items') as Item[];
  const cysternItems = t.raw('cystern.items') as Item[];
  const advantages = t.raw('advantages.items') as Item[];
  const { address } = siteConfig;

  return (
    <>
      {/* Photo hero - cała flota */}
      <section className="relative h-[60vh] min-h-[460px] w-full overflow-hidden">
        <Image
          src="/photos/fleet-lineup.jpg"
          alt="Flota ciężarówek PROFIX: cysterny silosowe i zestawy z HDS"
          fill
          priority
          sizes="100vw"
          className="h-photo-warm object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/80" />
        <div className="absolute inset-x-0 bottom-0">
          <Container size="xl">
            <div className="max-w-3xl pb-12 sm:pb-16">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/85">
                {t('hero.eyebrow')}
              </p>
              <h1 className="mt-3 text-balance font-display text-4xl font-semibold leading-[1.05] text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
                {t('hero.title')}
              </h1>
              <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-white/90 sm:text-lg">
                {t('hero.lead')}
              </p>
            </div>
          </Container>
        </div>
      </section>

      {/* Intro + certyfikaty */}
      <section className="relative py-16 sm:py-20">
        <Container size="xl">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal className="space-y-5">
              {introBody.map((p, i) => (
                <p key={i} className="text-pretty text-lg leading-relaxed text-fg-muted">
                  {p}
                </p>
              ))}
              <ul className="flex flex-wrap gap-2 pt-2">
                {certs.map((c) => (
                  <li
                    key={c}
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-3.5 py-1.5 text-sm text-fg-muted"
                  >
                    <ShieldCheck size={14} strokeWidth={2} className="flex-none text-[var(--color-accent)]" />
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1}>
              <figure className="relative aspect-[4/3] overflow-hidden rounded-md border border-[var(--color-border-strong)] shadow-[var(--shadow-soft-lg)]">
                <Image
                  src="/photos/truck-profix.jpg"
                  alt="Ciężarówka PROFIX, flota transportowa producenta z Krzeszowic"
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="h-photo-warm object-cover"
                />
              </figure>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* HDS */}
      <section className="section-alt relative py-20 sm:py-24">
        <Container size="xl">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <figure className="relative aspect-[4/3] overflow-hidden rounded-md border border-[var(--color-border-strong)] shadow-[var(--shadow-soft-lg)]">
                <Image
                  src="/photos/truck-hds.jpg"
                  alt="Ciężarówka PROFIX z dźwigiem HDS i skrzynią ładunkową"
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="h-photo-warm object-cover"
                />
              </figure>
            </Reveal>
            <Reveal delay={0.1} className="space-y-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
                {t('hds.eyebrow')}
              </p>
              <h2 className="font-display text-3xl font-semibold sm:text-4xl">{t('hds.title')}</h2>
              <p className="text-pretty leading-relaxed text-fg-muted">{t('hds.lead')}</p>
              <Bullets items={hdsItems} />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Cysterny */}
      <section className="relative py-20 sm:py-24">
        <Container size="xl">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal className="order-2 space-y-4 lg:order-1">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
                {t('cystern.eyebrow')}
              </p>
              <h2 className="font-display text-3xl font-semibold sm:text-4xl">{t('cystern.title')}</h2>
              <p className="text-pretty leading-relaxed text-fg-muted">{t('cystern.lead')}</p>
              <Bullets items={cysternItems} />
            </Reveal>
            <Reveal delay={0.1} className="order-1 lg:order-2">
              <figure className="relative aspect-[4/3] overflow-hidden rounded-md border border-[var(--color-border-strong)] shadow-[var(--shadow-soft-lg)]">
                <Image
                  src="/photos/truck-silo-loading.jpg"
                  alt="Cysterna PROFIX przy silosach, załadunek materiałów sypkich w technice silosowej"
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="h-photo-warm object-cover"
                />
              </figure>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Dlaczego PROFIX */}
      <section className="section-alt relative py-20 sm:py-24">
        <Container size="xl">
          <h2 className="mb-10 text-center font-display text-3xl font-semibold sm:text-4xl">
            {t('advantages.title')}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {advantages.map((a, i) => {
              const Icon = advantageIcons[i] ?? ShieldCheck;
              return (
                <Reveal key={a.title} delay={(i % 4) * 0.06}>
                  <div className="flex h-full flex-col gap-3 rounded-md border border-[var(--color-border)] bg-[var(--color-paper)] p-6 shadow-[var(--shadow-soft)]">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                      <Icon size={20} strokeWidth={1.75} />
                    </span>
                    <h3 className="font-display text-lg font-semibold leading-tight">{a.title}</h3>
                    <p className="text-sm leading-relaxed text-fg-muted">{a.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Galeria floty */}
      <section className="relative py-20 sm:py-24">
        <Container size="xl">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">{t('gallery.title')}</h2>
            <p className="mt-3 text-pretty leading-relaxed text-fg-muted">{t('gallery.lead')}</p>
          </div>
          <Reveal>
            <FleetGallery
              slides={gallerySlides}
              captions={t.raw('gallery.captions') as string[]}
              prevLabel={t('gallery.prev')}
              nextLabel={t('gallery.next')}
            />
          </Reveal>
        </Container>
      </section>

      {/* CTA + kontakt */}
      <section className="section-alt relative py-20 sm:py-24">
        <Container size="md">
          <Reveal>
            <div className="rounded-2xl border border-[var(--color-accent)]/30 bg-[var(--color-accent-soft)] p-8 sm:p-10">
              <h2 className="font-display text-2xl font-semibold sm:text-3xl">{t('cta.title')}</h2>
              <p className="mt-2 max-w-2xl text-pretty leading-relaxed text-fg-muted">{t('cta.body')}</p>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 transition-colors hover:border-[var(--color-accent)]"
                >
                  <Phone size={18} strokeWidth={1.75} className="flex-none text-[var(--color-accent)]" />
                  <span className="text-sm font-medium text-[var(--color-fg)]">{siteConfig.phoneDisplay}</span>
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-3 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 transition-colors hover:border-[var(--color-accent)]"
                >
                  <Mail size={18} strokeWidth={1.75} className="flex-none text-[var(--color-accent)]" />
                  <span className="truncate text-sm font-medium text-[var(--color-fg)]">{siteConfig.email}</span>
                </a>
                <div className="flex items-center gap-3 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3">
                  <MapPin size={18} strokeWidth={1.75} className="flex-none text-[var(--color-accent)]" />
                  <span className="text-sm font-medium text-[var(--color-fg)]">
                    {address.street}, {address.postal} {address.city}
                  </span>
                </div>
              </div>

              <LinkButton href="/kontakt" variant="primary" size="lg" className="mt-8">
                <MessageSquare size={18} strokeWidth={1.75} />
                {t('cta.button')}
              </LinkButton>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
