'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { LinkButton } from '@/components/ui/Button';

export function Hero() {
  const t = useTranslations('hero');
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const photoY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28 sm:pt-32"
    >
      {/* Warm atmospheric wash — CSS-only, no CDN */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 85% 20%, rgba(184, 92, 42, 0.10), transparent 60%), radial-gradient(ellipse 50% 40% at 10% 80%, rgba(200, 157, 90, 0.10), transparent 60%)',
        }}
      />

      <Container size="xl">
        <motion.div style={{ y, opacity }} className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          {/* Type column */}
          <div className="relative space-y-8">
            <div
              className="reveal-fade-up flex items-center gap-3"
              style={{ '--reveal-delay': '0s' } as React.CSSProperties}
            >
              <span className="h-rule" />
              <span
                className="font-display italic text-base tracking-wide text-[var(--color-accent)]"
                style={{ fontVariationSettings: '"SOFT" 100, "opsz" 14' }}
              >
                Producent
              </span>
              <span className="h-eyebrow text-[var(--color-fg)]">— od 2009 — Krzeszowice, PL</span>
            </div>

            <h1
              className="reveal-fade-up font-display text-balance text-[clamp(3rem,7.5vw,5.75rem)] font-medium leading-[1.02] tracking-[-0.02em]"
              style={{
                '--reveal-delay': '0.1s',
                fontVariationSettings: '"SOFT" 50, "opsz" 144',
              } as React.CSSProperties}
            >
              {t('title')}
            </h1>

            <p
              className="reveal-fade-up max-w-xl text-pretty text-lg leading-[1.65] text-[var(--color-fg)] sm:text-xl"
              style={{ '--reveal-delay': '0.22s' } as React.CSSProperties}
            >
              {t('subtitle')}
            </p>

            <div
              className="reveal-fade-up flex flex-wrap items-center gap-4 pt-2"
              style={{ '--reveal-delay': '0.32s' } as React.CSSProperties}
            >
              <LinkButton href="#produkty" variant="primary" size="lg">
                {t('ctaPrimary')}
                <ArrowRight size={18} strokeWidth={1.75} />
              </LinkButton>
              <LinkButton href="#kontakt" variant="secondary" size="lg">
                {t('ctaSecondary')}
              </LinkButton>
            </div>

            {/* Trust strip — refined stamps */}
            <div
              className="reveal-fade-up flex flex-wrap items-center gap-x-6 gap-y-3 pt-6"
              style={{ '--reveal-delay': '0.44s' } as React.CSSProperties}
            >
              <span className="h-stamp">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                Atesty CE · PZH
              </span>
              <span className="h-stamp">17+ lat</span>
              <span className="h-stamp">100% PL</span>
            </div>
          </div>

          {/* Photo column */}
          <motion.div
            style={{ y: photoY }}
            className="reveal-fade-up relative hidden aspect-[4/5] lg:block"
          >
            <HeroComposition />
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <a
          href="#o-firmie"
          aria-label={t('scroll')}
          className="reveal-fade-up absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.22em] text-fg-subtle sm:flex"
          style={{ '--reveal-delay': '0.6s' } as React.CSSProperties}
        >
          {t('scroll')}
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={18} strokeWidth={1.5} />
          </motion.span>
        </a>
      </Container>
    </section>
  );
}

function HeroComposition() {
  return (
    <div className="relative h-full w-full">
      {/* Soft warm shadow under the photo */}
      <div
        aria-hidden
        className="absolute -bottom-8 left-6 right-6 h-16 rounded-full bg-[var(--color-accent)]/25 blur-2xl"
      />
      {/* Decorative offset card behind */}
      <div
        aria-hidden
        className="absolute -bottom-4 -right-4 top-12 left-12 rounded-md border border-[var(--color-border)] bg-[var(--color-paper-2)]"
      />
      {/* Main photo plate */}
      <div className="h-photo-overlay relative h-full w-full overflow-hidden rounded-md border border-[var(--color-border-strong)] shadow-[var(--shadow-soft-lg)]">
        <Image
          src="/photos/worker-pro.jpg"
          alt="Pracownik PROFIX w hełmie i kamizelce w trakcie tynkowania"
          fill
          priority
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="h-photo-warm object-cover object-[35%_center]"
        />
        {/* Caption plate */}
        <figcaption className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
          <div className="rounded-md bg-[var(--color-paper)]/95 px-4 py-3 backdrop-blur-sm shadow-[var(--shadow-soft)]">
            <p className="font-display italic text-xs text-[var(--color-accent)]" style={{ fontVariationSettings: '"SOFT" 100, "opsz" 14' }}>
              — Hala produkcyjna
            </p>
            <p
              className="mt-0.5 font-display text-lg font-medium leading-tight tracking-tight text-[var(--color-fg)]"
              style={{ fontVariationSettings: '"SOFT" 50, "opsz" 36' }}
            >
              Krzeszowice
            </p>
          </div>
          <span className="rounded-full bg-[var(--color-accent)]/90 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-accent-fg)] backdrop-blur-sm">
            est. 2009
          </span>
        </figcaption>
      </div>
    </div>
  );
}
