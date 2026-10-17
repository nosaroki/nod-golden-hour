import type { InputHTMLAttributes } from 'react';
import { Icon } from '../core/Icon';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

/** Case carree. Cochee : aplat orange, coche creme. */
export function Checkbox({ label, disabled, className, ...rest }: CheckboxProps) {
  return (
    <label className={['nod-checkbox', disabled ? 'is-disabled' : '', className].filter(Boolean).join(' ')}>
      <input type="checkbox" className="nod-checkbox__input" disabled={disabled} {...rest} />
      <span className="nod-checkbox__box">
        <Icon name="check" size={14} />
      </span>
      {label ? <span className="nod-checkbox__label">{label}</span> : null}
    </label>
  );
}
