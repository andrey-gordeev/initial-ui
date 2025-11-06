import React from 'react';
import { ComponentType } from 'react';
import { IconName, BaseIconProps } from './types';

// Импорт всех иконок
import ArrowIcon from './icons/ArrowIcon';
import Check16Icon from './icons/Check16Icon';
import Check24Icon from './icons/Check24Icon';
import ChevronDown12Icon from './icons/ChevronDown12Icon';
import ChevronDown16Icon from './icons/ChevronDown16Icon';
import ChevronDown24Icon from './icons/ChevronDown24Icon';
import ChevronLeft12Icon from './icons/ChevronLeft12Icon';
import ChevronLeft16Icon from './icons/ChevronLeft16Icon';
import ChevronLeft24Icon from './icons/ChevronLeft24Icon';
import ChevronRight12Icon from './icons/ChevronRight12Icon';
import ChevronRight16Icon from './icons/ChevronRight16Icon';
import ChevronRight24Icon from './icons/ChevronRight24Icon';
import ChevronUp12Icon from './icons/ChevronUp12Icon';
import ChevronUp16Icon from './icons/ChevronUp16Icon';
import ChevronUp24Icon from './icons/ChevronUp24Icon';
import CloseIcon from './icons/CloseIcon';
import Dash16Icon from './icons/Dash16Icon';
import Dash24Icon from './icons/Dash24Icon';
import Dot16Icon from './icons/Dot16Icon';
import Dot24Icon from './icons/Dot24Icon';
import DotFill16Icon from './icons/DotFill16Icon';
import DotFill24Icon from './icons/DotFill24Icon';
import Eye16Icon from './icons/Eye16Icon';
import Eye24Icon from './icons/Eye24Icon';
import EyeClosed16Icon from './icons/EyeClosed16Icon';
import EyeClosed24Icon from './icons/EyeClosed24Icon';
import HomeIcon from './icons/HomeIcon';
import KebabHorizontal16Icon from './icons/KebabHorizontal16Icon';
import KebabHorizontal24Icon from './icons/KebabHorizontal24Icon';
import Mention16Icon from './icons/Mention16Icon';
import Mention24Icon from './icons/Mention24Icon';
import Moon16Icon from './icons/Moon16Icon';
import Moon24Icon from './icons/Moon24Icon';
import Plus16Icon from './icons/Plus16Icon';
import Plus24Icon from './icons/Plus24Icon';
import Rocket16Icon from './icons/Rocket16Icon';
import Rocket24Icon from './icons/Rocket24Icon';
import Search16Icon from './icons/Search16Icon';
import Search24Icon from './icons/Search24Icon';
import SearchIcon from './icons/SearchIcon';
import Sun16Icon from './icons/Sun16Icon';
import Sun24Icon from './icons/Sun24Icon';
import Telescope16Icon from './icons/Telescope16Icon';
import Telescope24Icon from './icons/Telescope24Icon';
import X12Icon from './icons/X12Icon';
import X16Icon from './icons/X16Icon';
import X24Icon from './icons/X24Icon';

/**
 * Icon Registry - централизованный реестр всех иконок
 *
 * Преимущества:
 * - Все иконки загружаются один раз при первом использовании
 * - Простой API: <Icon name="add" />
 * - TypeScript поддержка с автодополнением
 * - Легко добавлять новые иконки
 */
export const IconRegistry: Record<IconName, ComponentType<BaseIconProps>> = {
  ['arrow']: ArrowIcon,
  ['check-16']: Check16Icon,
  ['check-24']: Check24Icon,
  ['chevron-down-12']: ChevronDown12Icon,
  ['chevron-down-16']: ChevronDown16Icon,
  ['chevron-down-24']: ChevronDown24Icon,
  ['chevron-left-12']: ChevronLeft12Icon,
  ['chevron-left-16']: ChevronLeft16Icon,
  ['chevron-left-24']: ChevronLeft24Icon,
  ['chevron-right-12']: ChevronRight12Icon,
  ['chevron-right-16']: ChevronRight16Icon,
  ['chevron-right-24']: ChevronRight24Icon,
  ['chevron-up-12']: ChevronUp12Icon,
  ['chevron-up-16']: ChevronUp16Icon,
  ['chevron-up-24']: ChevronUp24Icon,
  ['close']: CloseIcon,
  ['dash-16']: Dash16Icon,
  ['dash-24']: Dash24Icon,
  ['dot-16']: Dot16Icon,
  ['dot-24']: Dot24Icon,
  ['dot-fill-16']: DotFill16Icon,
  ['dot-fill-24']: DotFill24Icon,
  ['eye-16']: Eye16Icon,
  ['eye-24']: Eye24Icon,
  ['eye-closed-16']: EyeClosed16Icon,
  ['eye-closed-24']: EyeClosed24Icon,
  ['home']: HomeIcon,
  ['kebab-horizontal-16']: KebabHorizontal16Icon,
  ['kebab-horizontal-24']: KebabHorizontal24Icon,
  ['mention-16']: Mention16Icon,
  ['mention-24']: Mention24Icon,
  ['moon-16']: Moon16Icon,
  ['moon-24']: Moon24Icon,
  ['plus-16']: Plus16Icon,
  ['plus-24']: Plus24Icon,
  ['rocket-16']: Rocket16Icon,
  ['rocket-24']: Rocket24Icon,
  ['search-16']: Search16Icon,
  ['search-24']: Search24Icon,
  ['search']: SearchIcon,
  ['sun-16']: Sun16Icon,
  ['sun-24']: Sun24Icon,
  ['telescope-16']: Telescope16Icon,
  ['telescope-24']: Telescope24Icon,
  ['x-12']: X12Icon,
  ['x-16']: X16Icon,
  ['x-24']: X24Icon,
} as const;

/**
 * Получить компонент иконки по имени
 * @param name - имя иконки
 * @returns React компонент иконки или null
 */
export const getIcon = (name: IconName): ComponentType<BaseIconProps> | null => {
  return IconRegistry[name] || null;
};

/**
 * Проверить, существует ли иконка
 * @param name - имя иконки
 * @returns true если иконка существует
 */
export const hasIcon = (name: string): name is IconName => {
  return name in IconRegistry;
};

/**
 * Получить список всех доступных иконок
 * @returns массив имен иконок
 */
export const getAllIconNames = (): IconName[] => {
  return Object.keys(IconRegistry) as IconName[];
};
