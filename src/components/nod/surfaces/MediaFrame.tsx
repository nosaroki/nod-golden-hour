import type { HTMLAttributes, ReactNode } from 'react';
import { url, vars } from '../cssVars';

export interface MediaFrameProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
  /** Format de cadre, ex. "3 / 2", "4 / 5", "16 / 10". */
  ratio?: string;
  scrim?: 'none' | 'bottom' | 'top' | 'full';
  /** Echelle tres lente, 1 a 1,04 sur 8s. Le seul mouvement d'image autorise. */
  zoomOnHover?: boolean;
  children?: ReactNode;
}

/** Image plein cadre, avec voile de protection optionnel pour la typographie. */
export function MediaFrame({
  src,
  ratio = '3 / 2',
  scrim = 'none',
  zoomOnHover = false,
  children,
  className,
  ...rest
}: MediaFrameProps) {
  const classes = ['nod-media', zoomOnHover ? 'is-zoom' : '', className].filter(Boolean).join(' ');
  return (
    <div
      className={classes}
      style={vars({ '--nod-media-image': url(src), '--nod-media-ratio': ratio })}
      {...rest}
    >
      <div className="nod-media__image" />
      {scrim !== 'none' ? <div className={`nod-media__scrim nod-media__scrim--${scrim}`} /> : null}
      {children ? <div className="nod-media__content">{children}</div> : null}
    </div>
  );
}
