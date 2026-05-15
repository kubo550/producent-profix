import type { MetadataRoute } from 'next';
import { siteConfig } from '@/content/site';
import { categories } from '@/content/categories';
import { products } from '@/content/products';
import { routing } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();
  const defaultLocale = routing.defaultLocale;

  const staticPaths = [
    { path: '', priority: 1.0, changeFreq: 'weekly' as const },
    { path: '/o-firmie', priority: 0.8, changeFreq: 'monthly' as const },
    { path: '/produkty', priority: 0.9, changeFreq: 'weekly' as const },
    { path: '/dla-fachowca', priority: 0.8, changeFreq: 'monthly' as const },
    { path: '/dla-inwestora', priority: 0.8, changeFreq: 'monthly' as const },
    { path: '/fundusze-europejskie', priority: 0.5, changeFreq: 'yearly' as const },
    { path: '/przetargi', priority: 0.5, changeFreq: 'monthly' as const },
    { path: '/kontakt', priority: 0.7, changeFreq: 'monthly' as const },
    { path: '/polityka-prywatnosci', priority: 0.3, changeFreq: 'yearly' as const },
  ];

  const categoryPaths = categories.map((c) => ({
    path: `/produkty/${c.slug}`,
    priority: 0.7,
    changeFreq: 'monthly' as const,
  }));

  const productPaths = products.map((p) => ({
    path: `/produkty/${p.categorySlug}/${p.slug}`,
    priority: 0.6,
    changeFreq: 'monthly' as const,
  }));

  return [...staticPaths, ...categoryPaths, ...productPaths].map(({ path, priority, changeFreq }) => ({
    url: `${base}/${defaultLocale}${path}`,
    lastModified: now,
    changeFrequency: changeFreq,
    priority,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, `${base}/${locale}${path}`])
      ),
    },
  }));
}
