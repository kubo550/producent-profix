import { setRequestLocale } from 'next-intl/server';

import { HeroBackground } from '@/components/sections/HeroBackground';
import { Hero } from '@/components/sections/Hero';
import { USPStrip } from '@/components/sections/USPStrip';
import { ProductLines } from '@/components/sections/ProductLines';
import { About } from '@/components/sections/About';
import { Categories } from '@/components/sections/Categories';
import { Audiences } from '@/components/sections/Audiences';
import { Realizations } from '@/components/sections/Realizations';
import { Funds } from '@/components/sections/Funds';
import { Distributors } from '@/components/sections/Distributors';
import { Contact } from '@/components/sections/Contact';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="isolate [&_h1]:text-halo [&_h1+p]:text-halo">
      <HeroBackground />

      <Hero />
      <USPStrip />
      <ProductLines />
      <About />
      <Categories />
      <Audiences />
      <Realizations />
      <Funds />
      <Distributors />
      <Contact />
    </div>
  );
}
