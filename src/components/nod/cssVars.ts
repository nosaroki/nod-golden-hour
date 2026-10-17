import type { CSSProperties } from 'react';

/**
 * Seules les valeurs qui ne peuvent pas exister dans la feuille de style
 * passent par le JSX : une URL d'image, un ratio, une hauteur variable.
 * Elles sont injectees comme variables CSS, jamais comme regles de style.
 */
export function vars(values: Record<string, string | number | undefined>): CSSProperties {
  const style: Record<string, string> = {};
  for (const [key, value] of Object.entries(values)) {
    if (value !== undefined && value !== null && value !== '') style[key] = String(value);
  }
  return style as CSSProperties;
}

/** Enveloppe une URL pour un background-image. */
export function url(src: string): string {
  return `url("${src}")`;
}
