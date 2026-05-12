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

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const blobY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-24 sm:pt-28"
    >
      <motion.div
        aria-hidden
        style={{ y: blobY, scale }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -right-32 top-10 h-[520px] w-[520px] rounded-full bg-[var(--color-accent)] opacity-15 blur-[120px]" />
        <div className="absolute -left-32 bottom-10 h-[480px] w-[480px] rounded-full bg-[#7c4e2d] opacity-20 blur-[120px]" />
      </motion.div>

      <Container size="xl">
        <motion.div style={{ y, opacity }} className="grid items-center gap-16 lg:grid-cols-[1.1fr_1fr]">
          <div className="space-y-8">
            <p
              className="reveal-fade-up inline-flex items-center gap-2 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-accent)] backdrop-blur"
              style={{ '--reveal-delay': '0s' } as React.CSSProperties}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
              {t('eyebrow')}
            </p>

            <h1
              className="reveal-fade-up text-balance text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-[5rem]"
              style={{ '--reveal-delay': '0.1s' } as React.CSSProperties}
            >
              {t('title')}
            </h1>

            <p
              className="reveal-fade-up max-w-xl text-pretty text-lg leading-relaxed text-fg-muted sm:text-xl"
              style={{ '--reveal-delay': '0.2s' } as React.CSSProperties}
            >
              {t('subtitle')}
            </p>

            <div
              className="reveal-fade-up flex flex-wrap items-center gap-3"
              style={{ '--reveal-delay': '0.3s' } as React.CSSProperties}
            >
              <LinkButton href="#produkty" variant="primary" size="lg">
                {t('ctaPrimary')}
                <ArrowRight size={18} strokeWidth={1.75} />
              </LinkButton>
              <LinkButton href="#kontakt" variant="secondary" size="lg">
                {t('ctaSecondary')}
              </LinkButton>
            </div>
          </div>

          <div
            className="reveal-fade-up relative hidden aspect-square lg:block"
            style={{ '--reveal-delay': '0.25s', '--reveal-y': '0px' } as React.CSSProperties}
          >
            <HeroComposition />
          </div>
        </motion.div>

        <a
          href="#o-firmie"
          aria-label={t('scroll')}
          className="reveal-fade-up absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.18em] text-fg-subtle sm:flex"
          style={{ '--reveal-delay': '0.5s' } as React.CSSProperties}
        >
          {t('scroll')}
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
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
      <motion.div
        aria-hidden
        animate={{ rotate: [0, 6, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -inset-3 rounded-[40%_60%_55%_45%_/_50%_45%_55%_50%] bg-gradient-to-br from-[var(--color-accent)] via-[#c8702f] to-[#5d3a20] opacity-40 blur-2xl"
      />
      <motion.div
        animate={{ rotate: [0, -4, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 overflow-hidden rounded-[40%_60%_55%_45%_/_50%_45%_55%_50%] border border-white/15 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.55)]"
      >
        <Image
          src="/photos/worker-pro.jpg"
          alt="Pracownik PROFIX w hełmie i kamizelce w trakcie tynkowania"
          fill
          priority
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-cover object-[35%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-[var(--color-accent)]/25 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/15" />
      </motion.div>
      <div className="absolute left-2 top-4 rounded-2xl border border-white/20 bg-black/55 px-4 py-3 backdrop-blur-xl">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">Skawina</p>
        <p className="mt-0.5 font-display text-2xl font-bold leading-none text-white">2007</p>
        <p className="mt-1 text-[11px] text-white/70">rok założenia</p>
      </div>
      <div className="absolute -top-4 right-10 rounded-2xl border border-white/20 bg-black/55 px-4 py-3 text-sm backdrop-blur-xl">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/65">Atesty</p>
        <p className="mt-0.5 font-display text-lg font-semibold text-white">CE + PZH</p>
      </div>
      <div className="absolute -bottom-2 right-6 rounded-2xl border border-white/20 bg-black/55 px-4 py-3 text-sm backdrop-blur-xl">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/65">Transport</p>
        <p className="mt-0.5 font-display text-lg font-semibold text-white">HDS + cysterny</p>
      </div>
    </div>
  );
}
