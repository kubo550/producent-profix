'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

/** Fixed full-viewport background behind the homepage hero.
 *
 * The poster image renders server-side with `priority` so the largest paint
 * never waits on JS. The looping video is mounted only after hydration, once we
 * know the viewport, so exactly one encode downloads (lighter on phones) and it
 * never competes with the LCP image during the initial paint. */
export function HeroBackground() {
  const [variant, setVariant] = useState<'mobile' | 'desktop' | null>(null);

  useEffect(() => {
    // Skip the video entirely when the user prefers reduced motion.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const mq = window.matchMedia('(min-width: 768px)');
    const sync = () => setVariant(mq.matches ? 'desktop' : 'mobile');
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const videoSrc =
    variant === 'desktop'
      ? '/photos/about-profix-desktop.mp4'
      : '/photos/about-profix-mobile.mp4';

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <Image
        src="/photos/about-profix-poster.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {variant && (
        <video
          key={variant}
          src={videoSrc}
          poster="/photos/about-profix-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          tabIndex={-1}
          className="relative h-full w-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-[var(--color-bg)]/45 motion-reduce:bg-[var(--color-bg)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg)]/25 via-transparent to-[var(--color-bg)]/65" />
    </div>
  );
}
