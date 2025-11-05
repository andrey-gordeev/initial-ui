import clsx from 'clsx';
import { FormControlProps } from './types';
import './styles.css';

export const FormControl = ({
    children,
    label,
    hint,
    error,
    isDisabled,
    isRequired,
}: FormControlProps) => {
    const className = {
        control: 'form-control',
        label: clsx({
            'form-control__label': true,
            'form-control__label--disabled': isDisabled,
        }),
        hint: 'form-control__hint',
        error: 'form-control__error',
    };

    return (
        <div className={className.control}>
            {label ? <label className={className.label}>{label}</label> : null}
            {children}
            {hint && !error ? (
                <span className={className.hint}>{hint}</span>
            ) : null}
            {error ? <span className={className.error}>{error}</span> : null}
        </div>
    );
};
