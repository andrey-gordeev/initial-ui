export const BUTTON_VARIANT = {
    ['primary']: 'primary',
    ['primary-light']: 'primary-light',
    ['secondary']: 'secondary',
    ['secondary-tertiary']: 'secondary-tertiary',
    ['tertiary']: 'tertiary',
    ['danger']: 'danger',
    ['danger-secondary']: 'danger-secondary',
    ['danger-tertiary']: 'danger-tertiary',
    ['link']: 'link',
    ['light']: 'light',
} as const;

export const BUTTON_VARIANT_TO_CLASS_NAME_MAP: Record<
    keyof typeof BUTTON_VARIANT,
    string
> = {
    [BUTTON_VARIANT['primary']]: 'button--primary',
    [BUTTON_VARIANT['primary-light']]: 'button--primary-light',
    [BUTTON_VARIANT['secondary']]: 'button--secondary',
    [BUTTON_VARIANT['secondary-tertiary']]: 'button--secondary-tertiary',
    [BUTTON_VARIANT['tertiary']]: 'button--tertiary',
    [BUTTON_VARIANT['danger']]: 'button--danger',
    [BUTTON_VARIANT['danger-secondary']]: 'button--danger-secondary',
    [BUTTON_VARIANT['danger-tertiary']]: 'button--danger-tertiary',
    [BUTTON_VARIANT['link']]: 'button--link',
    [BUTTON_VARIANT['light']]: 'button--light',
};
