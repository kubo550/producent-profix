# PROFIX - producent materiałów wykończeniowo-budowlanych

Strona internetowa firmy PROFIX. Stack: **Next.js 16 + React 19 + Tailwind 4 + next-intl**.

## Dev

```bash
npm install
npm run dev      # http://localhost:4321
npm run build
npm run lint
npm run type-check
npm test         # testy jednostkowe (Vitest)
npm run db:migrate  # migracje bazy (panel pracownika)
```

## Struktura

- `src/app/[locale]/` - strony (PL only na razie)
- `src/components/sections/` - sekcje (Hero, Categories, About, Logistics, Realizations, Contact, ...)
- `src/components/ui/` - reużywalne komponenty (Container, Reveal, Button, ...)
- `src/content/` - kontent statyczny (categories, products, distributors, site config)
- `src/messages/pl.json` - tłumaczenia
- `public/photos/` - zdjęcia (truck, worker, realizacje, produkty)
- `public/brand/` - logo (transparent + na ciemne/jasne tło)
- `tmp/www/` - materiały od klienta (poza gitem)
- `questions.md` - otwarte pytania do klienta (rozbieżności, do uzupełnienia)
- `src/app/panel/`, `src/features/` - panel pracownika (mapa silosów), opis niżej

## Panel pracownika: silosy

Wewnętrzne narzędzie pod `/panel` (link „Panel pracownika” w stopce, `noindex`, tylko PL, poza next-intl).
Pracownik loguje się wspólnym hasłem i swoim imieniem, a potem dodaje pinezki z lokalizacją silosów
(GPS z telefonu, adres przez OpenStreetMap Nominatim albo przytrzymanie palca na mapie).

- Pinezka: nazwa (wymagana), komentarz, kto i kiedy dodał.
- „Nadal stoi” potwierdza pozycję. Po 45 dniach bez potwierdzenia pinezka dostaje flagę „do weryfikacji”.
- „Odebrany” przenosi pinezkę do archiwum (`/panel/silosy/archiwum`), skąd można ją przywrócić.
- Niewysłana pinezka (brak zasięgu) zostaje w pamięci telefonu do czasu wysłania.
- Mapa: Leaflet + OpenStreetMap, podkład satelitarny Esri. Wszystko za darmo, bez kluczy API.

Architektura (`src/features/silos`): `domain.ts` (reguły, czyste funkcje) → `service.ts` (przypadki użycia)
→ `repository.ts` (interfejs) ← `pgRepository.ts` (Postgres). `container.ts` składa zależności,
`actions.ts` to server actions (sesja + walidacja Zod), `ui/` to komponenty klienckie.
Autoryzacja w `src/features/auth`: sesja JWT w ciasteczku `httpOnly` (90 dni, przedłużana),
klucz wyprowadzony z `SESSION_SECRET` i `PANEL_PASSWORD`, więc zmiana hasła wylogowuje wszystkich.
Limit: 10 nieudanych logowań na 15 minut z jednego IP.

### Wdrożenie (jednorazowo)

1. Vercel → projekt → Storage → Create → **Neon** (darmowy plan), region **Frankfurt (`aws-eu-central-1`)**. Ustawi `DATABASE_URL`.
   Vercel → Settings → Functions → Function Region: **Frankfurt (`fra1`)**. Funkcja i baza muszą stać w tym samym regionie:
   domyślny `iad1` (USA) dokłada ok. 100 ms do każdego zapytania, a zapis to 1–2 zapytania.
   (`preferredRegion` w kodzie nie zadziała: Vercel honoruje go tylko dla runtime `edge`, a panel potrzebuje Node.)
2. Vercel → Settings → Environment Variables: `PANEL_PASSWORD` i `SESSION_SECRET` (`openssl rand -base64 32`).
3. Lokalnie: `vercel env pull .env.local`, potem `npm run db:migrate`.
4. Redeploy. Pracownikom wysłać link `https://www.producent-profix.pl/panel` i hasło.
   Na telefonie: „Dodaj do ekranu głównego”, żeby mieć ikonę „Silosy”.

Zmiana hasła (np. gdy ktoś odchodzi): podmień `PANEL_PASSWORD` na Vercelu i zrób redeploy.
Hasło musi mieć min. 12 znaków: limit prób działa per IP, więc siła hasła to główna ochrona.

### Znane luki

- **Kafelki satelitarne Esri** (`server.arcgisonline.com`) przy użyciu komercyjnym formalnie wymagają darmowego konta ArcGIS z kluczem. Do decyzji: założyć konto albo usunąć warstwę „Satelita”.
- **RODO:** nazwy i komentarze pinezek mogą zawierać nazwiska i adresy budów klientów. Archiwum nie ma okresu retencji; trzeba ustalić z klientem, jak długo trzymać dane.
- **Uśpienie bazy:** darmowy Neon usypia bazę po 5 min bezczynności; pierwsze otwarcie panelu po przerwie trwa ok. 0,5–1 s dłużej. Na darmowym planie nie da się tego wyłączyć.
- **Wspólne hasło:** „dodał: Janek” to deklaracja, nie tożsamość. Do prawdziwego rozliczania potrzebne byłyby indywidualne konta.

## Klient - linki

- Strona produkcyjna (stara): https://producent-profix.pl/ (i wersja archiwalna https://web.archive.org/web/2026*/https://producent-profix.pl/)
- Facebook: https://www.facebook.com/producentprofix/
- Adres: ul. Sienkiewicza 20, 32-065 Krzeszowice

## Inspiracje od klienta

Klient wskazał dwie strony jako referencje wizualne/strukturalne:

### 1. https://psychologtesty.com.pl/
Profesjonalna strona usługowa (gabinet psychologiczny):
- Sticky header + floating CTA
- One-page scroll z anchorami do sekcji
- Sekcje: Hero → Usługi → Proces (4 kroki) → Dla kogo → Galeria gabinetu → FAQ accordion → Opinie/Google reviews → Kontakt
- Trust-building: "nowoczesna aparatura", konkretne nazwy sprzętu, czas trwania badania (20-30 min)
- Wielokrotny prominentny CTA z numerem telefonu
- Zdjęcia placówki - humanizują "kliniczne" usługi

### 2. https://uav-missions.co.uk/
Strona usługowa drone inspections:
- Hero z tagline + bezpośredni CTA
- Karty usług z minimalnym tekstem
- Sekcja "team" - zdjęcia ludzi + bio (uwiarygadnia)
- Footer z badge'em licencji CAA (regulatory credibility)
- Headings benefit-focused, nie feature-focused
- "Precision. Creativity. Trust in the Sky" - 3-słowowe value proposition

## Porównanie wizualne PROFIX vs referencje

| Aspekt | PROFIX (obecnie) | psychologtesty | uav-missions |
|---|---|---|---|
| **Tło główne** | kremowe `#f5f1ea` (oatmeal industrial) | białe + jasnoszare alternacje | białe + jasnoszare alternacje |
| **Akcent** | pomarańcz `#c2581f` (warm) | turkus / cyan (cool, clinical) | cyan / navy (cool, corporate) |
| **Typografia** | display font + Open Sans | system sans, bold headers | geometryczny sans (Inter-like) |
| **Whitespace sekcji** | py-24/py-32 (96-128px) | 80-120px | 60-80px |
| **Card corners** | rounded-2xl / 3xl (16-24px) | 8-12px | 4-8px (płaski/flat) |
| **Cienie kart** | dramatyczne `0 24px 60px` | subtelne `0 2px 8px` | minimalne / żadne |
| **Tło dekoracyjne** | animowane blob gradienty + grain | brak | brak |
| **Imagery** | photos + dark gradient overlay | natural photo, bez filtrów | natural photo, bez filtrów |
| **Buttons** | duże pill (rounded-full) | rounded-rect 4-8px | rounded-rect 4-8px |
| **Section dividers** | bez linii, tylko padding | tło zmienia kolor (białe ↔ szare) | tło zmienia kolor + padding |

## Co warto zaadaptować wizualnie

PROFIX ma własną mocną tożsamość (warm/orange/atmospheric) - referencje są chłodniejsze i bardziej "clinical/corporate". Nie chcemy całej przepisać, ale parę rzeczy podkręci "profesjonalizm" naszego layoutu.

### 🔥 Najbardziej widoczne usprawnienia

1. **Alternacja tła sekcji** (oba reference'y)
   - Obecnie wszystkie sekcje mają to samo kremowe tło i tylko padding je rozdziela
   - Dodać subtelną alternację: parzyste sekcje `var(--color-bg)` (#f5f1ea), nieparzyste `var(--color-bg-2)` (#efe9de) - mamy już to w paletcie, nie używamy
   - Efekt: jaśniejszy rytm strony, każda sekcja "oddycha" osobno
   - Pliki: `globals.css` + dodać klasę `.section-alt` lub `bg-bg-2`

2. **Spokojniejsze cienie i bardziej "płaskie" karty** (oba)
   - Obecne `shadow-[0_20px_60px_-20px_rgba(232,132,58,0.35)]` na hover - bardzo ekspresyjne, miłe na home, ale w `/produkty` i `/kontakt` wygląda "kreatywnie" zamiast "korporacyjnie"
   - Propozycja: dwa warianty `Card` - "showcase" (obecny, dla hero i highlight) i "data" (subtle shadow `0 4px 12px rgba(0,0,0,0.04)`, rounded-xl/12px, dla list produktów i FAQ)
   - To samo z `rounded-3xl` → rozważyć rounded-xl (12px) na bardziej "biznesowych" sekcjach

3. **Wyłączyć blob halo na podstronach** (różnica vs uav-missions)
   - Dekoracyjne pomarańczowe halo wygląda świetnie na home/hero, ale na `/produkty/[slug]/[product]` rozprasza - oba reference'y trzymają strony szczegółowe na czystym tle
   - W produktowych podstronach mamy już `<div aria-hidden ... pointer-events-none ... blur-[120px] />` - można zostawić tylko na hero, wycofać z body sections
   - Globalny `body::before` (atmospheric gradient) - rozważyć `mask` żeby był widoczny tylko w hero area, a niżej zanikał

4. **Sticky floating CTA** (psychologtesty)
   - Już mamy `MobileCTA.tsx` (klient mobile) - sprawdzić czy jest aktywny i wpięty
   - Dodać desktop wersję jako dolny prawy róg "💬 Zapytaj o ofertę" - delikatny float button (rounded-full, accent color)

5. **Ujednolicić button system** (oba reference'y mają jeden styl)
   - Obecnie mamy `LinkButton` (pill) + ad-hoc inline buttony w hero/cta sections
   - Audit `Button.tsx` żeby był spójny: jeden kształt (pill ok, brand-mark), jedna palette wariantów (primary/secondary/ghost), spójne size'y (sm/md/lg)

### 🟡 Subtelne tunings

6. **Mniejsze rounded na elementach "danych"** (oba)
   - Tabele specs, FAQ accordion, kontakt form fields - `rounded-xl` (12px) zamiast `rounded-2xl` (16px)
   - Daje bardziej "industrial precision" feel - pasuje do producenta budowlanego

7. **Imagery bez overlay na produktach** (oba reference'y - natural)
   - Już zrobione na product detail (worki betonu na białym tle, object-contain p-6) ✓
   - Audyt sekcji Logistics, Realizations - czy nie pakujemy za dużo gradient overlay na zdjęcia
   - Reveal: czy "Flota PROFIX" badge nad zdjęciem ciężarówki potrzebuje dark gradient z dołu? Może bez overlay z chip-em w corner zamiast in-image label

8. **Numbered list w procesie** (psychologtesty styl 01-02-03)
   - Mamy już na Categories `{String(i+1).padStart(2,'0')}` - powielić w Audiences i ewentualnym przyszłym "Jak współpracujemy"

9. **Section heading - dodać mały podkład** (psychologtesty)
   - `SectionHeading` ma już eyebrow + line + title - można dodać optional `kicker` (mała grafika/numer) z lewej dla heavy sections jak Hero/About

10. **Tighter mobile padding** (oba)
    - Obecnie mobile padding kontenera jest dość generous - zweryfikować że na <640px nie traci 30%+ szerokości na padding

### 🔵 Stylistyczne mikrousprawnienia

11. **Reduce text shadow / no-blur on text** - czystsze, lekkie text-rendering
12. **Hover na ikonach w cards** - zamiast scale-105 całego kafelka, sometimes tylko ikon scale + change color (jak na uav-missions)
13. **Footer accent line** - cienki pomarańczowy `border-t` na całej szerokości stopki (1px) jako visual close
14. **Single accent color discipline** - obecnie mamy `accent` + `accent-hover` + `accent-soft` + osobne `#7c4e2d` w heroComposition. Konsolidacja palety pod jednolity ladder

### ❌ Świadomie zachowujemy nasze rozwiązania

- **Warm oatmeal background** zamiast clean white - oba reference'y są chłodne, ale dla brandu "kolory dla Twojego domu" (czyli warm/home/budowlanka) cieple tło lepiej współgra
- **Atmospheric blob gradients na home** - delikatne i charakterystyczne, nie warto wycinać
- **Pill buttons** - bardziej memorable niż rectangular, brand-coherent
- **Display typography z balansem** - heavier headlines niż reference'y, ale właściwe dla "producenta" (gravitas)

### Plan implementacji (1-2 dni)

Priorytetowo do machnięcia w jednym przebiegu:
1. Dodać `.section-alt` wariant tła + zastosować naprzemiennie w `page.tsx` (home, products)
2. Stworzyć drugi wariant `Card` ("data" - mniejszy shadow, rounded-xl)
3. Wyłączyć `body::before` atmospheric na podstronach z `data-page-type="detail"` (albo gradient mask)
4. Audyt button stylów (sprawdzić wszystkie miejsca z inline buttonem)
5. MobileCTA / floating desktop CTA

## Zadania zapisane w plikach

- `questions.md` - 18 otwartych pytań do klienta (pilne + plan rozwoju)

## Stack uwagi

- Next.js 16 + React 19 - **breaking changes względem 14/15**. Zawsze sprawdzaj `node_modules/next/dist/docs/` przed nowymi feature'ami (patrz `AGENTS.md`).
- Tailwind 4 - używamy `@theme` z CSS variables, nie `tailwind.config.js`
- `next-intl` - struktura `[locale]` gotowa pod EN, brak tłumaczeń (questions.md #9)
- Dark mode - **wycofany**, tylko light theme
- Dev server - port `4321`
