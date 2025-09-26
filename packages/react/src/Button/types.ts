export const BUTTON_VARIANT = {
    primary: 'primary',
    'primary-light': 'primary-light',
    secondary: 'secondary',
    'secondary-tertiary': 'secondary-tertiary',
    tertiary: 'tertiary',
    danger: 'danger',
    'danger-secondary': 'danger-secondary',
    'danger-tertiary': 'danger-tertiary',
    link: 'link',
    light: 'light',
} as const;

export type ButtonVariant =
    (typeof BUTTON_VARIANT)[keyof typeof BUTTON_VARIANT];

export type ButtonProps = {
    variant?: ButtonVariant;
    isDisabled?: boolean;
    isLoading?: boolean;
    onClick?: () => void;
};
