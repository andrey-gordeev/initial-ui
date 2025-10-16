import React from 'react';
import { ComponentType } from 'react';
import { IconName, BaseIconProps } from './types';

// Импорт всех иконок
import AddIcon from './icons/AddIcon';
import ArrowIcon from './icons/ArrowIcon';
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
