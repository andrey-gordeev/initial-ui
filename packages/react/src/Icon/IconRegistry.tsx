import React from 'react';
import { ComponentType } from 'react';
import { IconName, BaseIconProps } from './types';

// Импорт всех иконок
import AddIcon from './icons/AddIcon';
import ArrowIcon from './icons/ArrowIcon';
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
import HomeIcon from './icons/HomeIcon';
import Moon16Icon from './icons/Moon16Icon';
import Moon24Icon from './icons/Moon24Icon';
import Rocket16Icon from './icons/Rocket16Icon';
import Rocket24Icon from './icons/Rocket24Icon';
import SearchIcon from './icons/SearchIcon';
import Sun16Icon from './icons/Sun16Icon';
import Sun24Icon from './icons/Sun24Icon';
import Telescope16Icon from './icons/Telescope16Icon';
import Telescope24Icon from './icons/Telescope24Icon';

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
  ['add']: AddIcon,
  ['arrow']: ArrowIcon,
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
  ['home']: HomeIcon,
  ['moon-16']: Moon16Icon,
  ['moon-24']: Moon24Icon,
  ['rocket-16']: Rocket16Icon,
  ['rocket-24']: Rocket24Icon,
  ['search']: SearchIcon,
  ['sun-16']: Sun16Icon,
  ['sun-24']: Sun24Icon,
  ['telescope-16']: Telescope16Icon,
  ['telescope-24']: Telescope24Icon,
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
