'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Menu, X, Phone, ArrowRight, ChevronDown, ChevronRight } from 'lucide-react';
import { Link, usePathname } from '@/i18n/navigation';
import { Container } from '@/components/ui/Container';
import { LinkButton } from '@/components/ui/Button';
import { LocaleSwitcher } from '@/components/ui/LocaleSwitcher';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { siteConfig } from '@/content/site';
import { socialLinks } from '@/components/ui/social';
import { getCategory, isCategoryLive } from '@/content/categories';
import { categoryHasProducts } from '@/content/products';
import { cn } from '@/lib/cn';

/** Mega-menu organization: top-level entries + optional cascading children.
 * Keeps categories.ts flat (data) while presenting a hierarchical menu (view). */
type MenuEntry = { slug: string; children?: string[] };

const productMenuFull: MenuEntry[] = [
  { slug: 'farby-fasadowe-elewacyjne' },
  {
    slug: 'tynki-cementowo-wapienne',
    children: [
      'tynki-cienkowarstwowe',
      'tynki-produkty-uzupelniajace',
      'zaprawy-klejace-do-systemow-docieplen',
    ],
  },
  { slug: 'grunty' },
  { slug: 'impregnaty' },
  { slug: 'betony' },
  { slug: 'zaprawy-murarskie' },
  { slug: 'farby-wewnetrzne' },
  { slug: 'docieplenia-produkty-uzupelniajace' },
  { slug: 'szpachle-i-gladzie' },
  { slug: 'kleje' },
  { slug: 'inne-produkty' },
];

/** Filter out empty categories and prune empty children.
 * A parent entry stays visible if it has its own published products OR any
 * surviving child still has products. */
const isVisible = (slug: string) => isCategoryLive(slug) && categoryHasProducts(slug);
const productMenu: MenuEntry[] = productMenuFull.flatMap((entry) => {
  const survivingChildren = entry.children?.filter(isVisible) ?? [];
  const selfHas = isVisible(entry.slug);
  if (!selfHas && survivingChildren.length === 0) return [];
  return [{ slug: entry.slug, children: survivingChildren.length ? survivingChildren : undefined }];
});

type NavLink = {
  href: '/o-firmie' | '/produkty' | '/dla-fachowca' | '/dla-inwestora' | '/transport' | '/fundusze-europejskie' | '/kontakt';
  key: string;
  /** If true, this nav item shows a mega-menu of product categories on hover. */
  hasMegaMenu?: boolean;
  /** If true, the link is rendered but not clickable (placeholder while page is in progress). */
  disabled?: boolean;
};

const navLinks: readonly NavLink[] = [
  { href: '/o-firmie', key: 'about' },
  { href: '/produkty', key: 'products', hasMegaMenu: true },
  { href: '/dla-fachowca', key: 'professional', disabled: true },
  { href: '/dla-inwestora', key: 'investor', disabled: true },
  { href: '/fundusze-europejskie', key: 'funds' },
  { href: '/kontakt', key: 'contact' },
] as const;

const MEGA_CLOSE_DELAY_MS = 140;

export function Navbar() {
  const t = useTranslations('nav');
  const tCommon = useTranslations('common');
  const tCategories = useTranslations('categoriesSection');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  // Reset mega-menu on route change. Canonical "adjust state when a prop changes" pattern:
  // setState during render is allowed when gated on a value change.
  if (lastPath !== pathname) {
    setLastPath(pathname);
    if (megaOpen) setMegaOpen(false);
    if (expandedSlug !== null) setExpandedSlug(null);
    if (mobileProductsOpen) setMobileProductsOpen(false);
  }

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/');

  const openMega = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setMegaOpen(true);
  };

  const scheduleCloseMega = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setMegaOpen(false);
      setExpandedSlug(null);
    }, MEGA_CLOSE_DELAY_MS);
  };

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

  // Esc closes the mega-menu; a pointer-down outside the header closes it too,
  // so it can never get "stuck" open when the hover-leave is missed.
  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMegaOpen(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
        setExpandedSlug(null);
      }
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onPointerDown);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onPointerDown);
    };
  }, [megaOpen]);

  // At the top of a page whose hero is dark (home, about, category with bg video),
  // the transparent navbar sits over a dark surface - use the white/red logo there.
  const heroDark = (() => {
    if (scrolled) return false;
    if (pathname === '/' || pathname === '/o-firmie') return true;
    const m = pathname.match(/^\/produkty\/([^/]+)\/?$/);
    return m ? Boolean(getCategory(m[1])?.bgVideo) : false;
  })();

  return (
    <header
      ref={headerRef}
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
            {/* Dark-ink logo for light surfaces */}
            <Image
              src="/brand/logo-transparent.png"
              alt={siteConfig.name}
              width={2400}
              height={1500}
              priority
              className={cn(
                '-mt-1.5 h-10 w-auto transition-transform group-hover:scale-105 sm:-mt-2 sm:h-12',
                heroDark ? 'hidden' : 'block dark:hidden'
              )}
            />
            {/* White + red logo for dark surfaces (keeps the red tagline lit) */}
            <Image
              src="/brand/logo-white.png"
              alt={siteConfig.name}
              width={2400}
              height={1500}
              priority
              className={cn(
                '-mt-1.5 h-10 w-auto transition-transform group-hover:scale-105 sm:-mt-2 sm:h-12',
                heroDark ? 'block' : 'hidden dark:block'
              )}
            />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              if (link.disabled) {
                return (
                  <span
                    key={link.key}
                    aria-disabled="true"
                    title="Wkrótce"
                    className="rounded-full px-3 py-2 text-sm text-[var(--color-fg-subtle)] opacity-60 cursor-not-allowed select-none"
                  >
                    {t(link.key)}
                  </span>
                );
              }
              if (link.hasMegaMenu) {
                return (
                  <div
                    key={link.key}
                    className="relative"
                    onMouseEnter={openMega}
                    onMouseLeave={scheduleCloseMega}
                    onFocus={openMega}
                    onBlur={scheduleCloseMega}
                  >
                    <button
                      type="button"
                      onClick={() => setMegaOpen((v) => !v)}
                      aria-haspopup="true"
                      aria-expanded={megaOpen}
                      className={cn(
                        'inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm transition-colors',
                        active || megaOpen
                          ? 'bg-[var(--color-accent-soft)] font-medium text-[var(--color-accent)]'
                          : 'text-fg-muted hover:bg-[var(--color-surface)] hover:text-[var(--color-fg)]'
                      )}
                    >
                      {t(link.key)}
                      <ChevronDown
                        size={13}
                        strokeWidth={2}
                        className={cn(
                          'transition-transform duration-200',
                          megaOpen && '-rotate-180'
                        )}
                      />
                    </button>
                  </div>
                );
              }
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
            <ThemeToggle />
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

      {/* Desktop mega-menu under Products link */}
      <AnimatePresence>
        {megaOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute inset-x-0 top-full hidden px-4 lg:block"
          >
            <Container size="xl">
              <div
                onMouseEnter={openMega}
                onMouseLeave={scheduleCloseMega}
                className="pointer-events-auto mx-auto max-w-3xl pt-3"
              >
              <div
                className="overflow-hidden rounded-3xl border border-[var(--color-border-strong)] shadow-[0_28px_60px_-20px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--color-bg) 94%, transparent)',
                }}
              >
                <div className="grid grid-cols-[1fr_1fr]">
                  {/* Left: top-level items */}
                  <ul className="space-y-0.5 p-3">
                    {productMenu.map((entry, i) => {
                      const cat = getCategory(entry.slug);
                      if (!cat) return null;
                      const hasChildren = (entry.children?.length ?? 0) > 0;
                      const isExpanded = expandedSlug === entry.slug;
                      return (
                        <li
                          key={entry.slug}
                          onMouseEnter={() => setExpandedSlug(entry.slug)}
                        >
                          <Link
                            href={`/produkty/${cat.slug}`}
                            onClick={() => setMegaOpen(false)}
                            className={cn(
                              'group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors',
                              isExpanded
                                ? 'bg-[var(--color-accent-soft)]'
                                : 'hover:bg-[var(--color-surface)]'
                            )}
                          >
                            <span
                              className={cn(
                                'inline-flex h-6 w-6 flex-none items-center justify-center rounded-md font-mono text-[10px] uppercase tracking-[0.12em] transition-colors',
                                isExpanded
                                  ? 'bg-[var(--color-accent)] text-[var(--color-accent-fg)]'
                                  : 'bg-[var(--color-surface)] text-fg-subtle group-hover:bg-[var(--color-accent-soft)] group-hover:text-[var(--color-accent)]'
                              )}
                            >
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <span
                              className={cn(
                                'flex-1 truncate text-sm font-medium transition-colors',
                                isExpanded ? 'text-[var(--color-accent)]' : 'group-hover:text-[var(--color-fg)]'
                              )}
                            >
                              {cat.name}
                            </span>
                            {hasChildren && (
                              <ChevronRight
                                size={14}
                                strokeWidth={2}
                                className={cn(
                                  'flex-none transition-colors',
                                  isExpanded ? 'text-[var(--color-accent)]' : 'text-fg-subtle'
                                )}
                              />
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>

                  {/* Right: children panel OR default summary */}
                  <div
                    className="relative border-l border-[var(--color-border)] bg-[var(--color-surface)]/40 p-3"
                    onMouseEnter={() => {
                      // keep current expanded - just enter the panel
                    }}
                  >
                    <AnimatePresence mode="wait">
                      {expandedSlug ? (() => {
                        const expandedCat = getCategory(expandedSlug);
                        const expandedEntry = productMenu.find((m) => m.slug === expandedSlug);
                        const hasChildren = (expandedEntry?.children?.length ?? 0) > 0;
                        if (!expandedCat) return null;
                        return (
                          <motion.div
                            key={expandedSlug}
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -6 }}
                            transition={{ duration: 0.15 }}
                            className="flex h-full flex-col gap-3 p-2"
                          >
                            {expandedCat.coverImage && (
                              <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-[var(--color-border)]">
                                <div
                                  aria-hidden
                                  className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-accent)] opacity-[0.22] blur-[40px]"
                                />
                                <Image
                                  src={expandedCat.coverImage}
                                  alt=""
                                  fill
                                  sizes="(min-width: 1024px) 22vw, 100vw"
                                  className="object-contain p-2 transition-transform duration-500"
                                />
                              </div>
                            )}
                            {hasChildren ? (
                              <div className="flex-1 space-y-0.5">
                                <p className="px-3 pb-1 pt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-fg-subtle">
                                  {expandedCat.name}
                                </p>
                                {expandedEntry?.children?.map((childSlug) => {
                                  const child = getCategory(childSlug);
                                  if (!child) return null;
                                  return (
                                    <Link
                                      key={childSlug}
                                      href={`/produkty/${child.slug}`}
                                      onClick={() => setMegaOpen(false)}
                                      className="group flex items-start gap-2.5 rounded-xl px-3 py-2 transition-colors hover:bg-[var(--color-surface)]"
                                    >
                                      <span className="mt-1 inline-flex h-1.5 w-1.5 flex-none rounded-full bg-[var(--color-accent)]/40 transition-colors group-hover:bg-[var(--color-accent)]" />
                                      <span className="flex-1">
                                        <span className="block text-sm font-medium text-[var(--color-fg)] transition-colors group-hover:text-[var(--color-accent)]">
                                          {child.name}
                                        </span>
                                        <span className="mt-0.5 block text-xs leading-relaxed text-fg-muted">
                                          {child.short}
                                        </span>
                                      </span>
                                    </Link>
                                  );
                                })}
                              </div>
                            ) : (
                              <div className="flex flex-1 flex-col justify-between gap-3 px-2">
                                <div>
                                  <p className="font-display text-base font-semibold leading-tight">
                                    {expandedCat.name}
                                  </p>
                                  <p className="mt-1.5 text-xs leading-relaxed text-fg-muted">
                                    {expandedCat.short}
                                  </p>
                                </div>
                                <Link
                                  href={`/produkty/${expandedCat.slug}`}
                                  onClick={() => setMegaOpen(false)}
                                  className="inline-flex items-center gap-1.5 self-start text-sm font-medium text-[var(--color-accent)] transition-all hover:gap-2.5"
                                >
                                  Zobacz produkty
                                  <ArrowRight size={14} strokeWidth={2} />
                                </Link>
                              </div>
                            )}
                          </motion.div>
                        );
                      })() : (
                        <motion.div
                          key="default"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          className="flex h-full flex-col justify-between gap-4 p-3"
                        >
                          <div>
                            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
                              {tCategories('eyebrow')}
                            </p>
                            <p className="mt-2 font-display text-lg font-semibold leading-tight">
                              {tCategories('title')}
                            </p>
                            <p className="mt-2 text-xs leading-relaxed text-fg-muted">
                              {tCategories('subtitle')}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>

      {open && (
        <div className="fixed inset-x-0 top-[68px] z-30 mx-4 mt-2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-strong)] p-4 shadow-2xl backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              if (link.disabled) {
                return (
                  <span
                    key={link.key}
                    aria-disabled="true"
                    className="rounded-xl px-4 py-3 text-base text-[var(--color-fg-subtle)] opacity-60 cursor-not-allowed select-none"
                  >
                    {t(link.key)} <span className="text-xs">(wkrótce)</span>
                  </span>
                );
              }
              if (link.hasMegaMenu) {
                return (
                  <div key={link.key}>
                    <button
                      type="button"
                      onClick={() => setMobileProductsOpen((v) => !v)}
                      aria-expanded={mobileProductsOpen}
                      className={cn(
                        'flex w-full items-center justify-between rounded-xl px-4 py-3 text-base transition-colors',
                        active
                          ? 'bg-[var(--color-accent-soft)] font-medium text-[var(--color-accent)]'
                          : 'text-fg-muted hover:bg-[var(--color-surface)] hover:text-[var(--color-fg)]'
                      )}
                    >
                      {t(link.key)}
                      <ChevronDown
                        size={16}
                        strokeWidth={2}
                        className={cn('transition-transform', mobileProductsOpen && '-rotate-180')}
                      />
                    </button>
                    {mobileProductsOpen && (
                      <ul className="mb-1 ml-3 mt-1 space-y-0.5 border-l border-[var(--color-border)] pl-2">
                        {productMenu.map((entry) => {
                          const cat = getCategory(entry.slug);
                          if (!cat) return null;
                          return (
                            <li key={entry.slug}>
                              <Link
                                href={`/produkty/${cat.slug}`}
                                onClick={() => setOpen(false)}
                                className="block rounded-lg px-4 py-2.5 text-sm text-fg-muted transition-colors hover:bg-[var(--color-surface)] hover:text-[var(--color-fg)]"
                              >
                                {cat.name}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                );
              }
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
            <div className="mt-1 flex items-center gap-2 px-1">
              {socialLinks.map(({ key, href, label, Icon }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] text-fg-muted transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
