import { useEffect, useRef } from 'react';
import { clsx } from 'clsx';

import { Label3 } from '../Typography';

import { CheckboxProps } from './types';
import './styles.css';

export const Checkbox = ({
    label,
    isChecked,
    isIndeterminate,
    isDisabled,
    onChange,
}: CheckboxProps) => {
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.indeterminate = Boolean(isIndeterminate);
        }
    }, [isIndeterminate]);

    const className = clsx('checkbox', {
        'checkbox--checked': isChecked,
        'checkbox--indeterminate': isIndeterminate,
        'checkbox--disabled': isDisabled,
    });

    return (
        <label className={className}>
            <input
                ref={ref}
                type="checkbox"
                checked={isChecked}
                disabled={isDisabled}
                onChange={onChange}
            />
            {label ? <Label3>{label}</Label3> : null}
        </label>
    );
};
