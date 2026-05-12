import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Link } from '@/i18n/navigation';
import { siteConfig } from '@/content/site';

export async function Footer() {
  const t = await getTranslations('footer');
  const year = new Date().getFullYear();

  const company = [
    { href: '/o-firmie' as const, key: 'about' },
    { href: '/fundusze-europejskie' as const, key: 'funds' },
    { href: '/przetargi' as const, key: 'tenders' },
    { href: '/polityka-prywatnosci' as const, key: 'privacy' },
  ];

  const products = [
    { href: '/produkty' as const, key: 'products' },
    { href: '/dla-fachowca' as const, key: 'professional' },
    { href: '/dla-inwestora' as const, key: 'investor' },
  ];

  return (
    <footer className="relative mt-16 border-t border-[var(--color-border)] bg-[var(--color-bg-2)] py-16">
      <Container size="xl">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="space-y-5">
            <Link href="/" aria-label={siteConfig.name} className="inline-block">
              <Image
                src="/brand/logo-transparent.png"
                alt={siteConfig.name}
                width={2400}
                height={1500}
                className="h-20 w-auto dark:brightness-0 dark:invert sm:h-24"
              />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-fg-muted">{t('tagline')}</p>
            <div className="space-y-2 text-sm text-fg-muted">
              <p className="flex items-start gap-2.5">
                <MapPin
                  size={14}
                  strokeWidth={1.75}
                  className="mt-0.5 flex-none text-[var(--color-accent)]"
                />
                <span>
                  {siteConfig.address.street}, {siteConfig.address.postal} {siteConfig.address.city}
                </span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone
                  size={14}
                  strokeWidth={1.75}
                  className="flex-none text-[var(--color-accent)]"
                />
                <a href={`tel:${siteConfig.phone}`} className="hover:text-[var(--color-fg)]">
                  {siteConfig.phoneDisplay}
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail
                  size={14}
                  strokeWidth={1.75}
                  className="flex-none text-[var(--color-accent)]"
                />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="break-all hover:text-[var(--color-fg)]"
                >
                  {siteConfig.email}
                </a>
              </p>
            </div>
          </div>

          <FooterCol title={t('sections.company')}>
            {company.map((l) => (
              <FooterLink key={l.key} href={l.href}>
                {t(`links.${l.key}`)}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title={t('sections.products')}>
            {products.map((l) => (
              <FooterLink key={l.key} href={l.href}>
                {t(`links.${l.key}`)}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title={t('sections.contact')}>
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-[var(--color-fg)]"
            >
              <FacebookIcon />
              Facebook
            </a>
            <Link
              href="/kontakt"
              className="text-sm text-fg-muted transition-colors hover:text-[var(--color-fg)]"
            >
              {t('links.about')}
            </Link>
          </FooterCol>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-[var(--color-border)] pt-8 text-xs text-fg-subtle sm:flex-row sm:items-center">
          <p>
            &copy; {year} {siteConfig.legalName}. {t('rights')}
          </p>
          <p className="font-mono">
            Made by{' '}
            <a
              href="https://jakubkurdziel.pl/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-fg-muted transition-colors hover:text-[var(--color-accent)]"
            >
              jk.dev
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}

function FacebookIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">{title}</p>
      <ul className="space-y-2.5">
        {Array.isArray(children) ? (
          children.map((c, i) => <li key={i}>{c}</li>)
        ) : (
          <li>{children}</li>
        )}
      </ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href:
    | '/o-firmie'
    | '/produkty'
    | '/dla-fachowca'
    | '/dla-inwestora'
    | '/fundusze-europejskie'
    | '/przetargi'
    | '/kontakt'
    | '/polityka-prywatnosci';
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-sm text-fg-muted transition-colors hover:text-[var(--color-fg)]"
    >
      {children}
    </Link>
  );
}
