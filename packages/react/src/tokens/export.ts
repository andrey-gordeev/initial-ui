// Design Tokens Export
// Экспорт токенов из бойлерплейта для использования в других проектах
// Готов для интеграции с Style Dictionary

export { tokens, colorTokens, buttonTokens, getToken } from './index';
export type { ColorToken, ButtonToken, TokenPath } from './index';

/**
 * Экспорт CSS файлов для прямого импорта
 * Использование в других проектах:
 *
 * @import '@your-org/ui-library/dist/tokens/theme.css';
 * @import '@your-org/ui-library/dist/tokens/button.css';
 */
export const cssExports = {
    theme: './tokens/theme.scss',
    button: './tokens/button.scss',
} as const;

/**
 * Экспорт для Style Dictionary
 * Этот файл будет генерироваться автоматически Style Dictionary
 */
export const styleDictionaryExports = {
    // CSS Custom Properties
    css: {
        theme: './dist/tokens/theme.css',
        button: './dist/tokens/button.css',
    },
    // TypeScript tokens
    ts: {
        tokens: './dist/tokens/index.js',
        types: './dist/tokens/index.d.ts',
    },
    // JSON для других платформ
    json: {
        all: './dist/tokens/tokens.json',
        colors: './dist/tokens/colors.json',
        buttons: './dist/tokens/buttons.json',
    },
} as const;

/**
 * Конфигурация для Style Dictionary
 * Этот объект будет использоваться в style-dictionary.config.js
 */
export const styleDictionaryConfig = {
    source: ['tokens/**/*.json'], // Источник: Figma → JSON
    platforms: {
        css: {
            transformGroup: 'css',
            buildPath: 'dist/tokens/',
            files: [
                {
                    destination: 'theme.css',
                    format: 'css/variables',
                    filter: 'isColor',
                },
                {
                    destination: 'button.css',
                    format: 'css/variables',
                    filter: 'isButtonToken',
                },
            ],
        },
        ts: {
            transformGroup: 'js',
            buildPath: 'dist/tokens/',
            files: [
                {
                    destination: 'index.js',
                    format: 'javascript/es6',
                },
                {
                    destination: 'index.d.ts',
                    format: 'typescript/es6-declarations',
                },
            ],
        },
    },
} as const;
