import { clsx } from 'clsx';
import { Action } from '../Typography';
import { Icon } from '../Icon';
import { ButtonProps, ButtonVariant } from './types';
import './styles.scss';

const VARIANT_TO_CLASS_MAP: Record<ButtonVariant, string> = {
    primary: 'button--primary',
    'primary-light': 'button--primary-light',
    secondary: 'button--secondary',
    'secondary-tertiary': 'button--secondary-tertiary',
    tertiary: 'button--tertiary',
    danger: 'button--danger',
    'danger-secondary': 'button--danger-secondary',
    'danger-tertiary': 'button--danger-tertiary',
    link: 'button--link',
    light: 'button--light',
};

export const Button = ({
    variant = 'primary',
    isDisabled,
    isLoading,
    onClick,
}: ButtonProps) => {
    const className = clsx('button', VARIANT_TO_CLASS_MAP[variant], {
        'button--disabled': isDisabled === true,
        'button--loading': isLoading === true,
    });

    return (
        <button className={className} disabled={isDisabled} onClick={onClick}>
            <Icon name={'add'} />
            <Action>Button</Action>
        </button>
    );
};
