// Design Tokens - TypeScript Interface
// Источник: Style Dictionary (Figma → Style Dictionary → TypeScript)
// Синхронизирован с CSS Custom Properties из theme.scss и button.scss

/**
 * Базовые цвета дизайн-системы
 */
export const colorTokens = {
    primary: 'var(--iui-color-primary)',
    secondary: 'var(--iui-color-secondary)',
    danger: 'var(--iui-color-danger)',
    success: 'var(--iui-color-success)',
    warning: 'var(--iui-color-warning)',
    info: 'var(--iui-color-info)',
    link: 'var(--iui-color-link)',

    // Neutral colors
    white: 'var(--iui-color-white)',
    black: 'var(--iui-color-black)',
    gray: {
        10: 'var(--iui-color-gray-10)',
        20: 'var(--iui-color-gray-20)',
        30: 'var(--iui-color-gray-30)',
        40: 'var(--iui-color-gray-40)',
        50: 'var(--iui-color-gray-50)',
        60: 'var(--iui-color-gray-60)',
        70: 'var(--iui-color-gray-70)',
        80: 'var(--iui-color-gray-80)',
        90: 'var(--iui-color-gray-90)',
        100: 'var(--iui-color-gray-100)',
    },

    // Semantic colors
    text: {
        primary: 'var(--iui-color-text-primary)',
        secondary: 'var(--iui-color-text-secondary)',
        disabled: 'var(--iui-color-text-disabled)',
        inverse: 'var(--iui-color-text-inverse)',
    },

    background: {
        default: 'var(--iui-color-background)',
        hover: 'var(--iui-color-background-hover)',
        active: 'var(--iui-color-background-active)',
        disabled: 'var(--iui-color-background-disabled)',
    },

    border: {
        default: 'var(--iui-color-border)',
        hover: 'var(--iui-color-border-hover)',
        active: 'var(--iui-color-border-active)',
        disabled: 'var(--iui-color-border-disabled)',
    },

    focus: 'var(--iui-color-focus)',
} as const;

/**
 * Токены компонента Button
 */
export const buttonTokens = {
    primary: {
        color: 'var(--iui-token-button-primary-color)',
        hover: 'var(--iui-token-button-primary-color-hover)',
        active: 'var(--iui-token-button-primary-color-active)',
        disabled: 'var(--iui-token-button-primary-color-disabled)',
        text: 'var(--iui-token-button-primary-text-color)',
    },
    secondary: {
        color: 'var(--iui-token-button-secondary-color)',
        hover: 'var(--iui-token-button-secondary-color-hover)',
        active: 'var(--iui-token-button-secondary-color-active)',
        disabled: 'var(--iui-token-button-secondary-color-disabled)',
        text: 'var(--iui-token-button-secondary-text-color)',
    },
    tertiary: {
        color: 'var(--iui-token-button-tertiary-color)',
        hover: 'var(--iui-token-button-tertiary-color-hover)',
        active: 'var(--iui-token-button-tertiary-color-active)',
        disabled: 'var(--iui-token-button-tertiary-color-disabled)',
        text: 'var(--iui-token-button-tertiary-text-color)',
    },
    danger: {
        color: 'var(--iui-token-button-danger-color)',
        hover: 'var(--iui-token-button-danger-color-hover)',
        active: 'var(--iui-token-button-danger-color-active)',
        disabled: 'var(--iui-token-button-danger-color-disabled)',
        text: 'var(--iui-token-button-danger-text-color)',
    },
    link: {
        color: 'var(--iui-token-button-link-color)',
        hover: 'var(--iui-token-button-link-color-hover)',
        active: 'var(--iui-token-button-link-color-active)',
        disabled: 'var(--iui-token-button-link-color-disabled)',
        text: 'var(--iui-token-button-link-text-color)',
    },
    global: {
        textDisabled: 'var(--iui-token-button-text-color-disabled)',
        focus: 'var(--iui-token-button-focus-color)',
    },
} as const;

/**
 * Токены компонента Switch
 */
export const switchTokens = {
    track: {
        width: 'var(--iui-token-switch-track-width)',
        height: 'var(--iui-token-switch-track-height)',
        spacing: 'var(--iui-token-switch-track-spacing)',
        background: 'var(--iui-token-switch-track-background)',
        backgroundChecked: 'var(--iui-token-switch-track-background-checked)',
        borderWidth: 'var(--iui-token-switch-track-border-width)',
        borderColor: 'var(--iui-token-switch-track-border-color)',
        borderRadius: 'var(--iui-token-switch-track-border-radius)',
    },
    thumb: {
        background: 'var(--iui-token-switch-thumb-background)',
        borderWidth: 'var(--iui-token-switch-thumb-border-width)',
        borderColor: 'var(--iui-token-switch-thumb-border-color)',
        borderRadius: 'var(--iui-token-switch-thumb-border-radius)',
    },
    disabled: {
        trackBackground: 'var(--iui-token-switch-disabled-track-background)',
        trackBorderColor: 'var(--iui-token-switch-disabled-track-border-color)',
        thumbBackground: 'var(--iui-token-switch-disabled-thumb-background)',
        thumbBorderColor: 'var(--iui-token-switch-disabled-thumb-border-color)',
    },
} as const;

/**
 * Токены компонента Icon
 */
export const iconTokens = {
    size: {
        sm: 'var(--iui-token-icon-size-sm)',
        md: 'var(--iui-token-icon-size-md)',
        lg: 'var(--iui-token-icon-size-lg)',
        stretch: 'var(--iui-token-icon-size-stretch)',
    },
    color: {
        red: 'var(--iui-token-icon-color-red)',
        green: 'var(--iui-token-icon-color-green)',
        blue: 'var(--iui-token-icon-color-blue)',
        white: 'var(--iui-token-icon-color-white)',
        black: 'var(--iui-token-icon-color-black)',
        gray: 'var(--iui-token-icon-color-gray)',
    },
    default: {
        size: 'var(--iui-token-icon-default-size)',
        color: 'var(--iui-token-icon-default-color)',
    },
} as const;

/**
 * Токены компонента Popover
 */
export const popoverTokens = {
    // Размеры
    minWidth: 'var(--iui-token-popover-min-width)',
    padding: 'var(--iui-token-popover-padding)',
    fontSize: 'var(--iui-token-popover-font-size)',
    borderWidth: 'var(--iui-token-popover-border-width)',
    borderRadius: 'var(--iui-token-popover-border-radius)',
    
    // Размеры стрелки (связанные)
    arrowSize: 'var(--iui-token-popover-arrow-size)',
    arrowHalfSize: 'var(--iui-token-popover-arrow-half-size)',
    arrowOffset: 'var(--iui-token-popover-arrow-offset)',
    
    // Позиционирование стрелки
    arrowPositionStart: 'var(--iui-token-popover-arrow-position-start)',
    arrowPositionEnd: 'var(--iui-token-popover-arrow-position-end)',
    
    // Позиционирование контейнера
    offset: 'var(--iui-token-popover-offset)',
    offsetLarge: 'var(--iui-token-popover-offset-large)',
    
    // Цвета
    background: 'var(--iui-token-popover-background)',
    borderColor: 'var(--iui-token-popover-border-color)',
    textColor: 'var(--iui-token-popover-text-color)',
    
    // Эффекты
    shadow: 'var(--iui-token-popover-shadow)',
    
    // Z-index
    zIndex: 'var(--iui-token-popover-z-index)',
    arrowZIndex: 'var(--iui-token-popover-arrow-z-index)',
    overlayZIndex: 'var(--iui-token-popover-overlay-z-index)',
} as const;

/**
 * Общие токены дизайн-системы
 */
export const tokens = {
    color: colorTokens,
    button: buttonTokens,
    switch: switchTokens,
    icon: iconTokens,
    popover: popoverTokens,
} as const;

/**
 * Типы для TypeScript
 */
export type ColorToken = keyof typeof colorTokens;
export type ButtonToken = keyof typeof buttonTokens;
export type SwitchToken = keyof typeof switchTokens;
export type IconToken = keyof typeof iconTokens;
export type PopoverToken = keyof typeof popoverTokens;
export type TokenPath = keyof typeof tokens;

/**
 * Утилитарная функция для получения токена
 * @param path - путь к токену (например: 'color.primary' или 'button.primary.color')
 * @returns CSS Custom Property или undefined
 */
export function getToken(path: string): string | undefined {
    const keys = path.split('.');
    let current: any = tokens;

    for (const key of keys) {
        if (current && typeof current === 'object' && key in current) {
            current = current[key];
        } else {
            return undefined;
        }
    }

    return typeof current === 'string' ? current : undefined;
}

/**
 * Экспорт для использования в компонентах
 */
export { tokens as default };
