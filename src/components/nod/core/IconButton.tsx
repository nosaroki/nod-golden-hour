import type { ButtonHTMLAttributes } from 'react';
import { Icon, type IconName } from './Icon';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: IconName;
  /** Obligatoire : le bouton n'a pas de texte visible. */
  label: string;
  tone?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const ICON_SIZE = { sm: 16, md: 18, lg: 22 } as const;

/** Controle carre sans texte : barre d'outils, en-tete, quantite, fermeture. */
export function IconButton({
  name,
  label,
  tone = 'secondary',
  size = 'md',
  className,
  type = 'button',
  ...rest
}: IconButtonProps) {
  const classes = [
    'nod-icon-btn',
    `nod-icon-btn--${tone}`,
    size !== 'md' ? `nod-icon-btn--${size}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type={type} className={classes} aria-label={label} title={label} {...rest}>
      <Icon name={name} size={ICON_SIZE[size]} />
    </button>
  );
}
