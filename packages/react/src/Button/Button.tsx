import clsx from 'clsx';

import { Icon } from '../Icon';
import { Action } from '../Typography';

import type { ButtonProps } from './types';
import { BUTTON_VARIANT_TO_CLASS_NAME_MAP } from './constants';
import './styles.scss';

function Button({
    ref,
    label,
    variant = 'primary',
    icon,
    isDisabled,
    isLoading,
    onClick,
}: ButtonProps) {
    const className = clsx(
        'button',
        BUTTON_VARIANT_TO_CLASS_NAME_MAP[variant],
        {
            'button--disabled': isDisabled === true,
            'button--loading': isLoading === true,
        },
    );

    return (
        <button
            ref={ref}
            className={className}
            disabled={isDisabled}
            onClick={onClick}
        >
            {icon && <Icon name={icon} />}
            <Action>{label}</Action>
        </button>
    );
}

export { Button };
