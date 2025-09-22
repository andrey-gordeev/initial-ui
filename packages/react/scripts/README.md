# Icon Generator Script with SVGR

Автоматический генератор React компонентов иконок из SVG файлов с использованием SVGR.

## Как работает

1. **Читает SVG файлы** из `src/Icon/svg/`
2. **Использует SVGR** для преобразования SVG в React компоненты
3. **Пост-обрабатывает** результат для интеграции с нашей системой токенов
4. **Обновляет типы** в `types.ts`
5. **Обновляет Icon Registry** в `IconRegistry.tsx`

## Использование

### Генерация всех иконок

```bash
# Из корня проекта
npm run generate:icons

# Или напрямую
cd packages/react
npm run generate:icons
```

### Прямой запуск скрипта

```bash
cd packages/react
node scripts/generate-icons.js
```

## Структура файлов

```
src/Icon/
├── svg/                    # SVG файлы (исходники)
│   ├── add.svg
│   ├── home.svg
│   └── search.svg
├── icons/                  # Сгенерированные компоненты
│   ├── AddIcon.tsx
│   ├── HomeIcon.tsx
│   └── SearchIcon.tsx
├── types.ts               # Обновляется автоматически
├── IconRegistry.tsx       # Обновляется автоматически
└── Icon.tsx               # Основной компонент
```

## Требования к SVG файлам

### ✅ Правильно

```svg
<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M12 5v14m-7-7h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

### ❌ Неправильно

```svg
<!-- Без viewBox -->
<svg width="24" height="24">
  <path d="M12 5v14m-7-7h14" stroke="black" stroke-width="2"/>
</svg>

<!-- С fill вместо stroke -->
<svg width="24" height="24" viewBox="0 0 24 24">
  <path d="M12 5v14m-7-7h14" fill="black"/>
</svg>
```

## Что делает генератор

### 1. SVGR обработка

- Использует **SVGR** для профессиональной конвертации SVG → React
- Автоматически конвертирует атрибуты в camelCase (`stroke-width` → `strokeWidth`)
- Заменяет `stroke="currentColor"` → `stroke={getColor()}`
- Добавляет TypeScript типы

### 2. Пост-обработка

- Интегрирует с нашей системой токенов
- Добавляет функции `getSize()` и `getColor()`
- Убирает лишние props и добавляет нужные
- Форматирует код согласно нашим стандартам

```tsx
// SVGR генерирует:
const SvgAdd = (props: SVGProps<SVGSVGElement>) => (
  <svg width={getSize()} height={getSize()} {...props}>
    <path stroke={getColor()} strokeWidth={2} d="..." />
  </svg>
);

// Мы пост-обрабатываем в:
const AddIcon: React.FC<BaseIconProps> = ({
  size,
  color,
  className,
  style,
}) => {
  const getSize = () => {
    /* размеры */
  };
  const getColor = () => {
    /* токены */
  };
  return (
    <svg
      width={getSize()}
      height={getSize()}
      className={className}
      style={style}
    >
      <path stroke={getColor()} strokeWidth={2} d="..." />
    </svg>
  );
};
```

### 3. Обновление типов

```typescript
// types.ts обновляется автоматически
export const ICON_NAMES = {
  add: 'add',
  home: 'home',
  search: 'search', // ← добавляется автоматически
} as const;
```

### 4. Обновление Registry

```typescript
// IconRegistry.tsx обновляется автоматически
export const IconRegistry: Record<IconName, ComponentType<BaseIconProps>> = {
  add: AddIcon,
  home: HomeIcon,
  search: SearchIcon, // ← добавляется автоматически
} as const;
```

## Примеры использования

### Добавление новой иконки

1. **Поместите SVG файл** в `src/Icon/svg/`

   ```bash
   # Например: src/Icon/svg/edit.svg
   ```

2. **Запустите генерацию**

   ```bash
   npm run generate:icons
   ```

3. **Используйте в коде**
   ```tsx
   <Icon name="edit" size="md" color="blue" />
   ```

### Проверка результата

```bash
# Проверьте что файлы созданы
ls src/Icon/icons/
# AddIcon.tsx  EditIcon.tsx  HomeIcon.tsx  SearchIcon.tsx

# Проверьте что типы обновлены
grep "edit:" src/Icon/types.ts
# edit: 'edit',

# Проверьте что registry обновлен
grep "edit:" src/Icon/IconRegistry.tsx
# edit: EditIcon,
```

## Обработка ошибок

Скрипт продолжает работу даже если некоторые SVG файлы содержат ошибки:

```bash
🚀 Начинаем генерацию иконок...

📋 Найдено 5 SVG файлов: add, arrow, close, home, search

✅ Сгенерирован: add → AddIcon.tsx
✅ Сгенерирован: arrow → ArrowIcon.tsx
❌ Ошибка при генерации close: Invalid SVG format
✅ Сгенерирован: home → HomeIcon.tsx
✅ Сгенерирован: search → SearchIcon.tsx

🔄 Обновляем типы и registry...
✅ Обновлен файл типов
✅ Обновлен Icon Registry

🎉 Генерация завершена! Создано 4 иконок
```

## Интеграция в CI/CD

```yaml
# .github/workflows/icons.yml
name: Generate Icons
on:
  push:
    paths: ['packages/react/src/Icon/svg/**']

jobs:
  generate-icons:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Generate icons
        run: |
          cd packages/react
          npm run generate:icons
      - name: Commit changes
        run: |
          git add .
          git commit -m "Auto-generate icons" || exit 0
          git push
```
