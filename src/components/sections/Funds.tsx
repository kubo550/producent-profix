import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Link } from '@/i18n/navigation';

export async function Funds() {
  const t = await getTranslations('funds');

  return (
    <section className="relative py-20 sm:py-24">
      <Container size="xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-gradient-to-r from-[#003399] via-[#0040b3] to-[#ffd700]/30 p-8 sm:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_30%,rgba(255,215,0,0.25),transparent_60%)]" />
            <div className="relative grid items-center gap-8 lg:grid-cols-[auto_1fr_auto]">
              <div className="rounded-2xl bg-white/95 p-3 shadow-xl">
                <Image
                  src="/legacy/logo-eu.png"
                  alt="Fundusze Europejskie i Unia Europejska"
                  width={300}
                  height={68}
                  className="h-14 w-auto sm:h-16"
                />
              </div>
              <div className="space-y-3">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/85">
                  {t('eyebrow')}
                </p>
                <h2 className="font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
                  {t('title')}
                </h2>
                <p className="max-w-2xl text-pretty text-base leading-relaxed text-white/85 sm:text-lg">
                  {t('description')}
                </p>
              </div>
              <Link
                href="/fundusze-europejskie"
                className="inline-flex items-center justify-center gap-2 self-start rounded-full bg-white px-6 py-3 text-sm font-medium text-[#003399] transition-all hover:gap-3 hover:bg-white/90 lg:self-center"
              >
                {t('cta')}
                <ArrowRight size={18} strokeWidth={1.75} />
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
