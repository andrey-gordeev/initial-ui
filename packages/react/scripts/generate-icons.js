#!/usr/bin/env node

/**
 * Icon Generator Script with SVGR
 *
 * Генерирует React компоненты из SVG файлов с помощью SVGR
 *
 * Использование:
 * node scripts/generate-icons.js
 * node scripts/generate-icons.js --name=add
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Конфигурация
const CONFIG = {
    svgDir: path.join(__dirname, '../src/Icon/svg'),
    iconsDir: path.join(__dirname, '../src/Icon/icons'),
    typesFile: path.join(__dirname, '../src/Icon/types.ts'),
    registryFile: path.join(__dirname, '../src/Icon/IconRegistry.tsx'),
};

/**
 * Преобразует имя файла в PascalCase
 * @param {string} name - имя файла
 * @returns {string} PascalCase имя
 */
function toPascalCase(name) {
    return name
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
}

/**
 * Преобразует имя файла в camelCase для экспорта
 * @param {string} name - имя файла
 * @returns {string} camelCase имя
 */
function toCamelCase(name) {
    const pascal = toPascalCase(name);
    return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

/**
 * Генерирует React компонент из SVG с помощью SVGR
 * @param {string} iconName - имя иконки
 * @returns {Promise<boolean>}
 */
async function generateIconComponent(iconName) {
    const svgPath = path.join(CONFIG.svgDir, `${iconName}.svg`);
    const componentPath = path.join(
        CONFIG.iconsDir,
        `${toPascalCase(iconName)}Icon.tsx`,
    );

    try {
        // Используем SVGR для генерации компонента
        const svgrCommand = `npx @svgr/cli --typescript --replace-attr-values "currentColor={getColor()}" "${svgPath}"`;

        const svgrOutput = execSync(svgrCommand, {
            encoding: 'utf8',
            cwd: path.join(__dirname, '../../../'),
        });

        // Пост-обработка сгенерированного контента
        const processedContent = postProcessSvgContent(svgrOutput, iconName);

        // Сохраняем обработанный контент
        fs.writeFileSync(componentPath, processedContent);

        console.log(
            `✅ Сгенерирован: ${iconName} → ${toPascalCase(iconName)}Icon.tsx`,
        );
        return true;
    } catch (error) {
        console.error(`❌ Ошибка при генерации ${iconName}:`, error.message);
        return false;
    }
}

/**
 * Пост-обработка сгенерированного SVGR контента
 * @param {string} svgrOutput - вывод SVGR
 * @param {string} iconName - имя иконки
 * @returns {string} обработанный контент
 */
function postProcessSvgContent(svgrOutput, iconName) {
    const componentName = toPascalCase(iconName) + 'Icon';

    // Извлекаем SVG контент из вывода SVGR
    const svgMatch = svgrOutput.match(/<svg[^>]*>[\s\S]*?<\/svg>/);
    const svgContent = svgMatch ? svgMatch[0] : '';

    // Заменяем width и height на функции, убираем props
    const processedSvg = svgContent
        .replace(/width=\{getSize\(\)\}/g, 'width={getSize()}')
        .replace(/height=\{getSize\(\)\}/g, 'height={getSize()}')
        .replace(/\s*\{\.\.\.props\}/g, '')
        .replace(/\s*className=\{className\}/g, ' className={className}')
        .replace(/\s*style=\{style\}/g, ' style={style}');

    return `import React from 'react';
import { BaseIconProps } from '../types';

/**
 * ${componentName} Component
 * Генерируется из SVG файла с помощью SVGR
 */
const ${componentName}: React.FC<BaseIconProps> = ({
  size = 'md',
  color = 'black',
  className,
  style
}) => {
  const getSize = () => {
    switch (size) {
      case 'sm': return '16px';
      case 'md': return '24px';
      case 'lg': return '32px';
      case 'stretch': return '100%';
      default: return '24px';
    }
  };

  const getColor = () => {
    return \`var(--iui-token-icon-color-\${color})\`;
  };

  return (
    ${processedSvg.replace(/<svg/, '    <svg')}
  );
};

export default ${componentName};
`;
}

/**
 * Обновляет файл типов
 * @param {Array<string>} iconNames - массив имен иконок
 */
function updateTypesFile(iconNames) {
    const iconNamesObject = iconNames
        .map((name) => `  ['${name}']: '${name}',`)
        .join('\n');

    const typesContent = `// Icon Component Types

/**
 * Доступные имена иконок
 * Добавляйте новые иконки сюда при генерации из SVG
 */
export const ICON_NAMES = {
${iconNamesObject}
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
`;

    fs.writeFileSync(CONFIG.typesFile, typesContent);
    console.log(`✅ Обновлен файл типов: ${CONFIG.typesFile}`);
}

/**
 * Обновляет Icon Registry
 * @param {Array<string>} iconNames - массив имен иконок
 */
function updateRegistryFile(iconNames) {
    const imports = iconNames
        .map(
            (name) =>
                `import ${toPascalCase(name)}Icon from './icons/${toPascalCase(name)}Icon';`,
        )
        .join('\n');

    const registryObject = iconNames
        .map((name) => `  ['${name}']: ${toPascalCase(name)}Icon,`)
        .join('\n');

    const registryContent = `import React from 'react';
import { ComponentType } from 'react';
import { IconName, BaseIconProps } from './types';

// Импорт всех иконок
${imports}

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
${registryObject}
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
`;

    fs.writeFileSync(CONFIG.registryFile, registryContent);
    console.log(`✅ Обновлен Icon Registry: ${CONFIG.registryFile}`);
}

/**
 * Основная функция генерации
 */
async function generateIcons() {
    console.log('🚀 Начинаем генерацию иконок с SVGR...\n');

    // Проверяем существование папки с SVG
    if (!fs.existsSync(CONFIG.svgDir)) {
        console.error(`❌ Папка с SVG файлами не найдена: ${CONFIG.svgDir}`);
        process.exit(1);
    }

    // Создаем папку для иконок если не существует
    if (!fs.existsSync(CONFIG.iconsDir)) {
        fs.mkdirSync(CONFIG.iconsDir, { recursive: true });
        console.log(`📁 Создана папка для иконок: ${CONFIG.iconsDir}`);
    }

    // Получаем список SVG файлов
    const svgFiles = fs
        .readdirSync(CONFIG.svgDir)
        .filter((file) => file.endsWith('.svg'))
        .map((file) => file.replace('.svg', ''));

    if (svgFiles.length === 0) {
        console.log('⚠️  SVG файлы не найдены');
        return;
    }

    console.log(
        `📋 Найдено ${svgFiles.length} SVG файлов:`,
        svgFiles.join(', '),
    );
    console.log('');

    // Генерируем компоненты для каждой иконки с помощью SVGR
    const generatedIcons = [];

    for (const iconName of svgFiles) {
        const success = await generateIconComponent(iconName);
        if (success) {
            generatedIcons.push(iconName);
        }
    }

    if (generatedIcons.length > 0) {
        console.log('');
        console.log('🔄 Обновляем типы и registry...');

        // Обновляем файлы типов и registry
        updateTypesFile(generatedIcons);
        updateRegistryFile(generatedIcons);

        console.log('');
        console.log(
            `🎉 Генерация завершена! Создано ${generatedIcons.length} иконок:`,
        );
        generatedIcons.forEach((name) => {
            console.log(`   - ${name} → <Icon name="${name}" />`);
        });
    }
}

// Запускаем генерацию
if (require.main === module) {
    generateIcons();
}

module.exports = { generateIcons, toPascalCase };
