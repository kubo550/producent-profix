# Pytania do klienta (PROFIX)

Otwarte pytania, niezgodności w materiałach i decyzje czekające na odpowiedź klienta. Zapisuję na bieżąco — przed launchem trzeba przejść po liście.

Last update: 2026-05-15

> ✅ **Rozstrzygnięte (2026-05-15):** Adres firmy → `ul. Sienkiewicza 20, 32-065 Krzeszowice` (zaktualizowane w siteConfig, stopce, mapie, schema.org, polityce prywatności, hero, sekcji "Hala produkcyjna", metadanych SEO).
>
> ✅ **Rozstrzygnięte (2026-05-15):** Rok założenia → **2009** (nie 2007). Polska firma rodzinna z polskim kapitałem. Wszystkie referencje "2007" w hero/USP/footer/meta/aboutPage podmienione w PL i EN. Nowa linia technologiczna w Krzeszowicach od **2023**. Treść sekcji About + `/o-firmie` przebudowana o R&D, wewnętrzne laboratorium kontroli jakości i partnerskie relacje (dane od klienta).

---

## 🚀 Launch-readiness — szybkie decyzje

Przy każdym punkcie jest **moja propozycja domyślna** — wystarczy potwierdzić lub odrzucić.

### A. Lista dystrybutorów
Sekcja "Znajdź najbliższy punkt sprzedaży" jest na stronie, ale lista dystrybutorów jest pusta — sekcja pokazuje stan "lista w aktualizacji".

→ **Propozycja:** Klient przyśle plik (Excel/PDF) z dystrybutorami (nazwa, miasto, adres, telefon). Dosypię punkty na mapę i listę. Bez tego CTA "Zobacz listę punktów sprzedaży" prowadzi tylko do formularza kontaktowego.

### B. Ochrona formularza przed spamem
Formularz ma honeypot, ale to za mało dla produkcji — boty znajdą adres `biuro@`.

→ **Propozycja:** **Cloudflare Turnstile** (darmowy, niewidzialny dla użytkownika, jak reCAPTCHA ale bez Google). Wymaga ode mnie ~30 min konfiguracji + założenia konta Cloudflare przez klienta (free).

### C. Hosting / deployment
→ **Propozycja:** **Vercel** (twórcy Next.js, darmowy plan starcza dla wizytówki, SSL + CDN out-of-the-box). Alternatywy: Netlify, własny VPS (więcej pracy).

### D. Domena docelowa + SSL
→ **Propozycja:** Zostajemy na `producent-profix.pl`, robię redirect 301 z ewentualnych starych URL. Potrzebny dostęp do DNS (lub kontakt z osobą która zarządza).

### E. Google Analytics 4 + Search Console
Obecnie kod jest gotowy, ale `NEXT_PUBLIC_GA_ID` pusty.

→ **Propozycja:** Klient zakłada GA4 i Search Console (15 min, podaję instrukcję), ja podpinam. Search Console pozwoli śledzić pozycje w Google + zgłosić sitemap.

### F. Strona zarządzania zgodami cookies
RODO wymaga możliwości wycofania zgody w każdej chwili — nie wystarczy pierwszy banner.

→ **Propozycja:** Mała podstrona `/preferencje-cookies` z togglem "analityka on/off" + link w stopce. ~1h pracy.

### G. Dokumenty do pobrania (atesty, DoP, karty PDF)
→ **Propozycja:** Sekcja "Pobierz" w `/dla-fachowca`, każdy plik wrzucamy do `/public/dokumenty/`. Klient przysyła PDF-y w paczce — porządkuję, opisuję, podpinam. Bez tego sekcja "Atesty" w hero to tylko deklaracja.

### H. Optymalizacja zdjęć
Część obrazków na stronie waży ~1 MB (powinno być max 200 KB). Pogarsza Lighthouse Performance i Core Web Vitals.

→ **Propozycja:** Konwersja wszystkich zdjęć do WebP/AVIF + multi-rozmiary. Robione lokalnie, ~1h. Nic od klienta nie potrzebuję poza akceptacją.

### I. Monitoring i powiadomienia o błędach
Po wdrożeniu nie wiemy czy strona się sypie do czasu zgłoszenia przez klienta.

→ **Propozycja:** Free plan **Sentry** (5k błędów/miesiąc) — email do mnie gdy coś pęknie. ~30 min konfiguracji.

### J. OG image (preview na Facebooku / LinkedIn)
Aktualnie strona pokazuje zdjęcie pracownika z `/photos/worker-pro.jpg` jako miniaturkę przy share.

→ **Propozycja:** Albo zostawiamy zdjęcie pracownika, albo robimy dedykowaną grafikę z logo + tagline (lepsze brand recognition). Wymaga decyzji.

### K. Schema.org / Local SEO
Dodałem już `LocalBusiness` schema (firma w Skawinie, godziny pracy, NIP, REGON, telefon) — dzięki temu Google może pokazać firmę w wynikach lokalnych z mapką.

→ **Pytanie do klienta:** Czy jest profil **Google Business Profile** (kiedyś Google Moja Firma)? Jeśli tak — chętnie połączę. Jeśli nie — warto założyć, zwiększy widoczność lokalną.

---

## 🔴 Pilne - blokują launch

### 1. ~~Adres firmy~~ ✅ Rozstrzygnięte → Krzeszowice, ul. Sienkiewicza 20.

### 2. Opakowanie Beton Kontakt - rozbieżność
- **Karta produktu DOCX** (PROFIX BK BETON KONTAKT.docx): `OPAKOWANIA: 25 Kg`
- **Etykieta PDF** (FRONT beton kontakt owal 15kg.pdf): `MASA NETTO 15 KG`

→ **Pytanie:** Czy Beton Kontakt jest sprzedawany w **obu** opakowaniach (15 kg i 25 kg), czy tylko w jednym? Obecnie pokazane jako "15 kg / 25 kg" - do potwierdzenia.

### 3. Hydro Primer vs MaxGrunt
W archive.org strona pokazywała grunt tynkarski koncentrat **"MaxGrunt"** (18 kg, 1:5). W nowych materiałach jest etykieta **"Hydro Primer"** (18 kg + 12 kg, 1:5) o tej samej charakterystyce.

→ **Pytanie:** Czy to ten sam produkt z nowym brandingiem (zmiana nazwy)? Czy może to dwa różne produkty? Jeśli to nowa nazwa - czy "MaxGrunt" mamy całkowicie usunąć ze strony?

---

## 🟡 Produkty - dane do uzupełnienia

### 4. Pełne dane techniczne placeholderów
Na stronie jest 48 produktów ze stronki archiwalnej. **Pełne karty techniczne** mamy dla:
- Wszystkie betony (C16/20, C20/25, C25/30)
- Beton Kontakt
- Wszystkie grunty (na bazie archiwum)
- Część farb wewnętrznych (lateksowa, silikatowo-silikonowa)
- Część klejów (PKT-1, PKT-2)
- Część zapraw klejących ETICS (PK-100, PK-200, PK-201)

**Placeholdery z notatką "Pełna karta techniczna na życzenie"** (potrzebujemy danych):
- Farby fasadowe: lateksowa, silikatowo-silikonowa, silikonowa (3 produkty)
- Farby wewnętrzne: akrylowa, silikonowa (2 produkty)
- Kleje: PKT-3 Elastic Flex
- Szpachle i gładzie: wszystkie 3 (śnieżnobiała, szara, Elastic z włóknem)
- Tynki cienkowarstwowe: wszystkie 5 (akrylowa, silikonowa, silikatowo-silikonowa masa Kornik/Baranek, Trawertyn, Tynk mineralny)
- Tynki cementowo-wapienne: POW-100 Obrzutka, PTC-15 Tynk lekki
- PK-101 Klej do zatapiania siatki
- Wszystkie produkty uzupełniające (folie, taśmy, narożniki, listwy, kołki, siatki - jeśli mają konkretne wymiary/parametry)

→ **Pytanie:** Czy klient może podesłać karty techniczne PDF/DOCX dla powyższych? Bez tego idziemy z generycznymi opisami.

### 5. Klasy techniczne klejów
- PKT-1 Standard - klasa C1? (cementowy do typowych zastosowań)
- PKT-2 Elastic - klasa C2T? C2TE?
- PKT-3 Elastic Flex - klasa C2TE S1? S2?

→ **Pytanie:** Klasy zgodne z PN-EN 12004 dla każdego z trzech klejów PKT.

### 6. Wymiary akcesoriów
- Listwa przyokienna PCV - standardowa długość (2,4 m? 2,5 m?)
- Narożnik murarski/tynkarski - długości (2,5 m / 3 m? aluminium?)
- Siatka elewacyjna - rolka standardowa (1 x 50 m? gramatura 145 g/m²?)
- Kołki do styropianu - długości dostępne (8, 10, 12, 14 cm?)
- Folia ochronna - wymiary (5x4m? 5x5m? 4x10m?)

→ **Pytanie:** Wymiary i specyfikacje sprzedażowe dla każdego z akcesoriów.

### 7. Nazwy serii - czy aktualne?
- POW-100 (obrzutka wstępna) - czy nazwa aktualna?
- PTC-15 (tynk wapienno-cementowy super lekki) - aktualna?
- PK-100, PK-101, PK-200, PK-201 (zaprawy ETICS) - aktualne?
- PKT-1, PKT-2, PKT-3 (kleje do płytek) - aktualne?

→ **Pytanie:** Czy oznaczenia serii się nie zmieniły w nowszych etykietach?

### 7b. Betony - rozbieżność norm między DOCX a kartą techniczną PDF
W materiałach klienta są dwa źródła z różnymi normami dla tych samych produktów:

| Produkt | Karta produktu DOCX (2025-06-14) | Karta techniczna PDF (do druku) |
|---|---|---|
| Beton C16/20 | EN 13813:2002 | brak PDF |
| Beton C20/25 | EN 13813:2002 | **PN-EN 206:2013** |
| Beton C25/30 | EN 13813:2002 + EN 1504-3:2005 | **PN-EN 206:2013** |

→ **Pytanie:** Która norma jest aktualnie deklarowana na opakowaniu? PN-EN 206:2013 (beton) i EN 13813:2002 (jastrychy podłogowe) to różne specyfikacje — produkt może być klasyfikowany według obu w zależności od zastosowania, ale na etykiecie powinna być **jedna** spójna.

Obecnie na stronie używamy **PN-EN 206:2013** dla C20/25 i C25/30 (zgodnie z PDF do druku) oraz **EN 13813:2002** dla C16/20 (brak PDF). Wymaga potwierdzenia + ewentualne ujednolicenie.

Dodatkowo karta techniczna PDF zawiera **bogatszy opis zastosowania** niż karta produktu DOCX:
- DOCX: "podkłady podłogowe wewnątrz obiektów"
- PDF: "prace konstrukcyjne, naprawcze, remontowe - podkłady, posadzki, mury, nadproża, belki, wewnątrz i na zewnątrz"

Strona pokazuje wersję rozszerzoną (z PDF) - do potwierdzenia.

### 8. Atesty PZH i CE
Strona główna pokazuje badge "CE + PZH". Trzeba potwierdzić:

- Które dokładnie produkty mają atest PZH?
- Czy mamy skany atestów do umieszczenia w sekcji "Dla fachowca > Pobierz dokumenty"?
- Czy Deklaracje Właściwości Użytkowych (DoP) są dostępne dla wszystkich produktów wymagających?

---

## 🟢 Strategia / treści ogólne

### 9. Tłumaczenie EN
Struktura `[locale]` w Next.js już jest gotowa, brakuje tylko `en.json`.
- Czy klient ma klientów zagranicznych?
- Jeśli tak - kto tłumaczy treści?

### 10. Google Analytics + RODO
- Czy klient ma już konto GA4? Jeśli nie - czy zakładamy nowe na profix.pl?
- Cookie banner: kto pisze treść polityki cookies (kategorie, lista cookies)?
- Polityka prywatności: prawnik klienta czy gotowy szablon?

### 11. Email kontaktowy z formularza
Formularz idzie aktualnie przez Web3Forms. Gdzie ma trafiać:
- `biuro@producent-profix.pl` (z `siteConfig.email`)?
- Inny adres? CRM (HubSpot/Pipedrive)?
- Slack/Discord notyfikacje?

### 12. Realizacje - więcej cases
Mamy 2 realizacje pokazane na home (pokój pod klucz + hala przemysłowa).
- Czy klient ma więcej projektów do pokazania?
- Czy może podać kontekst tych 2 obecnych: lokalizacja, klient, rok wykonania, metraż?

### 13. Strefa "Pobierz dokumenty"
Czy klient chce sekcję z PDF do pobrania (karty techniczne, atesty, DoP)?
- Jeśli tak - osobna strona czy każdy produkt ma swój panel "Pobierz"?

### 14. Sklep online
Czy strona ma pozostać wizytówką, czy w przyszłości dorzucamy e-commerce?
- Jeśli sklep - jaki silnik (Shopify, WooCommerce, headless)?

### 15. Domena docelowa
- Zostajemy na `producent-profix.pl` czy nowa (np. `profix.pl`)?
- Kto trzyma DNS?
- Czy chcemy zachować przekierowania ze starych URL (z archive.org)?

---

## 🔵 Branding

### 16. Logo finalne
W repo jest `logo-v2.png` (kolorowe, z parrotem i cursive tagline) - pokazałeś że w stopce wygląda "krzywe".
W materiałach klienta są dwie czyste wersje:
- `profixBlack` - białe PROFIX + biały parrot na czarnym tle
- `profixWhite` - czarne PROFIX + czarny parrot na białym tle (z czerwonym cursive tagline)

→ **Pytanie:** Którą wersję traktujemy jako master? Czy mamy SVG/AI z oryginalnym logiem (vector)? Obecne PNG-i mają ograniczoną jakość przy skalowaniu.

### 17. Paleta kolorów
Strona używa pomarańczowego akcentu `#c2581f` (oatmeal industrial). Czy klient ma brand book?
- Czy pomarańcz jest OK, czy chce mocniejszy czerwony (jak w cursive "Kolory dla Twojego domu")?
- Czerwony z tagline'u to ok. `#e63946` - czy używamy go jako akcent zamiast pomarańczowego?

### 18. Typografia
Obecnie: Open Sans + display font. Czy klient ma preferowane fonty?

---

## 📦 Co strona już zawiera

Krótkie podsumowanie zakresu prac dla Pańskiej orientacji — wszystko poniżej jest **już zaimplementowane i działa**:

### Treść i struktura
- **10 podstron**: Strona główna, O firmie, Produkty (lista kategorii), Karty kategorii (15 szt.), **Karty produktowe (97 szt.)**, Dla fachowca, Dla inwestora, Fundusze europejskie, Przetargi, Kontakt, Polityka prywatności
- **Mega-menu z hierarchią produktów** — szybki dostęp do każdej kategorii z każdej podstrony
- **Sekcje na home**: hero ze zdjęciem, USP strip, O firmie, Kategorie produktów (z wyróżnieniami), Strefy docelowe (fachowiec/inwestor), Realizacje, Logistyka, Fundusze UE, Dystrybutorzy, Kontakt z formularzem i mapą Google

### Design i UX
- **Pełna responsywność** — desktop, tablet, mobile (od 360 px wzwyż)
- **Tryb jasny i ciemny** (auto-detekcja + przełącznik w nawigacji)
- **Animacje** — subtelne reveal-on-scroll, parallax w hero, animowany mega-menu, pulsujący pin na mapie
- **Floating CTA** na mobile (zawsze widoczny przycisk "Zadzwoń")
- **Dostępność (a11y)**: skip-link do treści, focus rings, kontrast WCAG AA, atrybuty ARIA na menu i formularzach

### Wielojęzyczność
- **PL + EN** w pełni przetłumaczone (przełącznik flag w nawigacji)
- Osobne adresy URL dla każdej wersji (`/pl/...`, `/en/...`) — dobre dla SEO międzynarodowego
- Automatyczne tagi `hreflang` w sitemapie

### SEO
- **Metadane per podstrona** (title, description, Open Graph, Twitter Card)
- **Sitemap.xml** z 130+ adresami (wszystkie produkty, kategorie, podstrony, w obu językach)
- **Robots.txt**
- **Schema.org / JSON-LD**: `LocalBusiness` + `Manufacturer` na home (z NIP, REGON, godzinami pracy, geolokalizacją), `Product` na każdej karcie produktu, `BreadcrumbList` dla nawigacji okruszkowej — to daje szansę na rich snippets w Google
- **OG image** dla podglądu przy udostępnieniu na Facebooku / LinkedIn / WhatsAppie
- Statyczne renderowanie wszystkich podstron (SSG) — błyskawiczne ładowanie, idealne dla SEO

### Formularz kontaktowy
- 4 typy zapytań (oferta, doradztwo techniczne, dystrybucja, inne)
- Walidacja pól, honeypot anty-bot, link do polityki prywatności w klauzuli RODO
- Wysyłka przez Web3Forms na `biuro@producent-profix.pl`
- Komunikaty sukcesu / błędu, przycisk "Pilne? Zadzwoń" w success state

### Wydajność i jakość kodu
- **Next.js 16** + React 19 (najnowsze wersje, wsparcie do 2027+)
- **Statyczna generacja** wszystkich podstron — strona ładuje się natychmiast, hosting kosztuje grosze
- **Optymalizacja obrazków** przez `next/image` (lazy loading, responsywne rozmiary, formaty WebP/AVIF)
- **Code splitting** — przeglądarka pobiera tylko kod potrzebny na danej podstronie
- **Type-safety** (TypeScript) — błędy wyłapywane na etapie buildu, nie w produkcji
- **Lint i type-check** przechodzą bez błędów

### Bezpieczeństwo
- **Nagłówki bezpieczeństwa** (HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy, X-Content-Type-Options) — chronią przed clickjackingiem, sniffingiem MIME, wyciekiem referrera
- **Brak ujawniania technologii** w nagłówku `x-powered-by`
- **Honeypot** w formularzu (filtruje proste boty)
- **Cookie banner zgodny z RODO** — fundament pod GA4 Consent Mode

### Compliance
- Polityka prywatności jako osobna podstrona
- Klauzula RODO przy formularzu z linkiem do polityki
- Cookie banner z opcjami "Akceptuję" / "Odrzuć"
- Dane firmy (legalName, NIP, REGON) w stopce i strukturze danych

---

## ⏭ Co zostaje do zrobienia (sygnalnie, bez decyzji klienta)

Drobne usprawnienia produkcyjne, które mogę zrobić **bez wstrzymywania launchu** — w trybie iteracyjnym po wdrożeniu:

- Optymalizacja zdjęć (WebP/AVIF, redukcja ciężkich plików ~1 MB → ~150 KB)
- Strona `/preferencje-cookies` (zarządzanie zgodami)
- Captcha (Turnstile) na formularzu
- Sentry monitoring
- Drobne karty techniczne uzupełnione gdy klient prześle materiały

