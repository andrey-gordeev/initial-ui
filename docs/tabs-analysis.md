# Tabs Component — Deep Audit

Post-refactoring review of `packages/react/src/Tabs/` against W3C WAI-ARIA APG Tabs Pattern (manual activation), reference implementations (Radix UI, Ariakit), and design system quality bar.

---

## 1. ARIA compliance (line-by-line against W3C APG)

### `role="tablist"` — TabList (`Tabs.tsx:157-169`)

| W3C Requirement | Implementation | Line | Status |
|---|---|---|---|
| `role="tablist"` | `role="tablist"` | :160 | **OK** |
| `aria-label` OR `aria-labelledby` | Only `aria-label` (Required in types) | :161, `types.ts:12` | **Partial** |
| `aria-orientation` | `aria-orientation={orientation}` | :162 | **OK** |

**Note:** W3C allows `aria-labelledby` as an alternative to `aria-label`. The type `Required<Pick<AriaAttributes, 'aria-label'>>` prevents using `aria-labelledby` instead. For a design system component this is a limitation — there are cases where a visible heading already exists and `aria-labelledby` is the correct approach.

### `role="tab"` — Tab (`Tabs.tsx:33-55`)

| W3C Requirement | Implementation | Line | Status |
|---|---|---|---|
| `role="tab"` | `role="tab"` | :39 | **OK** |
| `aria-selected="true"/"false"` | `aria-selected={activeId === id}` -> true/false | :40 | **OK** |
| `aria-controls` -> panel id | `aria-controls={\`panel-${id}\`}` | :41 | **OK** |
| `id` for panel's `aria-labelledby` | `id={\`tab-${id}\`}` | :42 | **OK** |
| Roving tabindex (0 on active, -1 on rest) | `tabIndex={activeId === id ? 0 : -1}` | :44 | **Deviation** (see below) |

**Roving tabindex deviation (Medium):** `tabIndex` is tied to `activeId` (selected tab), not the last focused tab. Per W3C APG manual activation example, when arrow keys move focus, `tabindex=0` should follow focus, not selection. Scenario:

1. Tab A is active (`tabindex=0`), user arrows to Tab C
2. Tab C receives `.focus()` but `tabindex` stays `-1`
3. User presses Tab -> focus leaves the tablist
4. Shift+Tab -> focus returns to Tab A (not Tab C where user navigated)

Radix UI follows the same approach (tabindex tracks selection), but this deviates from the letter of W3C APG.

### `role="tabpanel"` — Panel (`Tabs.tsx:177-191`)

| W3C Requirement | Implementation | Line | Status |
|---|---|---|---|
| `role="tabpanel"` | `role="tabpanel"` | :182 | **OK** |
| `id` for tab's `aria-controls` | `id={\`panel-${id}\`}` | :183 | **OK** |
| `hidden` when inactive | `hidden={id !== activeId}` | :184 | **OK** |
| `aria-labelledby` -> tab id | `aria-labelledby={\`tab-${id}\`}` | :185 | **OK** |
| `tabindex="0"` if no focusable children | `tabIndex={0}` (unconditional) | :186 | **Excessive** |

**Note (Low):** `tabIndex={0}` is set unconditionally. W3C recommends it only when the panel has no focusable children. If the panel contains buttons/links, the extra tab stop hurts navigation. Radix/Ariakit also use unconditional `tabIndex={0}` — acceptable compromise.

---

## 2. Keyboard navigation (`Tabs.tsx:113-148`)

| Key | W3C Spec | Implementation | Status |
|---|---|---|---|
| ArrowRight (horiz) / ArrowDown (vert) | Next tab | :129-130, wrap-around `% tabs.length` | **OK** |
| ArrowLeft (horiz) / ArrowUp (vert) | Previous tab | :131-133, wrap-around | **OK** |
| Home | First tab | :134-135 | **OK** |
| End | Last tab | :137-138 | **OK** |
| Enter / Space | Activate tab (manual) | Native `<button>` behavior | **OK** |
| Tab / Shift+Tab | Enter/leave tablist | Roving tabindex | **OK** (with caveat from section 1) |
| Disabled tabs skipped | `:not([disabled])` in querySelectorAll | :118-120 | **OK** |

### No RTL support (Medium)

Lines 128-133: `ArrowRight` always means "next", `ArrowLeft` always means "previous". In RTL layouts the semantics must invert: Arrow**Right** should be "previous" (visually left in RTL). W3C APG doesn't specify this explicitly, but all reference implementations (Radix, Ariakit, Adobe React Aria) reverse arrows in RTL.

### `stopPropagation` (Low)

Line 145: `e.stopPropagation()` on all handled keys. W3C doesn't require this. May break parent components listening for these keys. `e.preventDefault()` alone is sufficient.

---

## 3. Controlled / Uncontrolled (`Tabs.tsx:206-234`)

### Pattern

```
Tabs.tsx:213  const [uncontrolledId, setUncontrolledId] = useState(defaultActiveId ?? '');
Tabs.tsx:216  const activeId = controlledActiveId ?? uncontrolledId;
Tabs.tsx:218  const setActiveId = (id: string) => {
Tabs.tsx:219      if (controlledActiveId === undefined) setUncontrolledId(id);
Tabs.tsx:220      onActiveIdChange?.(id);
Tabs.tsx:221  };
```

Consistent with Dialog (`Dialog.tsx:31-36`). Core logic is correct.

### Edge cases

| Scenario | Behavior | Assessment |
|---|---|---|
| `defaultActiveId` + `activeId` together | `controlledActiveId` wins (line 216) | **OK**, but no dev warning |
| Only `defaultActiveId` | Initializes `uncontrolledId` | **OK** |
| Neither `defaultActiveId` nor `activeId` | `uncontrolledId = ''` -> useEffect in TabList auto-selects first enabled | **Bug** (see below) |
| `activeId` points to disabled tab | Tab gets selected + disabled simultaneously, `aria-selected="true"` on disabled button | **Semantically invalid** |
| `activeId` points to non-existent id | No tab selected, no panel visible | **No dev warning** |
| Switch uncontrolled -> controlled | Controlled `activeId` overrides immediately | **OK** |

### BUG: Flash on first render without `defaultActiveId` (High)

Lines 76-83 (TabList): `useEffect` for auto-selecting first tab.

1. **First render:** `activeId = ''` -> no tab active, indicator at 0,0 position, no panel visible
2. **After useEffect:** `setActiveId('1')` -> re-render with active tab
3. **Visual result:** flash (empty state -> content), and indicator animates from 0,0 to tab position (due to `transition: all 0.3s` on `::after`)

This affects the default use case `<Tabs>` without `defaultActiveId`.

### No dev-mode validation (Low)

Dialog uses `validateDialogProps()` (`Dialog.tsx:27-29`). Tabs doesn't validate:
- `defaultActiveId` + `activeId` simultaneously
- `activeId` without `onActiveIdChange` (read-only, no way to change)
- Non-existent `activeId`

---

## 4. Context (`Tabs.tsx:16-28`)

```tsx
interface TabsContextType {
    activeId: string;
    setActiveId: (id: string) => void;
    orientation: 'horizontal' | 'vertical';
}
```

**3 fields — minimal.** Down from 7 in the original. Excellent.

### `setActiveId` / `contextValue` not memoized (Low)

Lines 218-221: `setActiveId` is a new function every render. Lines 223-227: `contextValue` is a new object every render. All context consumers re-render on every Tabs render. Negligible for 3-10 tabs, but for a design system base worth wrapping `setActiveId` in `useCallback` and `contextValue` in `useMemo`.

---

## 5. Indicator (`Tabs.tsx:86-110`)

### Mechanism
`querySelector('[aria-selected="true"]')` -> `offsetTop/Left/Width/Height` -> CSS variables -> `::after` with `transition`.

### ResizeObserver (`Tabs.tsx:104-110`)
Observes the `list` element. Recalculates indicator on resize (window resize, zoom, font change). Correctly disconnects in cleanup.

### Edge cases

| Scenario | Behavior | Assessment |
|---|---|---|
| 0 tabs | `querySelector` -> null, early return | **OK** |
| All disabled, no active | `querySelector('[aria-selected="true"]')` -> null | **OK**, but indicator stays at last position |
| Dynamic tab addition | ResizeObserver catches list resize -> recalc | **OK** |
| Active tab removed | `activeId` still points to removed id -> querySelector null -> indicator not updated | **Bug in uncontrolled mode** |
| Tab text change (i18n) | Tab resizes -> list resizes -> ResizeObserver fires | **OK** |

### ~~BUG: `transition: all` on initial render~~ FIXED

Fixed via three mechanisms:
1. `useLayoutEffect` for auto-init (`Tabs.tsx:78`) — sets `activeId` before paint, preventing content flash
2. `useLayoutEffect` for indicator update (`Tabs.tsx:101`) — calculates position before paint
3. `isAnimated` state + `requestAnimationFrame` (`Tabs.tsx:106-109`) — CSS class `tab-list--animated` is added only after browser paints the initial position, so `transition` never fires on mount
4. CSS: `transition` moved from `::after` to `.tab-list--animated::after` (`styles.css:26-28`)

---

## 6. CSS (`styles.css`)

### Logical properties

| Line | Property | Logical? |
|---|---|---|
| :28 | `border-block-end` | **Yes** |
| :31 | `inset-inline-start` | **Yes** |
| :32 | `inset-block-end` | **Yes** |
| :33 | `inline-size` | **Yes** |
| :34 | `block-size` | **Yes** |
| :41 | `border-inline-end` | **Yes** |
| :44 | `inset-inline-end` | **Yes** |
| :45 | `inset-block-start` | **Yes** |
| **:54** | **`padding: 8px 16px`** | **No** — should be `padding-block: 8px; padding-inline: 16px;` |

Stylelint doesn't catch this (verified), but CLAUDE.md mandates logical CSS properties.

### Forced colors

Lines 62-66: `:focus-visible` is handled (`outline: 2px solid LinkText`). But the **indicator** (`::after` with `background-color`) is completely invisible in forced-colors mode. Needs:
```css
@media (forced-colors: active) {
    .tab-list::after {
        background-color: LinkText;
    }
}
```

### Hardcoded colors
`#000`, `#999`, `rgb(79, 70, 229)`, `rgb(99, 102, 241)`, `rgb(229, 231, 235)` — all without tokens. The project has `--iui-color-*` and `--iui-spacing-*` tokens. Blocks dark theme support.

### Missing

| What | Importance |
|---|---|
| Hover styles for tabs | Medium — no visual feedback on hover |
| `cursor: pointer` on tabs (after `all: unset`) | Low |
| `cursor: not-allowed` on disabled | Low |
| Dark theme (`[data-theme="dark"]`) | Blocked by hardcoded colors |

---

## 7. Types (`types.ts`)

| Aspect | Assessment |
|---|---|
| No `any` | **OK** |
| `as CSSProperties` (Tabs.tsx:155) | Standard for CSS vars, only cast in the file |
| `Ref<HTMLButtonElement>` — new React ref pattern (no forwardRef) | **OK** |
| `Required<Pick<AriaAttributes, 'aria-label'>>` | **Strict**, but excludes `aria-labelledby` |
| No `className` / `style` props | **Intentional** for DS — correct |
| No `constants.ts` | **Deviation from pattern** — CLAUDE.md describes `constants.ts` with enums and `*_TO_CLASS_NAME_MAP`. Acceptable here since there are no variants to extract |

### No discriminated union for controlled vs uncontrolled

`TabsProps` allows any combination: `activeId` without `onActiveIdChange`, `defaultActiveId` + `activeId`, etc. Types don't prevent invalid combinations. Advanced DS libraries solve this with discriminated unions, but for current stage runtime dev warnings would be sufficient.

---

## 8. Stories (`Tabs.stories.tsx`)

### Coverage

| Scenario | Story | Status |
|---|---|---|
| Default (horizontal) | `Default` | **OK** |
| `defaultActiveId` | `DefaultActiveId` | **OK** |
| Controlled mode | `Controlled` | **OK** |
| Vertical | `Vertical` | **OK** |
| Disabled tab | Included in `Default` template | **OK** |

### Missing

| Scenario | Importance |
|---|---|
| All tabs disabled | Medium |
| Dynamic tabs (add/remove) | Medium |
| Many tabs (overflow) | Medium |
| No `defaultActiveId` (auto-select first) | Medium — most common use case not shown |
| Vertical + keyboard + disabled | Low |
| Nested tabs (tabs inside panel) | Low |
| Long label | Low |
| Controlled with invalid `activeId` | Low |

---

## 9. Bugs and edge cases (summary)

| # | Issue | Severity | Lines |
|---|---|---|---|
| ~~**B1**~~ | ~~Flash without `defaultActiveId`~~ **FIXED**: `useLayoutEffect` for auto-init + indicator, `requestAnimationFrame` for deferred animation enable | ~~**High**~~ | |
| **B2** | Roving tabindex follows selection, not focus (deviation from W3C manual activation) | **Medium** | `Tabs.tsx:44` |
| **B3** | No RTL: ArrowRight always = "next" | **Medium** | `Tabs.tsx:128-133` |
| **B4** | Indicator invisible in forced-colors mode | **Medium** | `styles.css:20-49` (no `forced-colors` for `::after`) |
| **B5** | `padding: 8px 16px` — not logical properties | **Low** | `styles.css:54` |
| **B6** | `tabIndex={0}` unconditional on panel | **Low** | `Tabs.tsx:186` |
| **B7** | `setActiveId` / `contextValue` not memoized | **Low** | `Tabs.tsx:218-227` |
| **B8** | No dev warnings (prop conflicts, non-existent id) | **Low** | `Tabs.tsx:206-234` |
| **B9** | `stopPropagation` on handled keys (may interfere with parent) | **Low** | `Tabs.tsx:145` |
| **B10** | No hover styles | **Low** | `styles.css:52-67` |

---

## 10. Comparison with Radix UI / Ariakit

| Aspect | Our implementation | Radix UI | Ariakit |
|---|---|---|---|
| **API** | `label: string` prop | `children` | `children` |
| **Compound pattern** | `Tabs.Tab` / `Tabs.Panel` | `Tabs.Trigger` / `Tabs.Content` | `Tab` / `TabPanel` |
| **Indicator** | Built-in, CSS transition | None (user implements) | None |
| **Activation mode** | Manual only | `activationMode` prop | `focusMove` + `selectOnMove` |
| **RTL** | No | Yes (`dir` prop) | Yes |
| **Controlled/Uncontrolled** | Yes | Yes | Yes (store pattern) |
| **Roving tabindex** | Follows selection | Follows selection | Follows focus |
| **forced-colors** | Partial (focus only) | Full | Full |
| **Size** | ~240 lines | ~800+ (with utilities) | ~1000+ |
| **Dependencies** | `clsx` | `@radix-ui/primitive`, `@radix-ui/react-*` | `ariakit-*` |

### What's better in our implementation
- **Built-in animated indicator** — Radix and Ariakit leave this to the user
- **Simplicity** — 240 lines, 3-field context, 0 external dependencies besides `clsx`
- **`label: string`** — stricter, but guarantees a textual accessible name without errors
- **`aria-label` required** — TypeScript won't let you forget (neither Radix nor Ariakit enforce this)

### What's worse
- **No RTL** — critical for internationalized products
- **No `activationMode`** — manual only, no auto
- ~~**Indicator flash**~~ — fixed
- **Incomplete forced-colors** — Radix and Ariakit handle it fully

---

## 11. Final assessment

### Ready as a design system base?

**Yes, with caveats.** Architecture is clean, ARIA coverage is nearly complete, controlled/uncontrolled works. The component is significantly better than before the refactoring.

### Must fix before production (blockers)

1. ~~**B1** — Flash without `defaultActiveId`.~~ **FIXED**
2. **B4** — Forced-colors on the indicator. Accessibility baseline (deferred — no final color decisions yet)

### Should fix before v1

3. **B3** — RTL support (check `dir` attribute, reverse arrow keys)
4. **B5** — `padding` to logical properties
5. **B10** — Hover styles

### Nice to have

6. **B2** — Roving tabindex follows focus (requires `focusedId` in state)
7. **B7** — Memoize context value
8. **B8** — Dev-mode warnings
9. `activationMode` prop (auto/manual)
10. Additional stories

### Scores

| Aspect | Score | Notes |
|---|---|---|
| ARIA | **8/10** | Nearly complete, but `aria-labelledby` not supported, unconditional `tabIndex={0}` |
| Keyboard | **7/10** | Full spec coverage, but no RTL, roving tabindex doesn't follow W3C |
| Controlled/Uncontrolled | **8/10** | Correct pattern, flash fixed, no dev warnings |
| Context | **9/10** | Minimal, clean. Memoization is nice to have |
| Indicator | **8/10** | ResizeObserver works, flash fixed, forced-colors deferred |
| CSS | **5/10** | Hardcoded colors, no hover, no dark theme, `padding` not logical |
| Types | **8/10** | Strict, no any, but no discriminated union for controlled |
| Stories | **6/10** | Core cases covered, many gaps |
| **Overall** | **7/10** | Solid base. 2 blockers before production, rest is iteratively improvable |
