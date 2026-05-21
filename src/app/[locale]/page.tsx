import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';

import { Hero } from '@/components/sections/Hero';
import { USPStrip } from '@/components/sections/USPStrip';
import { ProductLines } from '@/components/sections/ProductLines';
import { About } from '@/components/sections/About';
import { Categories } from '@/components/sections/Categories';
import { Audiences } from '@/components/sections/Audiences';
import { Realizations } from '@/components/sections/Realizations';
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
    <div className="isolate [&_h1]:text-halo [&_h1+p]:text-halo">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <Image
          src="/photos/about-profix-poster.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <video
          src="/photos/about-profix.mp4"
          poster="/photos/about-profix-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          tabIndex={-1}
          className="relative h-full w-full object-cover motion-reduce:hidden"
        />
        <div className="absolute inset-0 bg-[var(--color-bg)]/45 motion-reduce:bg-[var(--color-bg)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg)]/25 via-transparent to-[var(--color-bg)]/65" />
      </div>

      <Hero />
      <USPStrip />
      <ProductLines />
      <About />
      <Categories />
      <Audiences />
      <Realizations />
      <Logistics />
      <Funds />
      <Distributors />
      <Contact />
    </div>
  );
}
