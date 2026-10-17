import type { HTMLAttributes } from 'react';
import { url, vars } from '../cssVars';

export interface ScallopImageProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
  height?: number;
  /** Taille d'une feston. 64px par defaut. */
  size?: number;
}

/** Panneau image au bord festonne. Une seule fois par composition, a l'horizon
 *  entre la typographie et l'image. Jamais en separateur de blocs de texte. */
export function ScallopImage({ src, height = 420, size = 64, className, ...rest }: ScallopImageProps) {
  return (
    <div
      className={['nod-scallop', className].filter(Boolean).join(' ')}
      style={vars({
        '--nod-scallop-image': url(src),
        '--nod-scallop-h': `${height}px`,
        '--nod-scallop-size': `${size}px`,
      })}
      {...rest}
    />
  );
}
