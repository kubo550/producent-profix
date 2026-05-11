'use client';

import { useRef } from 'react';
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
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-accent)] backdrop-blur"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
              {t('eyebrow')}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-balance text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-[5rem]"
            >
              {t('title')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-xl text-pretty text-lg leading-relaxed text-fg-muted sm:text-xl"
            >
              {t('subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-3"
            >
              <LinkButton href="#produkty" variant="primary" size="lg">
                {t('ctaPrimary')}
                <ArrowRight size={18} strokeWidth={1.75} />
              </LinkButton>
              <LinkButton href="#kontakt" variant="secondary" size="lg">
                {t('ctaSecondary')}
              </LinkButton>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden aspect-square lg:block"
          >
            <HeroComposition />
          </motion.div>
        </motion.div>

        <motion.a
          href="#o-firmie"
          aria-label={t('scroll')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.18em] text-fg-subtle sm:flex"
        >
          {t('scroll')}
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={18} strokeWidth={1.5} />
          </motion.span>
        </motion.a>
      </Container>
    </section>
  );
}

function HeroComposition() {
  return (
    <div className="relative h-full w-full">
      <motion.div
        animate={{ rotate: [0, 6, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 rounded-[40%_60%_55%_45%_/_50%_45%_55%_50%] bg-gradient-to-br from-[var(--color-accent)] via-[#c8702f] to-[#5d3a20] opacity-90"
      />
      <motion.div
        animate={{ rotate: [0, -8, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-6 rounded-[55%_45%_60%_40%_/_45%_55%_45%_55%] bg-gradient-to-tl from-[#7c4e2d] via-[#a8481a] to-transparent opacity-80 mix-blend-overlay"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="rounded-3xl border border-white/15 bg-black/25 px-8 py-6 text-center backdrop-blur-xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/70">Skawina</p>
          <p className="mt-2 font-display text-5xl font-bold text-white">2007</p>
          <p className="mt-1 text-sm text-white/80">rok założenia</p>
        </div>
      </div>
      <div className="absolute -top-4 right-12 rounded-2xl border border-white/15 bg-black/35 px-4 py-3 text-sm backdrop-blur-xl">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">Atesty</p>
        <p className="mt-0.5 font-display text-lg font-semibold text-white">CE + PZH</p>
      </div>
      <div className="absolute -bottom-2 left-4 rounded-2xl border border-white/15 bg-black/35 px-4 py-3 text-sm backdrop-blur-xl">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">Transport</p>
        <p className="mt-0.5 font-display text-lg font-semibold text-white">HDS + cysterny</p>
      </div>
    </div>
  );
}
