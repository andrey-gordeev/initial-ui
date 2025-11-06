// Icon Component Types

/**
 * Доступные имена иконок
 * Добавляйте новые иконки сюда при генерации из SVG
 */
export const ICON_NAMES = {
  ['add']: 'add',
  ['arrow']: 'arrow',
  ['chevron-down-12']: 'chevron-down-12',
  ['chevron-down-16']: 'chevron-down-16',
  ['chevron-down-24']: 'chevron-down-24',
  ['chevron-left-12']: 'chevron-left-12',
  ['chevron-left-16']: 'chevron-left-16',
  ['chevron-left-24']: 'chevron-left-24',
  ['chevron-right-12']: 'chevron-right-12',
  ['chevron-right-16']: 'chevron-right-16',
  ['chevron-right-24']: 'chevron-right-24',
  ['chevron-up-12']: 'chevron-up-12',
  ['chevron-up-16']: 'chevron-up-16',
  ['chevron-up-24']: 'chevron-up-24',
  ['close']: 'close',
  ['home']: 'home',
  ['moon-16']: 'moon-16',
  ['moon-24']: 'moon-24',
  ['rocket-16']: 'rocket-16',
  ['rocket-24']: 'rocket-24',
  ['search']: 'search',
  ['sun-16']: 'sun-16',
  ['sun-24']: 'sun-24',
  ['telescope-16']: 'telescope-16',
  ['telescope-24']: 'telescope-24',
} as const;

export type IconName = typeof ICON_NAMES[keyof typeof ICON_NAMES];

/**
 * Доступные размеры иконок
 */
export const ICON_SIZES = {
  stretch: 'stretch', // Заполняет родительский контейнер
  sm: 'sm',           // 16px
  md: 'md',           // 24px
  lg: 'lg',           // 32px
} as const;

export type IconSize = typeof ICON_SIZES[keyof typeof ICON_SIZES];

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

export type IconColor = typeof ICON_COLORS[keyof typeof ICON_COLORS];

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
