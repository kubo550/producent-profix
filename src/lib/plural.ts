/**
 * Polish plural form picker.
 * @example pluralPl(1, 'produkt', 'produkty', 'produktów') -> 'produkt'
 * @example pluralPl(3, 'produkt', 'produkty', 'produktów') -> 'produkty'
 * @example pluralPl(5, 'produkt', 'produkty', 'produktów') -> 'produktów'
 * @example pluralPl(22, 'produkt', 'produkty', 'produktów') -> 'produkty'
 */
export function pluralPl(n: number, one: string, few: string, many: string): string {
  if (n === 1) return one;
  const lastDigit = n % 10;
  const lastTwo = n % 100;
  if (lastDigit >= 2 && lastDigit <= 4 && (lastTwo < 10 || lastTwo >= 20)) return few;
  return many;
}
