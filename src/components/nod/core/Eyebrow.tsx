import type { ReactNode } from 'react';

export interface EyebrowProps {
  /** `light` est reserve aux eyebrows poses sur photographie ou sur degrade. */
  tone?: 'accent' | 'muted' | 'inverse' | 'light' | 'ink';
  children: ReactNode;
  className?: string;
}

/** Petit label capitale : le seul capitale du systeme. */
export function Eyebrow({ tone = 'accent', children, className }: EyebrowProps) {
  const classes = ['nod-eyebrow', tone !== 'accent' ? `nod-eyebrow--${tone}` : '', className]
    .filter(Boolean)
    .join(' ');
  return <span className={classes}>{children}</span>;
}
