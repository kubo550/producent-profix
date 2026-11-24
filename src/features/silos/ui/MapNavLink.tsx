'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Map } from 'lucide-react';
import { requestShowAllSilos } from './showAllSilos';

const MAP_PATH = '/panel/silosy';

export function MapNavLink() {
  const pathname = usePathname();
  return (
    <Link
      href={MAP_PATH}
      onClick={(e) => {
        if (pathname !== MAP_PATH) return;
        e.preventDefault();
        requestShowAllSilos();
      }}
      className="panel-btn panel-btn--ghost min-h-10 px-3 text-sm"
    >
      <Map size={18} aria-hidden />
      Mapa
    </Link>
  );
}
