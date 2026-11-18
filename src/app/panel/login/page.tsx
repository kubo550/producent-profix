import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSession } from '@/features/auth/session';
import { LoginForm } from './LoginForm';

export const metadata: Metadata = { title: 'Logowanie' };

export default async function LoginPage() {
  if (await getSession()) redirect('/panel/silosy');

  return (
    <main className="mx-auto flex min-h-dvh max-w-sm flex-col justify-center gap-8 px-4 py-10">
      <div className="space-y-3 text-center">
        <Image
          src="/brand/logo-transparent.png"
          alt="PROFIX"
          width={2400}
          height={1500}
          priority
          className="mx-auto h-16 w-auto"
        />
        <h1 className="text-2xl">Panel pracownika</h1>
        <p className="text-sm text-fg-muted">Lokalizacje silosów</p>
      </div>
      <LoginForm />
      <Link href="/pl" className="text-center text-sm text-fg-muted hover:text-[var(--color-fg)]">
        Wróć na stronę PROFIX
      </Link>
    </main>
  );
}
