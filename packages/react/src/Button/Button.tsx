import clsx from 'clsx';
import { Action } from '../Typography';
import { Icon } from '../Icon';
import { ButtonProps } from './types';
import { BUTTON_VARIANT_TO_CLASS_NAME_MAP } from './constants';
import './styles.scss';

export const Button = ({
    variant = 'primary',
    isDisabled,
    isLoading,
    onClick,
}: ButtonProps) => {
    const className = clsx(
        'button',
        BUTTON_VARIANT_TO_CLASS_NAME_MAP[variant],
        {
            'button--disabled': isDisabled === true,
            'button--loading': isLoading === true,
        },
    );

    return (
        <button className={className} disabled={isDisabled} onClick={onClick}>
            <Icon name="plus-24" />
            <Action>Button</Action>
        </button>
    );
};
