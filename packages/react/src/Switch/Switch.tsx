import { useId } from 'react';
import { clsx } from 'clsx';
import { SwitchProps } from './types';
import './styles.css';

export const Switch = ({
    label,
    hint,
    isChecked,
    isDisabled,
    onChange,
}: SwitchProps) => {
    const id = useId();

    const className = {
        input: clsx('switch', {
            'switch--checked': isChecked,
            'switch--disabled': isDisabled,
        }),
        label: clsx('switch__label', {
            'switch__label--disabled': isDisabled,
        }),
        hint: clsx('switch__hint', {
            'switch__hint--disabled': isDisabled,
        }),
    };

    const input = (
        <input
            id={id}
            type="checkbox"
            className={className.input}
            checked={isChecked}
            disabled={isDisabled}
            onChange={onChange}
        />
    );

    if (!label) {
        return input;
    } else {
        return (
            <div className="switch-container">
                {input}
                {label ? (
                    <label htmlFor={id}>
                        <span className={className.label}>{label}</span>
                        {hint ? (
                            <span className={className.hint}>{hint}</span>
                        ) : null}
                    </label>
                ) : null}
            </div>
        );
    }
};
