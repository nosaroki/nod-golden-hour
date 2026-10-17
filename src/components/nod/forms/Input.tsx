import type { InputHTMLAttributes } from 'react';
import { Icon, type IconName } from '../core/Icon';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  icon?: IconName;
  fieldSize?: 'sm' | 'md' | 'lg';
}

/** Champ texte : filet au repos, anneau orange au focus, creme desactive. */
export function Input({ label, hint, error, icon, fieldSize = 'md', disabled, className, ...rest }: InputProps) {
  const wrapper = [
    'nod-input',
    fieldSize !== 'md' ? `nod-input--${fieldSize}` : '',
    error ? 'is-error' : '',
    disabled ? 'is-disabled' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label className={['nod-field', className].filter(Boolean).join(' ')}>
      {label ? <span className="nod-field__label">{label}</span> : null}
      <span className={wrapper}>
        {icon ? <Icon name={icon} size={18} tone="subtle" /> : null}
        <input className="nod-input__control" disabled={disabled} {...rest} />
      </span>
      {error ? (
        <span className="nod-field__error">{error}</span>
      ) : hint ? (
        <span className="nod-field__hint">{hint}</span>
      ) : null}
    </label>
  );
}
