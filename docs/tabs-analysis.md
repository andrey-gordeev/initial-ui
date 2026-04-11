# Tabs Component — Deep Analysis

## Контекст

Анализ компонента `packages/react/src/Tabs/` относительно:
- W3C WAI-ARIA APG Tabs Pattern (manual activation)
- Подхода dual API (data + composition) — сравнение с RadioGroup
- Архитектуры для базы дизайн-системы (copy-paste, Mid+, ограниченный интерфейс, сильная база)

---

## 1. Accessibility — текущие проблемы

### 1.1 Отсутствующие клавиши (W3C APG spec)

| Клавиша | Спецификация | Текущее состояние |
|---|---|---|
| `Home` | Фокус на первый таб | **Отсутствует** |
| `End` | Фокус на последний таб | **Отсутствует** |
| `ArrowUp` (vertical) | То же что `ArrowLeft` при `aria-orientation="vertical"` | **Отсутствует** |
| `ArrowDown` (vertical) | То же что `ArrowRight` при `aria-orientation="vertical"` | **Отсутствует** |

### 1.2 Отсутствующие ARIA-атрибуты

| Атрибут | Где | Требование | Текущее состояние |
|---|---|---|---|
| `aria-orientation` | `[role="tablist"]` | Обязателен для vertical (`"vertical"`), default = `"horizontal"` | **Отсутствует** |
| `aria-label` / `aria-labelledby` | `[role="tablist"]` | Один из двух обязателен | **Отсутствует** |
| `tabindex="0"` | `[role="tabpanel"]` | Когда первый элемент панели не фокусируемый | **Отсутствует** |

### 1.3 Проблемы с клавиатурной навигацией

**Избыточная обработка Enter/Space:**
Текущий код вручную перехватывает `Enter` и `Space` в `handleKeyDown` и вызывает `setActiveId`. Но `<button>` нативно генерирует `click` при Enter/Space. W3C reference полагается на нативный `onClick` — без явного хендлера клавиш. Текущий `e.preventDefault()` подавляет нативный click, а потом дублирует его логику.

**Пропуск disabled табов при навигации стрелками:**
`focusNextTab`/`focusPrevTab` пропускают disabled табы. Это валидное решение, **но** потенциальный бесконечный цикл если все табы disabled (while loop без guard).

**Отсутствие `event.stopPropagation()`:**
W3C reference вызывает и `preventDefault()` и `stopPropagation()` для обработанных клавиш. Текущий код вызывает только `preventDefault()`.

### 1.4 Проблемы со стилями

- `outline: 1px dotted blue` — слабая реализация focus ring, не соответствует best practices (нет поддержки forced-colors / high contrast mode)
- Hardcoded цвета (`#000`, `#999`, `rgb(79, 70, 229)`) вместо дизайн-токенов
- W3C рекомендует раздельную визуальную индикацию focus vs selection — текущий focus ring не достаточно отличается от selected state

---

## 2. Controlled / Uncontrolled

### Текущее состояние

Только **uncontrolled** — внутренний `useState` для `activeId`. Нет возможности:
- Передать начальное значение (`defaultActiveId`)
- Управлять извне (`activeId` + `onActiveIdChange`)
- Реагировать на смену таба (нет callback)

### Оценка необходимости

Для базы дизайн-системы **оба режима необходимы**:

| Сценарий | Режим |
|---|---|
| Простые табы "из коробки" | Uncontrolled с `defaultActiveId` |
| URL-синхронизация (`?tab=settings`) | Controlled |
| Условная логика ("покажи таб если..." ) | Controlled |
| Analytics / tracking переключений | `onChange` callback |

### Рекомендуемый паттерн

```tsx
type TabsProps = {
    defaultActiveId?: string;   // uncontrolled
    activeId?: string;          // controlled
    onActiveIdChange?: (id: string) => void;
};
```

Внутри — стандартный паттерн:
```tsx
const [uncontrolledId, setUncontrolledId] = useState(defaultActiveId ?? firstEnabledId);
const currentId = activeId ?? uncontrolledId;
const handleChange = (id: string) => {
    if (activeId === undefined) setUncontrolledId(id);
    onActiveIdChange?.(id);
};
```

Этот паттерн уже используется в `Dialog` — consistency.

---

## 3. Dual API: Data + Composition ✅ DONE

> **Решение: удалён data-driven API, оставлен только composition.**

### Что было

```tsx
// Вариант A — data-driven (УДАЛЁН)
<Tabs tabList={[...]} panelList={[...]} />

// Вариант B — composition (единственный API)
<Tabs>
  <Tabs.TabList>
    <Tabs.Tab id="1" label="Tab 1" />
  </Tabs.TabList>
  <Tabs.PanelList>
    <Tabs.Panel id="1">Content</Tabs.Panel>
  </Tabs.PanelList>
</Tabs>
```

### Что удалено

- Типы `TabsPropsWithChildren`, `TabsPropsWithLists`, union-дискриминатор
- `hasChildren` type guard
- `useMemo` для дискриминации data/children
- Двойная инициализация `activeId` (два блока в useEffect) → один блок
- Поле `tabs` из context (нужно было только data API)
- Двойная логика ref-регистрации в `Tab` ("свободный слот" vs "индекс из массива") → один путь
- Тернарник `actualActiveIndex` → один `findIndex`
- `useEffect` для инициализации массива refs на основе `tabs.length`
- Весь data-driven рендер (второй `return`)

### Результат

~400 строк → ~240 строк, один code path вместо двух.

### Обоснование

1. **Целевая аудитория** — Mid+ инженеры, копирующие и модифицирующие. Им не нужен "удобный" data API, им нужна **понятная, расширяемая** база.

2. **Принцип дизайн-системы** — "максимально ограничить пользователя, максимальная свобода инженеру". Composition API дает инженеру полный контроль, а ограничения накладываются через типы.

3. **Если нужен data-driven shortcut** — он тривиально создается потребителем:
```tsx
const SimpleTabs = ({ items }: { items: TabItem[] }) => (
    <Tabs defaultActiveId={items[0].id}>
        <Tabs.TabList>
            {items.map(t => <Tabs.Tab key={t.id} {...t} />)}
        </Tabs.TabList>
        <Tabs.PanelList>
            {items.map(t => <Tabs.Panel key={t.id}>{t.content}</Tabs.Panel>)}
        </Tabs.PanelList>
    </Tabs>
);
```

### Оставшиеся проблемы из dual-эпохи

Следующие артефакты остались в коде и будут устранены в Phase 2–3:
- `cloneElement` в `PanelList` для проброса `hidden`
- `createElementTypeGuard` / `displayName` зависимость в `PanelList`
- Двойная система refs (`tabsRefs` Map + `tabsRef` array)
- Императивная регистрация `registerTab` через effects

---

## 4. Архитектура — оценка и проблемы

### 4.1 Indicator (animated underline)

**`useElementSize`** — не реагирует на:
- Resize окна (нет `ResizeObserver`)
- Динамическое изменение контента табов
- Изменение font-size / zoom

Хук читает `offsetLeft`/`offsetTop` один раз в effect и больше не обновляется.

**CSS-переменные для позиции:**
Подход с inline CSS variables (`--tab-item-active-left`, `--tab-item-active-width`) — рабочий, но привязан к imperative измерениям. Альтернатива — чистый CSS с `::after` + `translateX` на основе `:focus-within` / `[aria-selected="true"]`, но для анимированного sliding indicator JS-подход оправдан. Нужен `ResizeObserver`.

### 4.2 Сложность контекста

`TabsContextType` содержит 7 полей (было 8 до удаления `tabs`), включая:
- `registerTab` — императивная регистрация через effect (smell)
- `tabsRef` — mutable ref массив, расшаренный через context
- `inlineStyles` — стили индикатора

**Целевой контекст** (после Phase 2–3):
```tsx
type TabsContextType = {
    activeId: string;
    onSelect: (id: string) => void;
    orientation: 'horizontal' | 'vertical';
};
```

Indicator и keyboard navigation могут быть реализованы на уровне `TabList` без context.

### 4.3 Focus management

Текущий подход: каждый `Tab` регистрирует себя через `registerTab` (effect → Map → ref). Навигация через `focusNextTab`/`focusPrevTab` в контексте.

**Проблемы:**
- Map ordering не гарантирует визуальный порядок в edge cases
- Disabled tab пропуск без guard от infinite loop
- Tight coupling между Tab и Tabs через context

**Лучше:** focus management на уровне `TabList` через roving tabindex. `TabList` владеет refs своих children, навигация — через DOM querySelectorAll(`[role="tab"]:not([disabled])`).

### 4.4 Общая оценка (после Phase 0)

| Аспект | Было | Сейчас | Комментарий |
|---|---|---|---|
| ARIA roles/states | 6/10 | 6/10 | Без изменений — Phase 1 |
| Keyboard navigation | 5/10 | 5/10 | Без изменений — Phase 1 |
| Controlled/Uncontrolled | 3/10 | 3/10 | Без изменений — Phase 2 |
| Code complexity | 4/10 | **6/10** | Один code path, удалено ~160 строк |
| Indicator | 5/10 | 5/10 | Без изменений — Phase 3 |
| CSS | 4/10 | 4/10 | Без изменений — Phase 3 |
| Type safety | 6/10 | **7/10** | Простой тип без union-дискриминатора |
| Extensibility | 5/10 | **6/10** | Чистый compound component без data-path |

---

## 5. План рефакторинга

### Phase 0 — Remove data API ✅ DONE

- [x] Удалить data-driven API (`tabList`/`panelList` props)
- [x] Удалить типы `TabsPropsWithChildren`, `TabsPropsWithLists`
- [x] Удалить `hasChildren` type guard
- [x] Упростить инициализацию `activeId` (один code path)
- [x] Упростить ref-регистрацию в `Tab` (один code path)
- [x] Убрать поле `tabs` из context
- [x] Обновить stories (composition-only)
- [x] Storybook build passing

### Phase 1 — Accessibility (критично)

- [ ] Добавить `Home`/`End` keyboard support
- [ ] Добавить `ArrowUp`/`ArrowDown` для vertical orientation
- [ ] Добавить `aria-orientation` на tablist
- [ ] Добавить `aria-label` prop для tablist
- [ ] Добавить `tabindex="0"` на tabpanel когда нет фокусируемого контента
- [ ] Убрать явную обработку Enter/Space — полагаться на нативный button click
- [ ] Добавить `event.stopPropagation()` для обработанных клавиш
- [ ] Добавить infinite loop guard в навигацию по disabled табам
- [ ] Улучшить focus ring (2px solid, forced-colors support)

### Phase 2 — API & State

- [ ] Добавить controlled/uncontrolled: `activeId`, `defaultActiveId`, `onActiveIdChange`
- [ ] Удалить `cloneElement` из PanelList
- [ ] Удалить зависимость от `createElementTypeGuard` / `displayName`
- [ ] Упростить context до минимума (`activeId`, `onSelect`, `orientation`)

### Phase 3 — Architecture

- [ ] Перенести keyboard navigation в `TabList` (roving tabindex через DOM)
- [ ] Заменить dual ref system на единую систему
- [ ] Добавить `ResizeObserver` в indicator hook
- [ ] Перевести CSS на дизайн-токены
- [ ] Перевести CSS на SCSS (consistency с остальными компонентами)

### Phase 4 — DX

- [ ] Обновить stories для всех сценариев
- [ ] Добавить story для controlled mode
- [ ] Добавить story для vertical + keyboard
- [ ] Добавить E2E тесты (keyboard navigation, ARIA states)

---

## 6. Target API (после всех фаз)

```tsx
// Единственный способ использования — composition
<Tabs defaultActiveId="profile" onActiveIdChange={handleChange}>
    <Tabs.TabList aria-label="User settings">
        <Tabs.Tab id="profile">Profile</Tabs.Tab>
        <Tabs.Tab id="security">Security</Tabs.Tab>
        <Tabs.Tab id="billing" disabled>Billing</Tabs.Tab>
    </Tabs.TabList>
    <Tabs.PanelList>
        <Tabs.Panel id="profile">
            <ProfileSettings />
        </Tabs.Panel>
        <Tabs.Panel id="security">
            <SecuritySettings />
        </Tabs.Panel>
        <Tabs.Panel id="billing">
            <BillingSettings />
        </Tabs.Panel>
    </Tabs.PanelList>
</Tabs>

// Controlled
<Tabs activeId={tab} onActiveIdChange={setTab}>
    ...
</Tabs>

// Vertical
<Tabs defaultActiveId="1">
    <Tabs.TabList aria-label="..." orientation="vertical">
        ...
    </Tabs.TabList>
    ...
</Tabs>
```

**Изменения в API (ещё не реализованы):**
- `label` prop удален из `Tab` — children вместо label (гибкость: иконки, badges)
- `isDisabled` → `disabled` (consistency с нативным HTML)
- `aria-label` обязателен на `TabList` (через типы)
- `defaultActiveId` / `activeId` / `onActiveIdChange` — стандартный controlled/uncontrolled
