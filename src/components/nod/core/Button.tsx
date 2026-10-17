import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Icon, type IconName } from './Icon';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** `primary` est le rempli orange : un seul par vue. */
  tone?: 'primary' | 'secondary' | 'ghost' | 'inverse' | 'on-image' | 'night';
  size?: 'sm' | 'md' | 'lg';
  icon?: IconName;
  iconEnd?: IconName;
  fullWidth?: boolean;
  children?: ReactNode;
}

const ICON_SIZE = { sm: 16, md: 18, lg: 20 } as const;

/** Le controle d'action. L'orange est reserve a l'action principale de la vue. */
export function Button({
  tone = 'primary',
  size = 'md',
  icon,
  iconEnd,
  fullWidth = false,
  children,
  className,
  type = 'button',
  ...rest
}: ButtonProps) {
  const classes = [
    'nod-btn',
    `nod-btn--${tone}`,
    size !== 'md' ? `nod-btn--${size}` : '',
    fullWidth ? 'nod-btn--full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type={type} className={classes} {...rest}>
      {icon ? <Icon name={icon} size={ICON_SIZE[size]} /> : null}
      {children}
      {iconEnd ? <Icon name={iconEnd} size={ICON_SIZE[size]} /> : null}
    </button>
  );
}
