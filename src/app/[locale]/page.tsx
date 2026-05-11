import { setRequestLocale } from 'next-intl/server';

import { Hero } from '@/components/sections/Hero';
import { USPStrip } from '@/components/sections/USPStrip';
import { About } from '@/components/sections/About';
import { Categories } from '@/components/sections/Categories';
import { Audiences } from '@/components/sections/Audiences';
import { Logistics } from '@/components/sections/Logistics';
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
    <>
      <Hero />
      <USPStrip />
      <About />
      <Categories />
      <Audiences />
      <Logistics />
      <Funds />
      <Distributors />
      <Contact />
    </>
  );
}
