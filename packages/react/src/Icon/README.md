# Icon Component

Компонент иконок с Icon Registry для централизованного управления.

## Использование

```tsx
import { Icon } from './Icon';

// Базовое использование
<Icon name="add" />

// С размерами и цветами
<Icon name="home" size="lg" color="blue" />
<Icon name="arrow" size="stretch" color="red" />
```

## API

### IconProps

```typescript
type IconProps = {
  name: IconName; // 'add' | 'home' | 'arrow' | etc.
  size?: IconSize; // 'stretch' | 'sm' | 'md' | 'lg'
  color?: IconColor; // 'red' | 'green' | 'blue' | 'white' | 'black' | 'gray'
  className?: string;
  style?: React.CSSProperties;
};
```

### Доступные иконки

- `add` - плюс
- `home` - дом
- `arrow` - стрелка

## Генерация компонентов из SVG

### Структура SVG файлов

```
src/Icon/svg/
├── add.svg
├── home.svg
├── arrow.svg
└── ...
```

### Пример SVG файла

```svg
<!-- add.svg -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M12 5v14m-7-7h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

### Требования к SVG

1. **viewBox** должен быть задан
2. **width/height** должны быть убраны (заменяются на токены)
3. **stroke** должен быть `currentColor` или удален
4. **fill** должен быть `none` для stroke иконок
5. **aria-hidden="true"** добавляется автоматически

### Скрипт генерации

```bash
# Генерация всех компонентов из SVG
npm run generate:icons

# Генерация конкретной иконки
npm run generate:icon -- --name=add
```

### Процесс генерации

1. **Читает SVG файлы** из `src/Icon/svg/`
2. **Очищает атрибуты** (width, height, stroke)
3. **Генерирует React компонент** с правильными пропсами
4. **Обновляет IconRegistry** автоматически
5. **Обновляет типы** в `types.ts`

### Пример сгенерированного компонента

```tsx
// icons/AddIcon.tsx (автогенерированный)
import React from 'react';
import { BaseIconProps } from '../types';

const AddIcon: React.FC<BaseIconProps> = ({
  size = 'md',
  color = 'black',
  className,
  style,
}) => {
  const getSize = () => {
    switch (size) {
      case 'sm':
        return '16px';
      case 'md':
        return '24px';
      case 'lg':
        return '32px';
      case 'stretch':
        return '100%';
      default:
        return '24px';
    }
  };

  const getColor = () => {
    return `var(--iui-token-icon-color-${color})`;
  };

  return (
    <svg
      width={getSize()}
      height={getSize()}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M12 5v14m-7-7h14"
        stroke={getColor()}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default AddIcon;
```

## Добавление новых иконок

### 1. Добавьте SVG файл

```bash
# Поместите SVG в папку
src/Icon/svg/new-icon.svg
```

### 2. Запустите генерацию

```bash
npm run generate:icons
```

### 3. Используйте в коде

```tsx
<Icon name="new-icon" size="md" color="blue" />
```

## Токены

Иконки используют централизованные токены:

```scss
// Размеры
--iui-token-icon-size-sm: 16px;
--iui-token-icon-size-md: 24px;
--iui-token-icon-size-lg: 32px;
--iui-token-icon-size-stretch: 100%;

// Цвета (наследуют базовые)
--iui-token-icon-color-red: var(--iui-color-danger);
--iui-token-icon-color-blue: var(--iui-color-primary);
```

## Производительность

- ✅ **Icon Registry** - все иконки загружаются один раз
- ✅ **Tree shaking** - неиспользуемые иконки исключаются
- ✅ **Токены** - размеры и цвета через CSS переменные
- ✅ **Типизация** - TypeScript поддержка с автодополнением
