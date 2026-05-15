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

        <div className="grid gap-7 lg:grid-cols-2">
          <Reveal>
            <Card
              icon={<HardHat size={22} strokeWidth={1.5} />}
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
              icon={<Home size={22} strokeWidth={1.5} />}
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
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-md border shadow-[var(--shadow-soft)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-soft-lg)] ${
        isPrimary
          ? 'border-[var(--color-border-strong)] bg-[var(--color-bg-deep)] text-[var(--color-fg-inverse)]'
          : 'border-[var(--color-border)] bg-[var(--color-paper)] text-[var(--color-fg)]'
      }`}
    >
      {/* Hero photo */}
      {image && (
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={image}
            alt=""
            aria-hidden
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-photo-warm object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div
            className={`absolute inset-0 ${
              isPrimary
                ? 'bg-gradient-to-t from-[var(--color-bg-deep)] via-[var(--color-bg-deep)]/40 to-transparent'
                : 'bg-gradient-to-t from-[var(--color-paper)]/95 via-[var(--color-paper)]/40 to-transparent'
            }`}
          />
          <div className="absolute left-6 top-6 flex items-center gap-3">
            <span
              className={`inline-flex h-12 w-12 items-center justify-center rounded-full ${
                isPrimary
                  ? 'bg-[var(--color-accent)] text-[var(--color-accent-fg)]'
                  : 'bg-[var(--color-paper)] text-[var(--color-accent)] shadow-[var(--shadow-soft)]'
              }`}
            >
              {icon}
            </span>
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col p-8 sm:p-10">
        <h3
          className="font-display text-3xl font-medium leading-[1.1] tracking-tight sm:text-4xl"
          style={{ fontVariationSettings: '"SOFT" 50, "opsz" 48' }}
        >
          {title}
        </h3>
        <p
          className={`mt-4 text-pretty text-base leading-[1.7] sm:text-lg ${
            isPrimary ? 'text-[var(--color-fg-inverse-muted)]' : 'text-fg-muted'
          }`}
        >
          {description}
        </p>

        <ul
          className={`mt-8 space-y-3 border-t pt-7 ${
            isPrimary ? 'border-[var(--color-fg-inverse)]/15' : 'border-[var(--color-border)]'
          }`}
        >
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-3 text-[15px] sm:text-base">
              <span
                className={`mt-1 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full ${
                  isPrimary
                    ? 'bg-[var(--color-accent)] text-[var(--color-accent-fg)]'
                    : 'bg-[var(--color-accent)] text-[var(--color-accent-fg)]'
                }`}
              >
                <Check size={12} strokeWidth={2.5} />
              </span>
              <span className={isPrimary ? 'text-[var(--color-fg-inverse)]' : 'text-[var(--color-fg)]'}>
                {b}
              </span>
            </li>
          ))}
        </ul>

        <Link
          href={href}
          className={`group/cta mt-10 inline-flex items-center gap-2 self-start text-base font-medium transition-all hover:gap-3 ${
            isPrimary ? 'text-[var(--color-accent)]' : 'text-[var(--color-accent)]'
          }`}
        >
          <span className="border-b border-current pb-0.5">{cta}</span>
          <ArrowRight size={18} strokeWidth={1.75} />
        </Link>
      </div>
    </article>
  );
}
