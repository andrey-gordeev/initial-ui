import React from 'react';
import { ComponentType } from 'react';
import { IconName, BaseIconProps } from './types';

// Импорт всех иконок
import AddIcon from './icons/AddIcon';
import ArrowIcon from './icons/ArrowIcon';
import CloseIcon from './icons/CloseIcon';
import HomeIcon from './icons/HomeIcon';
import SearchIcon from './icons/SearchIcon';

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
    add: AddIcon,
    arrow: ArrowIcon,
    close: CloseIcon,
    home: HomeIcon,
    search: SearchIcon,
} as const;

/**
 * Получить компонент иконки по имени
 * @param name - имя иконки
 * @returns React компонент иконки или null
 */
export const getIcon = (
    name: IconName,
): ComponentType<BaseIconProps> | null => {
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
