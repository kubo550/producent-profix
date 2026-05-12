'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Menu, X, Phone } from 'lucide-react';
import { Link, usePathname } from '@/i18n/navigation';
import { Container } from '@/components/ui/Container';
import { LinkButton } from '@/components/ui/Button';
import { LocaleSwitcher } from '@/components/ui/LocaleSwitcher';
import { siteConfig } from '@/content/site';
import { cn } from '@/lib/cn';

const navLinks = [
  { href: '/o-firmie', key: 'about' },
  { href: '/produkty', key: 'products' },
  { href: '/dla-fachowca', key: 'professional' },
  { href: '/dla-inwestora', key: 'investor' },
  { href: '/fundusze-europejskie', key: 'funds' },
  { href: '/kontakt', key: 'contact' },
] as const;

export function Navbar() {
  const t = useTranslations('nav');
  const tCommon = useTranslations('common');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-all duration-300',
        scrolled ? 'py-2' : 'py-4'
      )}
    >
      <Container size="xl">
        <div
          className={cn(
            'flex items-center justify-between gap-6 rounded-full border px-4 py-2 transition-all duration-300 sm:px-6',
            scrolled
              ? 'border-[var(--color-border-strong)] shadow-[0_18px_50px_-20px_rgba(0,0,0,0.45)] backdrop-blur-2xl'
              : 'border-[var(--color-border)] backdrop-blur-md'
          )}
          style={{
            backgroundColor: scrolled
              ? 'color-mix(in srgb, var(--color-bg) 88%, transparent)'
              : 'color-mix(in srgb, var(--color-bg) 35%, transparent)',
          }}
        >
          <Link href="/" aria-label={siteConfig.name} className="group flex items-center">
            <Image
              src="/brand/logo-transparent.png"
              alt={siteConfig.name}
              width={2400}
              height={1500}
              priority
              className="-mt-1.5 h-10 w-auto transition-transform group-hover:scale-105 sm:-mt-2 sm:h-12"
            />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.key}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'relative rounded-full px-3 py-2 text-sm transition-colors',
                    active
                      ? 'bg-[var(--color-accent-soft)] font-medium text-[var(--color-accent)]'
                      : 'text-fg-muted hover:bg-[var(--color-surface)] hover:text-[var(--color-fg)]'
                  )}
                >
                  {t(link.key)}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${siteConfig.phone}`}
              className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-fg-muted transition-colors hover:text-[var(--color-fg)] md:inline-flex"
              aria-label={tCommon('phone')}
            >
              <Phone size={14} strokeWidth={1.75} />
              <span className="hidden xl:inline">{siteConfig.phoneDisplay}</span>
            </a>
            <div className="hidden sm:block">
              <LocaleSwitcher />
            </div>
            <LinkButton href="#kontakt" variant="primary" size="sm" className="hidden sm:inline-flex">
              {t('cta')}
            </LinkButton>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? tCommon('closeMenu') : tCommon('openMenu')}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-fg)] backdrop-blur transition-colors hover:bg-[var(--color-surface-strong)] lg:hidden"
            >
              {open ? <X size={16} strokeWidth={1.75} /> : <Menu size={16} strokeWidth={1.75} />}
            </button>
          </div>
        </div>
      </Container>

      {open && (
        <div className="fixed inset-x-0 top-[68px] z-30 mx-4 mt-2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-strong)] p-4 shadow-2xl backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.key}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'rounded-xl px-4 py-3 text-base transition-colors',
                    active
                      ? 'bg-[var(--color-accent-soft)] font-medium text-[var(--color-accent)]'
                      : 'text-fg-muted hover:bg-[var(--color-surface)] hover:text-[var(--color-fg)]'
                  )}
                >
                  {t(link.key)}
                </Link>
              );
            })}
            <a
              href={`tel:${siteConfig.phone}`}
              className="mt-2 inline-flex items-center gap-2 rounded-xl border border-[var(--color-border)] px-4 py-3 text-base font-medium text-[var(--color-fg)]"
            >
              <Phone size={16} strokeWidth={1.75} />
              {siteConfig.phoneDisplay}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
