export type PrivacySection =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'ordered'; items: Array<string | { lead: string; sub: string[] }> };

export const privacyContent: PrivacySection[] = [
  {
    type: 'paragraph',
    text: 'Polityka Prywatności w F.P.H.U PROFIX Katarzyna Sokół. Informacja dla klientów i odbiorców dotycząca przetwarzania danych osobowych.',
  },
  {
    type: 'paragraph',
    text: 'Mając na uwadze zmiany w prawie ochrony danych osobowych związane z wejściem w życie Rozporządzenia Parlamentu Europejskiego i Rady (EU) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony danych osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (ogólne rozporządzenie o ochronie danych), Dz.U. UE. L. z 2016 r. Nr 119 str. 1, dalej zwane „RODO”, realizując przysługujące Państwu na podstawie Art. 13 RODO prawo do informacji, przekazujemy Państwu treść klauzuli informacyjnej administratora danych osobowych.',
  },
  {
    type: 'paragraph',
    text: 'F.P.H.U PROFIX Katarzyna Sokół w ramach wzajemnych relacji biznesowych przetwarza przekazane przez Państwa dane osobowe, które mogą dotyczyć Państwa reprezentantów, właścicieli lub pracowników.',
  },
  { type: 'heading', text: 'Klauzula informacyjna administratora danych osobowych' },
  {
    type: 'ordered',
    items: [
      'Administratorem Danych Osobowych jest: Katarzyna Sokół prowadząca działalność gospodarczą pod nazwą F.P.H.U PROFIX Katarzyna Sokół z siedzibą w Krzeszowicach, ul. Sienkiewicza 20, 32-065 Krzeszowice, zarejestrowaną w Centralnej Ewidencji i Informacji o Działalności Gospodarczej, REGON 120926888, NIP 944-182-25-17, zwana dalej „F.P.H.U PROFIX”.',
      {
        lead: 'Podstawą prawną przetwarzania Państwa danych osobowych przez F.P.H.U PROFIX może być:',
        sub: [
          'wyrażona przez Państwa dobrowolnie zgoda na ich przetwarzanie (art. 6 ust. 1 lit. a RODO),',
          'konieczność przetwarzania ich dla potrzeb realizacji zawartej przez nas umowy lub podjęcia działań przed jej zawarciem (art. 6 ust. 1 lit. b RODO),',
          'wymogi ustawowe, wynikające z wiążących nas przepisów prawa (art. 6 ust. 1 lit. c RODO),',
          'konieczność ochrony naszych prawnie uzasadnionych interesów (art. 6 ust. 1 lit. d RODO),',
          'udzielone nam zgody marketingowe.',
        ],
      },
      {
        lead: 'Dane osobowe przetwarzane będą w celu m.in.:',
        sub: [
          'zawierania i realizacji łączących nas umów oraz świadczeń dla Państwa oferowanych przez nas usług, wysyłki zamówionych towarów, realizacji płatności, obsługi reklamacji, usług świadczonych drogą elektroniczną itp.,',
          'realizacji obowiązków F.P.H.U PROFIX przewidzianych prawem, w tym w szczególności wystawiania i przechowywania faktur, realizacji płatności, przechowywania faktur oraz dokumentów księgowych, w tym także dla celów archiwizacyjnych,',
          'ochrony praw F.P.H.U PROFIX zgodnie z przepisami prawa, w tym w szczególności dochodzenia zaległych płatności w ramach procesów windykacyjnych i procesów sądowych,',
          'prowadzenia działań marketingowych oraz przesyłania informacji handlowych,',
          'prowadzenia marketingu podmiotów współpracujących z F.P.H.U PROFIX (za uprzednią zgodą),',
          'uzasadnionego interesu F.P.H.U PROFIX w rozumieniu przepisów o ochronie danych osobowych.',
        ],
      },
      'Odbiorcami danych osobowych będą wyłącznie podmioty uprawnione do uzyskania danych osobowych na podstawie przepisów prawa.',
      {
        lead: 'F.P.H.U PROFIX może przekazywać dane osobowe następującym osobom trzecim dla celów wskazanych w niniejszym dokumencie:',
        sub: [
          'podmiotom, z którymi F.P.H.U PROFIX ma zawartą umowę współpracy, na podstawie umowy powierzenia przetwarzania danych osobowych, w celu realizacji łączącej nas umowy, realizacji obowiązków F.P.H.U PROFIX przewidzianych prawem, ochrony praw F.P.H.U PROFIX zgodnie z przepisami prawa o realizacji uzasadnionego interesu F.P.H.U PROFIX w rozumieniu przepisów o ochronie danych osobowych. W szczególności F.P.H.U PROFIX może przekazywać Państwa dane osobowe podmiotom takim jak: banki, firmy windykacyjne, podmioty świadczące usługi pocztowe i kurierskie, firmy, z którymi współpracujemy w celu świadczenia usług marketingowych. Podmioty takie będą zobowiązane na mocy zawartych z F.P.H.U PROFIX umów do stosowania odpowiednich środków bezpieczeństwa, technicznych i organizacyjnych, aby chronić dane osobowe oraz przetwarzać je wyłącznie zgodnie z instrukcjami przekazanymi przez F.P.H.U PROFIX,',
          'organom nadzorującym, organom władzy i innym osobom trzecim; w przypadku gdy jest to niezbędne dla realizacji celów wskazanych powyżej oraz wypełnienia obowiązków nałożonych prawem. Dane osobowe mogą być przekazywane organom nadzorującym, sądom i innym organom władzy (np. organom podatkowym i organom ścigania), niezależnym doradcom zewnętrznym (np. audytorom) lub podmiotom udzielającym świadczeń.',
        ],
      },
      'Dane osobowe przechowywane będą do momentu zakończenia czynności określonych w punkcie 3.',
      'F.P.H.U PROFIX nie przekazuje danych osobowych poza teren Unii Europejskiej.',
      'Przy przetwarzaniu danych osobowych F.P.H.U PROFIX nie korzysta z profilowania, jak również z innego sposobu zautomatyzowanego przetwarzania danych.',
      'Posiadają Państwo prawo do żądania od F.P.H.U PROFIX dostępu do danych osobowych, prawo do ich sprostowania, usunięcia lub ograniczenia przetwarzania, prawo do cofnięcia zgody na przetwarzanie danych oraz prawo do przenoszenia danych.',
      'Mają Państwo prawo wniesienia skargi do organu nadzorczego, jeśli stwierdzą Państwo, że przetwarzamy dane niezgodnie z RODO.',
      'Podanie danych osobowych jest dobrowolne.',
      'F.P.H.U PROFIX zobowiązuje się stosować odpowiednie środki bezpieczeństwa, zarówno techniczne jak i organizacyjne, aby chronić Państwa dane osobowe. Dane osobowe będą przechowywane przez F.P.H.U PROFIX i/lub podmioty przetwarzające dane, wyłącznie przez czas niezbędny do osiągnięcia celów, dla których dane te są gromadzone, wykonania obowiązków wynikających z przepisów prawa, maksymalnie przez okres zabezpieczenia materiałów niezbędnych dla postępowań prawnych (w tym podatkowych) oraz do czasu ewentualnego przedawnienia roszczeń Państwa i F.P.H.U PROFIX.',
      'System informatyczny, w którym są przetwarzane dane osobowe, spełnia wymogi z Rozporządzenia Ministra Spraw Wewnętrznych i Administracji z dnia 29 kwietnia 2004 r. w sprawie dokumentacji przetwarzania danych osobowych oraz warunków technicznych i organizacyjnych, jakim powinny odpowiadać urządzenia i systemy informatyczne służące do przetwarzania danych osobowych (Dz. U. Nr 100, poz. 1024).',
    ],
  },
  { type: 'heading', text: 'Kontakt w sprawie ochrony oraz przetwarzania danych osobowych' },
  {
    type: 'list',
    items: [
      'listownie, na adres: F.P.H.U PROFIX, ul. Sienkiewicza 20, 32-065 Krzeszowice',
      'mailowo, na adres: sokolp1@interia.pl',
    ],
  },
];
