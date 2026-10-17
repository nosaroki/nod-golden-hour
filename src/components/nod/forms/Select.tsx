import type { SelectHTMLAttributes } from 'react';
import { Icon } from '../core/Icon';

export type SelectOption = string | { value: string; label: string };

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  options?: SelectOption[];
  fieldSize?: 'sm' | 'md' | 'lg';
}

/** Select natif habille en NOD. */
export function Select({ label, hint, options = [], fieldSize = 'md', disabled, className, ...rest }: SelectProps) {
  const wrapper = ['nod-select', fieldSize !== 'md' ? `nod-select--${fieldSize}` : ''].filter(Boolean).join(' ');

  return (
    <label className={['nod-field', className].filter(Boolean).join(' ')}>
      {label ? <span className="nod-field__label">{label}</span> : null}
      <span className={wrapper}>
        <select className="nod-select__control" disabled={disabled} {...rest}>
          {options.map((option) => {
            const value = typeof option === 'string' ? option : option.value;
            const text = typeof option === 'string' ? option : option.label;
            return (
              <option key={value} value={value}>
                {text}
              </option>
            );
          })}
        </select>
        <Icon name="chevron-down" size={18} className="nod-select__chevron" />
      </span>
      {hint ? <span className="nod-field__hint">{hint}</span> : null}
    </label>
  );
}
