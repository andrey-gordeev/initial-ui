// Icon Component Types

/**
 * Доступные имена иконок
 * Добавляйте новые иконки сюда при генерации из SVG
 */
export const ICON_NAMES = {
    add: 'add',
    arrow: 'arrow',
    close: 'close',
    home: 'home',
    search: 'search',
} as const;

export type IconName = (typeof ICON_NAMES)[keyof typeof ICON_NAMES];

/**
 * Доступные размеры иконок
 */
export const ICON_SIZES = {
    stretch: 'stretch', // Заполняет родительский контейнер
    sm: 'sm', // 16px
    md: 'md', // 24px
    lg: 'lg', // 32px
} as const;

export type IconSize = (typeof ICON_SIZES)[keyof typeof ICON_SIZES];

/**
 * Доступные цвета иконок
 */
export const ICON_COLORS = {
    red: 'red',
    green: 'green',
    blue: 'blue',
    white: 'white',
    black: 'black',
    gray: 'gray',
} as const;

export type IconColor = (typeof ICON_COLORS)[keyof typeof ICON_COLORS];

/**
 * Пропсы компонента Icon
 */
export type IconProps = {
    name: IconName;
    size?: IconSize;
    color?: IconColor;
    className?: string;
    style?: React.CSSProperties;
};

/**
 * Пропсы для отдельной иконки (используется в Icon Registry)
 */
export type BaseIconProps = {
    size?: IconSize;
    color?: IconColor;
    className?: string;
    style?: React.CSSProperties;
};
