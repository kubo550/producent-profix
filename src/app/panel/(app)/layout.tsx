import type { ReactNode } from 'react';
import Link from 'next/link';
import { Archive, LogOut } from 'lucide-react';
import { logout } from '@/features/auth/actions';
import { requireSession } from '@/features/auth/session';
import { MapNavLink } from '@/features/silos/ui/MapNavLink';

export default async function PanelAppLayout({ children }: { children: ReactNode }) {
  const session = await requireSession();

  return (
    <>
      <header className="sticky top-0 z-20 flex h-[var(--panel-header-h)] items-center justify-between gap-2 border-b border-[var(--color-border)] bg-[var(--color-bg-2)] px-3 pt-[env(safe-area-inset-top)]">
        <nav aria-label="Panel" className="flex items-center gap-1">
          <MapNavLink />
          <Link href="/panel/silosy/archiwum" className="panel-btn panel-btn--ghost min-h-10 px-3 text-sm">
            <Archive size={18} aria-hidden />
            Archiwum
          </Link>
        </nav>
        <div className="flex min-w-0 items-center gap-1">
          <span className="truncate text-sm text-fg-muted" title="Zalogowany jako">
            {session.name}
          </span>
          <form action={logout}>
            <button type="submit" className="panel-btn panel-btn--ghost min-h-10 px-3" aria-label="Wyloguj">
              <LogOut size={18} aria-hidden />
            </button>
          </form>
        </div>
      </header>
      <main>{children}</main>
    </>
  );
}
