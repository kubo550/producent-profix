import { Container } from '@/components/ui/Container';
import { LinkButton } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <section className="relative flex min-h-[60svh] items-center pt-32">
      <Container size="md" className="text-center">
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-[var(--color-accent)]">
          404
        </p>
        <h1 className="mt-4 font-display text-4xl font-medium tracking-[-0.015em] sm:text-5xl">
          Nie znaleziono strony
        </h1>
        <p className="mt-4 text-pretty text-lg text-fg-muted">
          Strona, której szukasz, mogła zostać przeniesiona albo nie istnieje. Wróć na stronę
          główną lub sprawdź katalog produktów.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <LinkButton href="/" variant="primary" size="md">
            Strona główna
          </LinkButton>
          <LinkButton href="/produkty" variant="secondary" size="md">
            Produkty
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
