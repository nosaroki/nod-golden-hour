import type { ReactNode } from 'react';

export interface BadgeProps {
  tone?: 'accent' | 'soft' | 'night' | 'yellow' | 'success' | 'error';
  children: ReactNode;
  className?: string;
}

/** Marqueur de statut : rempli, capitale, interlettrage large. */
export function Badge({ tone = 'accent', children, className }: BadgeProps) {
  return <span className={['nod-badge', `nod-badge--${tone}`, className].filter(Boolean).join(' ')}>{children}</span>;
}
