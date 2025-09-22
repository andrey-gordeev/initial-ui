import { useEffect, useRef } from 'react';
import { clsx } from 'clsx';
import { CheckboxProps } from './types';
import './styles.css';

export const Checkbox = ({
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
        <input
            ref={ref}
            type="checkbox"
            className={className}
            checked={isChecked}
            disabled={isDisabled}
            onChange={onChange}
        />
    );
};
