import type { HTMLAttributes, ReactNode } from 'react';

export interface PanelProps extends HTMLAttributes<HTMLElement> {
  tone?: 'cream' | 'accent' | 'night' | 'gradient';
  /** Le grain fin du brandbook : un aplat de couleur n'est jamais propre. */
  grain?: boolean;
  children: ReactNode;
}

/** Bande pleine largeur : c'est la que vit le seul moment orange d'une page. */
export function Panel({ tone = 'cream', grain = false, children, className, ...rest }: PanelProps) {
  const classes = [
    'nod-panel',
    tone !== 'cream' ? `nod-panel--${tone}` : '',
    grain ? 'nod-grain' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <section className={classes} {...rest}>
      {children}
    </section>
  );
}
