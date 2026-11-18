import type { Metadata } from 'next';
import { requireSession } from '@/features/auth/session';
import { siteConfig } from '@/content/site';
import { getSiloService } from '@/features/silos/container';
import { sortForReview } from '@/features/silos/domain';
import { toSiloDto } from '@/features/silos/dto';
import { SilosBoard } from '@/features/silos/ui/SilosBoard';

export const metadata: Metadata = { title: 'Mapa silosów' };

export default async function SilosPage() {
  await requireSession();
  const now = new Date();
  const silos = sortForReview(await getSiloService().listActive(), now).map((s) => toSiloDto(s, now));

  return <SilosBoard silos={silos} fallbackCenter={{ lat: siteConfig.geo.lat, lng: siteConfig.geo.lng }} />;
}
