import { BUTTON_VARIANT } from './constants';

type ButtonVariant = (typeof BUTTON_VARIANT)[keyof typeof BUTTON_VARIANT];

export type ButtonProps = {
    variant?: ButtonVariant;
    isDisabled?: boolean;
    isLoading?: boolean;
    onClick?: () => void;
};
