import type { HTMLAttributes, ReactNode } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  tone?: 'paper' | 'sunken' | 'night';
  interactive?: boolean;
  children: ReactNode;
}

/** Carte papier : filet, rayon 8px, plate au repos, ombre legere au survol. */
export function Card({ tone = 'paper', interactive = false, children, className, ...rest }: CardProps) {
  const classes = [
    'nod-card',
    tone !== 'paper' ? `nod-card--${tone}` : '',
    interactive ? 'is-interactive' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}
