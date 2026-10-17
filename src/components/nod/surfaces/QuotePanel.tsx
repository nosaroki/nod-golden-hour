import type { HTMLAttributes, ReactNode } from 'react';
import { url, vars } from '../cssVars';

export interface QuotePanelProps extends HTMLAttributes<HTMLDivElement> {
  image?: string;
  align?: 'center' | 'start';
  children: ReactNode;
}

/** Aplat orange plein pose sur une photographie, rayon 28px : brandbook p.18. */
export function QuotePanel({ image, align = 'center', children, className, ...rest }: QuotePanelProps) {
  const classes = ['nod-quote-panel', align === 'start' ? 'nod-quote-panel--start' : '', className]
    .filter(Boolean)
    .join(' ');
  return (
    <div className={classes} style={vars({ '--nod-quote-image': image ? url(image) : undefined })} {...rest}>
      <blockquote className="nod-quote-panel__box nod-grain">{children}</blockquote>
    </div>
  );
}
