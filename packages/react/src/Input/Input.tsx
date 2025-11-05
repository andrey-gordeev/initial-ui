import { ChangeEvent, useState } from 'react';
import { clsx } from 'clsx';
import { InputProps } from './types';
import './styles.css';

export const Input = ({
    type = 'text',
    value: defaultValue = '',
    placeholder,
    isDisabled,
    isReadonly,
    isRequired,
    isError,
    pseudoStates,
}: InputProps) => {
    const [value, setValue] = useState(defaultValue);

    const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const className = clsx('input', {
        'input--disabled': isDisabled,
        'input--error': isError,
        'input--hover': pseudoStates?.includes('hover'),
        'input--focus': pseudoStates?.includes('focus'),
    });

    return (
        <input
            className={className}
            type={type}
            value={value}
            placeholder={placeholder}
            disabled={isDisabled}
            onChange={(event) => handleChangeValue(event)}
        />
    );
};
