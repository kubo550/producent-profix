import Image from 'next/image';
import { ArrowUpRight, Package } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import type { Product } from '@/content/products';

/**
 * Catalog product card - used in category listings and related-products grids.
 * Shows the product render, brand, name, tagline, an optional differentiator
 * chip (`highlight`), and packaging/consumption in the footer.
 */
export function ProductCard({ product }: { product: Product }) {
  const p = product;
  return (
    <Link
      href={`/produkty/${p.categorySlug}/${p.slug}`}
      className="card-data group relative flex h-full flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-0.5"
    >
      {p.image && (
        <div className="relative aspect-[4/3] overflow-hidden border-b border-[var(--color-border)]">
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 h-[62%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-accent)] opacity-[0.32] blur-[55px] dark:opacity-[0.16]"
          />
          <Image
            src={p.image}
            alt={p.name}
            fill
            sizes="(min-width: 1024px) 30vw, 100vw"
            className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="relative flex flex-1 flex-col p-6">
        <div className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] text-fg-muted transition-all group-hover:border-[var(--color-accent)] group-hover:bg-[var(--color-accent)] group-hover:text-[var(--color-accent-fg)]">
          <ArrowUpRight size={16} strokeWidth={1.75} />
        </div>
        <div className="space-y-3 pr-12">
          {p.brand && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-accent)]/40 bg-[var(--color-accent-soft)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-accent)]">
              {p.brand}
            </span>
          )}
          <h3 className="font-display text-lg font-semibold leading-tight transition-colors group-hover:text-[var(--color-accent)]">
            {p.name}
          </h3>
          <p className="text-sm leading-relaxed text-fg-muted">{p.tagline}</p>
        </div>
        {p.highlight && (
          <span className="mt-4 inline-flex w-fit items-center rounded-md bg-[var(--color-bg-2)] px-2.5 py-1 text-[11px] font-medium text-fg-muted">
            {p.highlight}
          </span>
        )}
        <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-[var(--color-border)] pt-4 text-xs text-fg-subtle">
          {p.packaging && (
            <span className="inline-flex items-center gap-1.5">
              <Package size={12} strokeWidth={1.75} />
              {p.packaging}
            </span>
          )}
          {p.consumption && <span className="ml-auto truncate">{p.consumption}</span>}
        </div>
      </div>
    </Link>
  );
}
