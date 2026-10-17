import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Trash2,
  X,
  type LucideIcon,
} from 'lucide-react';

/**
 * Le brandbook NOD ne contient aucun jeu d'icones. Lucide est le substitut
 * retenu : trait uniforme de 1,5px, terminaisons carrees, grille de 24px.
 * Jamais pleine, jamais bicolore, jamais dans une pastille coloree.
 */
export const nodIcons = {
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  'arrow-up-right': ArrowUpRight,
  check: Check,
  'chevron-down': ChevronDown,
  minus: Minus,
  plus: Plus,
  search: Search,
  'shopping-bag': ShoppingBag,
  'trash-2': Trash2,
  x: X,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof nodIcons;

export interface IconProps {
  name: IconName;
  /** 20px en interface dense, 24px par defaut, 32px au maximum. */
  size?: number;
  /** La couleur herite de l'encre. `accent` ne sert qu'a une icone par vue. */
  tone?: 'inherit' | 'accent' | 'muted' | 'subtle';
  className?: string;
}

export function Icon({ name, size = 20, tone = 'inherit', className }: IconProps) {
  const Glyph = nodIcons[name];
  const classes = ['nod-icon', tone !== 'inherit' ? `nod-icon--${tone}` : '', className]
    .filter(Boolean)
    .join(' ');
  return <Glyph className={classes} size={size} strokeWidth={1.5} aria-hidden="true" />;
}
