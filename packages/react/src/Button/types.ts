import type { IconName } from '../Icon';
import { BUTTON_VARIANT } from './constants';

type ButtonVariant = (typeof BUTTON_VARIANT)[keyof typeof BUTTON_VARIANT];

export type ButtonProps = {
    label: string;
    variant?: ButtonVariant;
    icon?: IconName;
    isDisabled?: boolean;
    isLoading?: boolean;
    onClick?: () => void;
};
