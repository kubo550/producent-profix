import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { ArrowRight, HardHat, Home, Check } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Link } from '@/i18n/navigation';

export async function Audiences() {
  const t = await getTranslations('audiences');
  const pro = {
    title: t('professional.title'),
    description: t('professional.description'),
    bullets: t.raw('professional.bullets') as string[],
    cta: t('professional.cta'),
  };
  const inv = {
    title: t('investor.title'),
    description: t('investor.description'),
    bullets: t.raw('investor.bullets') as string[],
    cta: t('investor.cta'),
  };

  return (
    <section className="relative py-24 sm:py-32">
      <Container size="xl">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
          align="center"
          className="mb-16"
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <Card
              icon={<HardHat size={22} strokeWidth={1.75} />}
              title={pro.title}
              description={pro.description}
              bullets={pro.bullets}
              cta={pro.cta}
              href="/dla-fachowca"
              accent="primary"
              image="/photos/worker-hall.jpg"
            />
          </Reveal>
          <Reveal delay={0.12}>
            <Card
              icon={<Home size={22} strokeWidth={1.75} />}
              title={inv.title}
              description={inv.description}
              bullets={inv.bullets}
              cta={inv.cta}
              href="/dla-inwestora"
              accent="neutral"
              image="/stock/facade.jpg"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function Card({
  icon,
  title,
  description,
  bullets,
  cta,
  href,
  accent,
  image,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  bullets: string[];
  cta: string;
  href: '/dla-fachowca' | '/dla-inwestora';
  accent: 'primary' | 'neutral';
  image?: string;
}) {
  const isPrimary = accent === 'primary';
  return (
    <div
      className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border p-8 transition-all duration-300 hover:-translate-y-1 sm:p-10 ${
        isPrimary
          ? 'border-[var(--color-accent)]/40 bg-gradient-to-br from-[var(--color-accent)]/12 via-transparent to-transparent hover:border-[var(--color-accent)] hover:shadow-[0_24px_60px_-20px_rgba(232,132,58,0.4)]'
          : 'border-[var(--color-border)] bg-[var(--color-surface)] backdrop-blur-xl hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-strong)]'
      }`}
    >
      {image && (
        <Image
          src={image}
          alt=""
          aria-hidden
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="pointer-events-none absolute inset-0 -z-10 object-cover opacity-20 mix-blend-luminosity transition-opacity duration-500 group-hover:opacity-30"
        />
      )}
      <div className="relative">
        <div
          className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${
            isPrimary
              ? 'bg-[var(--color-accent)] text-[var(--color-accent-fg)]'
              : 'bg-[var(--color-surface-strong)] text-[var(--color-fg)]'
          }`}
        >
          {icon}
        </div>
        <h3 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h3>
        <p className="mt-4 text-pretty text-base leading-relaxed text-fg-muted sm:text-lg">
          {description}
        </p>
        <ul className="mt-8 space-y-3">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-3 text-sm sm:text-base">
              <span
                className={`mt-1 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full ${
                  isPrimary
                    ? 'bg-[var(--color-accent)] text-[var(--color-accent-fg)]'
                    : 'bg-[var(--color-fg)]/10 text-[var(--color-fg)]'
                }`}
              >
                <Check size={12} strokeWidth={2.5} />
              </span>
              <span className="text-fg-muted">{b}</span>
            </li>
          ))}
        </ul>
      </div>
      <Link
        href={href}
        className={`mt-10 inline-flex items-center gap-2 self-start text-base font-medium transition-all hover:gap-3 ${
          isPrimary ? 'text-[var(--color-accent)]' : 'text-[var(--color-fg)]'
        }`}
      >
        {cta}
        <ArrowRight size={18} strokeWidth={1.75} />
      </Link>
    </div>
  );
}
