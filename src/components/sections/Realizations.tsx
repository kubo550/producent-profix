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
        {
          src: '/photos/realization-room-before-1.jpg',
          alt: 'Pomieszczenie przed tynkowaniem - ujęcie 1',
          variant: 'before',
          labelKey: 'before',
        },
        {
          src: '/photos/realization-room-after-1.jpg',
          alt: 'Pomieszczenie po tynkowaniu - ujęcie 1',
          variant: 'after',
          labelKey: 'after',
        },
        {
          src: '/photos/realization-room-before-2.jpg',
          alt: 'Pomieszczenie przed tynkowaniem - ujęcie 2',
          variant: 'before',
          labelKey: 'before',
        },
        {
          src: '/photos/realization-room-after-2.jpg',
          alt: 'Pomieszczenie po tynkowaniu - ujęcie 2',
          variant: 'after',
          labelKey: 'after',
        },
      ],
    },
    {
      id: 'hall',
      layout: 'duo',
      tiles: [
        {
          src: '/photos/workers-team.jpg',
          alt: 'Ekipa PROFIX w trakcie prac tynkarskich na większym obiekcie',
          variant: 'before',
          labelKey: 'process',
        },
        {
          src: '/photos/realization-hall-after.jpg',
          alt: 'Hala przemysłowa po zakończeniu prac wykończeniowych PROFIX',
          variant: 'after',
          labelKey: 'result',
        },
      ],
    },
  ];

  return (
    <section id="realizacje" className="section-alt relative overflow-hidden py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-32 -z-10 h-96 w-96 rounded-full bg-[var(--color-accent)] opacity-[0.06] blur-[120px]"
      />
      <Container size="xl">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
          align="center"
          className="mb-16"
        />

        <div className="space-y-8">
          {cases.map((c, idx) => (
            <Reveal key={c.id} delay={idx * 0.1}>
              <article className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 backdrop-blur-xl sm:p-10">
                <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                  <div className="max-w-2xl">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-fg-subtle">
                      {t(`cases.${c.id}.label`)}
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">
                      {t(`cases.${c.id}.title`)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-fg-muted sm:text-base">
                      {t(`cases.${c.id}.description`)}
                    </p>
                  </div>
                  <ul className="flex flex-wrap gap-2 text-xs">
                    {(t.raw(`cases.${c.id}.tags`) as string[]).map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface-strong)] px-3 py-1.5 font-medium text-fg-muted"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className={
                    c.layout === 'quad'
                      ? 'grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4'
                      : 'grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2'
                  }
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
    <div
      className={`group relative overflow-hidden rounded-2xl border border-[var(--color-border)] ${
        aspect === '4/5' ? 'aspect-[4/5]' : 'aspect-[16/10]'
      }`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 768px) 22vw, 45vw"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
      <span
        className={`absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] backdrop-blur ${
          variant === 'before'
            ? 'bg-black/55 text-white/90'
            : 'bg-[var(--color-accent)] text-[var(--color-accent-fg)]'
        }`}
      >
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            variant === 'before' ? 'bg-white/70' : 'bg-[var(--color-accent-fg)]'
          }`}
        />
        {label}
      </span>
    </div>
  );
}
