import type { ButtonHTMLAttributes, ReactNode } from 'react';

export interface TagProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  onRemove?: () => void;
  children: ReactNode;
}

/** Puce de filtre selectionnable. La forme pilule lui est reservee. */
export function Tag({ selected = false, onRemove, children, className, type = 'button', ...rest }: TagProps) {
  const classes = ['nod-tag', selected ? 'is-selected' : '', className].filter(Boolean).join(' ');
  return (
    <button type={type} className={classes} aria-pressed={selected} {...rest}>
      {children}
      {onRemove ? (
        <span
          className="nod-tag__remove"
          role="button"
          tabIndex={-1}
          aria-label="Retirer"
          onClick={(event) => {
            event.stopPropagation();
            onRemove();
          }}
        >
          &times;
        </span>
      ) : null}
    </button>
  );
}
