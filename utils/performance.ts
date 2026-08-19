/* ══════════════════════════════════════════════════════════════════════════════
   WMC — UTILITAIRES PERFORMANCE & HELPERS
   Fonctions pures réutilisables dans tout le projet
   ══════════════════════════════════════════════════════════════════════════════ */


/**
 * Crée un debounce pour une fonction callback.
 * Utile pour les recherches, le resize, le scroll.
 */
export function debounce<T extends (...args: Parameters<T>) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}


/**
 * Extrait les initiales d'un nom (max 2 caractères).
 * @example getInitials("Vybz Kartel") → "VK"
 */
export function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}


/**
 * Hash déterministe d'une chaîne vers un index entier positif.
 * Utilisé pour sélectionner un dégradé d'avatar sans aléatoire.
 */
export function hashStringToIndex(str: string, max: number): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h) % max;
}


/**
 * Tronque un texte à une longueur maximale avec ellipsis.
 * @example truncateText("Hello World", 8) → "Hello..."
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '…';
}


/**
 * Formate un nombre avec des séparateurs de milliers.
 * @example formatNumber(1234567) → "1 234 567"
 */
export function formatNumber(n: number): string {
  return n.toLocaleString('fr-FR');
}


/**
 * Retourne la décennie d'une année.
 * @example getDecade(1997) → "1990s"
 */
export function getDecade(year: number): string {
  return `${Math.floor(year / 10) * 10}s`;
}


/**
 * Combine des noms de classes CSS conditionnellement.
 * @example cn('base', isActive && 'active', undefined, 'extra') → "base active extra"
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
