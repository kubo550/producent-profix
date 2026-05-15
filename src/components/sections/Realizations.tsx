import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';

type Tile = {
  src: string;
  alt: string;
  variant: 'before' | 'after';
  labelKey: 'before' | 'after' | 'process' | 'result';
};

type Case = {
  id: string;
  tiles: Tile[];
  layout: 'quad' | 'duo';
};

export async function Realizations() {
  const t = await getTranslations('realizations');

  const cases: Case[] = [
    {
      id: 'room',
      layout: 'quad',
      tiles: [
        { src: '/photos/realization-room-before-1.jpg', alt: 'Pomieszczenie przed tynkowaniem - ujęcie 1', variant: 'before', labelKey: 'before' },
        { src: '/photos/realization-room-after-1.jpg', alt: 'Pomieszczenie po tynkowaniu - ujęcie 1', variant: 'after', labelKey: 'after' },
        { src: '/photos/realization-room-before-2.jpg', alt: 'Pomieszczenie przed tynkowaniem - ujęcie 2', variant: 'before', labelKey: 'before' },
        { src: '/photos/realization-room-after-2.jpg', alt: 'Pomieszczenie po tynkowaniu - ujęcie 2', variant: 'after', labelKey: 'after' },
      ],
    },
    {
      id: 'hall',
      layout: 'duo',
      tiles: [
        { src: '/photos/workers-team.jpg', alt: 'Ekipa PROFIX w trakcie prac tynkarskich na większym obiekcie', variant: 'before', labelKey: 'process' },
        { src: '/photos/realization-hall-after.jpg', alt: 'Hala przemysłowa po zakończeniu prac wykończeniowych PROFIX', variant: 'after', labelKey: 'result' },
      ],
    },
  ];

  return (
    <section id="realizacje" className="section-alt relative overflow-hidden py-24 sm:py-32">
      <Container size="xl">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
          align="center"
          className="mb-16"
        />

        <div className="space-y-10">
          {cases.map((c, idx) => (
            <Reveal key={c.id} delay={idx * 0.1}>
              <article className="overflow-hidden rounded-md border border-[var(--color-border)] bg-[var(--color-paper)] shadow-[var(--shadow-soft)]">
                <header className="flex flex-wrap items-end justify-between gap-6 border-b border-[var(--color-border)] p-7 sm:p-9">
                  <div className="max-w-2xl space-y-3">
                    <span className="h-eyebrow">{t(`cases.${c.id}.label`)}</span>
                    <h3
                      className="font-display text-3xl font-medium leading-[1.1] tracking-tight sm:text-4xl"
                      style={{ fontVariationSettings: '"SOFT" 50, "opsz" 48' }}
                    >
                      {t(`cases.${c.id}.title`)}
                    </h3>
                    <p className="text-pretty text-[15px] leading-relaxed text-fg-muted sm:text-base">
                      {t(`cases.${c.id}.description`)}
                    </p>
                  </div>
                  <ul className="flex flex-wrap gap-2">
                    {(t.raw(`cases.${c.id}.tags`) as string[]).map((tag) => (
                      <li key={tag} className="h-stamp">
                        {tag}
                      </li>
                    ))}
                  </ul>
                </header>

                <div
                  className={`grid gap-3 p-6 sm:gap-4 sm:p-7 ${
                    c.layout === 'quad' ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-1 md:grid-cols-2'
                  }`}
                >
                  {c.tiles.map((tile, i) => (
                    <BeforeAfterTile
                      key={i}
                      src={tile.src}
                      alt={tile.alt}
                      label={t(`labels.${tile.labelKey}`)}
                      variant={tile.variant}
                      aspect={c.layout === 'quad' ? '4/5' : '16/10'}
                    />
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function BeforeAfterTile({
  src,
  alt,
  label,
  variant,
  aspect,
}: {
  src: string;
  alt: string;
  label: string;
  variant: 'before' | 'after';
  aspect: '4/5' | '16/10';
}) {
  return (
    <figure
      className={`group relative overflow-hidden rounded-sm border border-[var(--color-border)] shadow-[var(--shadow-soft)] ${
        aspect === '4/5' ? 'aspect-[4/5]' : 'aspect-[16/10]'
      }`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 768px) 22vw, 45vw"
        className="h-photo-warm object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-deep)]/65 via-transparent to-transparent" />
      <figcaption
        className={`absolute left-3 top-3 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] ${
          variant === 'before'
            ? 'bg-[var(--color-bg-deep)]/80 text-[var(--color-fg-inverse)] backdrop-blur-sm'
            : 'bg-[var(--color-accent)] text-[var(--color-accent-fg)]'
        }`}
      >
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            variant === 'before' ? 'bg-[var(--color-fg-inverse)]/80' : 'bg-[var(--color-accent-fg)]'
          }`}
        />
        {label}
      </figcaption>
    </figure>
  );
}
