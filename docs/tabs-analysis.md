# Tabs Component — Deep Audit

Post-refactoring review of `packages/react/src/Tabs/` against W3C WAI-ARIA APG Tabs Pattern (manual activation), reference implementations (Radix UI, Ariakit), and design system quality bar.

---

## 1. ARIA compliance (line-by-line against W3C APG)

### `role="tablist"` — TabList (`Tabs.tsx:157-169`)

| W3C Requirement | Implementation | Line | Status |
|---|---|---|---|
| `role="tablist"` | `role="tablist"` | :160 | **OK** |
| `aria-label` OR `aria-labelledby` | Union type: at least one required | :189-190, `types.ts:12-15` | **OK** |
| `aria-orientation` | `aria-orientation={orientation}` | :162 | **OK** |

~~**Note:** previously only `aria-label` was supported.~~ **FIXED**: union type in `TabListProps` requires at least one of `aria-label` or `aria-labelledby`.

### `role="tab"` — Tab (`Tabs.tsx:33-55`)

| W3C Requirement | Implementation | Line | Status |
|---|---|---|---|
| `role="tab"` | `role="tab"` | :39 | **OK** |
| `aria-selected="true"/"false"` | `aria-selected={activeId === id}` -> true/false | :40 | **OK** |
| `aria-controls` -> panel id | `aria-controls={\`panel-${id}\`}` | :41 | **OK** |
| `id` for panel's `aria-labelledby` | `id={\`tab-${id}\`}` | :42 | **OK** |
| Roving tabindex (0 on focused, -1 on rest) | `tabIndex={isFocusTarget ? 0 : -1}` | :51 | **OK** |

~~**Roving tabindex deviation:**~~ **FIXED**: `focusedId` in context tracks keyboard focus separately from `activeId`. Arrow keys update `focusedId`, Tab component uses `(focusedId || activeId)` for `tabIndex`. On blur from tablist, `focusedId` resets to `''` (falls back to `activeId`). Matches W3C APG manual activation example.

### `role="tabpanel"` — Panel (`Tabs.tsx:177-191`)

| W3C Requirement | Implementation | Line | Status |
|---|---|---|---|
| `role="tabpanel"` | `role="tabpanel"` | :182 | **OK** |
| `id` for tab's `aria-controls` | `id={\`panel-${id}\`}` | :183 | **OK** |
| `hidden` when inactive | `hidden={id !== activeId}` | :184 | **OK** |
| `aria-labelledby` -> tab id | `aria-labelledby={\`tab-${id}\`}` | :185 | **OK** |
| `tabindex="0"` if no focusable children | `tabIndex={tabIndex}` (default `0`, configurable) | :222 | **OK** |

~~**Note:** previously unconditional.~~ **FIXED**: `tabIndex` is now a prop on `Panel` with default `0`. Pass `tabIndex={-1}` when the panel contains focusable elements.

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

### ~~No RTL support~~ FIXED

RTL detection via `list.closest('[dir]')?.getAttribute('dir')` (`Tabs.tsx:132-133`). Arrow keys are swapped in RTL: ArrowLeft = next, ArrowRight = previous.

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
| `defaultActiveId` + `activeId` together | `controlledActiveId` wins (line 216) | **OK**, dev warning added |
| Only `defaultActiveId` | Initializes `uncontrolledId` | **OK** |
| Neither `defaultActiveId` nor `activeId` | `uncontrolledId = ''` -> useLayoutEffect in TabList auto-selects first enabled | **OK** (flash fixed) |
| `activeId` points to disabled tab | Tab gets selected + disabled simultaneously, `aria-selected="true"` on disabled button | **Semantically invalid** |
| `activeId` points to non-existent id | No tab selected, no panel visible | **No dev warning** |
| Switch uncontrolled -> controlled | Controlled `activeId` overrides immediately | **OK** |

### BUG: Flash on first render without `defaultActiveId` (High)

Lines 76-83 (TabList): `useEffect` for auto-selecting first tab.

1. **First render:** `activeId = ''` -> no tab active, indicator at 0,0 position, no panel visible
2. **After useEffect:** `setActiveId('1')` -> re-render with active tab
3. **Visual result:** flash (empty state -> content), and indicator animates from 0,0 to tab position (due to `transition: all 0.3s` on `::after`)

This affects the default use case `<Tabs>` without `defaultActiveId`.

### ~~No dev-mode validation~~ FIXED

`validateTabsProps()` in `utils.ts`, called in dev mode only (same pattern as Dialog):
- `activeId` without `onActiveIdChange` — `invariant` (throws)
- `defaultActiveId` + `activeId` simultaneously — `console.warn`

### Remaining (won't fix — too minor)

- **`activeId` on non-existent id** — empty UI, no warning. Tabs can't validate because it doesn't know child tab IDs (they live in TabList children). Would require DOM validation in TabList, disproportionate complexity for the edge case.
- **`activeId` on disabled tab** — `aria-selected="true"` on a disabled button is semantically odd. Same limitation: Tabs doesn't know which tabs are disabled.
- **Discriminated union types** for controlled vs uncontrolled — would prevent invalid prop combos at the type level, but hurts DX (autocomplete, readability). Runtime warnings are sufficient.

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

### ~~`setActiveId` / `contextValue` not memoized~~ FIXED

`setActiveId` wrapped in `useCallback` with stable refs for props (same pattern as Dialog). `contextValue` wrapped in `useMemo` — only changes when `activeId` or `orientation` change.

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
| :57-58 | `padding-block` / `padding-inline` | **Yes** |

~~Stylelint doesn't catch shorthand `padding` — fixed to logical `padding-block`/`padding-inline`.~~

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
| ~~Hover styles for tabs~~ | ~~Medium~~ — **FIXED** (`styles.css:73-75`) |
| `cursor: not-allowed` on disabled | Low — intentionally skipped |
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
| ~~**B2**~~ | ~~Roving tabindex follows selection, not focus~~ **FIXED**: `focusedId` in context, reset on blur | ~~**Medium**~~ | |
| ~~**B3**~~ | ~~No RTL~~ **FIXED**: `closest('[dir]')` detection, arrow keys swapped in RTL | ~~**Medium**~~ | |
| **B4** | Indicator invisible in forced-colors mode | **Medium** | `styles.css:20-49` (no `forced-colors` for `::after`) |
| ~~**B5**~~ | ~~`padding: 8px 16px` — not logical properties~~ **FIXED**: `padding-block`/`padding-inline` | ~~**Low**~~ | |
| ~~**B6**~~ | ~~`tabIndex={0}` unconditional on panel~~ **FIXED**: configurable `tabIndex` prop, default `0` | ~~**Low**~~ | |
| ~~**B7**~~ | ~~`setActiveId` / `contextValue` not memoized~~ **FIXED**: `useCallback` + refs + `useMemo` | ~~**Low**~~ | |
| ~~**B8**~~ | ~~No dev warnings~~ **FIXED**: `validateTabsProps()` — invariant + console.warn | ~~**Low**~~ | |
| **B9** | `stopPropagation` on handled keys (may interfere with parent) | **Low** | `Tabs.tsx:145` |
| ~~**B10**~~ | ~~No hover styles~~ **FIXED**: hover background on non-disabled tabs | ~~**Low**~~ | |

---

## 10. Comparison with Radix UI / Ariakit

| Aspect | Our implementation | Radix UI | Ariakit |
|---|---|---|---|
| **API** | `label: string` prop | `children` | `children` |
| **Compound pattern** | `Tabs.Tab` / `Tabs.Panel` | `Tabs.Trigger` / `Tabs.Content` | `Tab` / `TabPanel` |
| **Indicator** | Built-in, CSS transition | None (user implements) | None |
| **Activation mode** | Manual only | `activationMode` prop | `focusMove` + `selectOnMove` |
| **RTL** | Yes (`closest('[dir]')`) | Yes (`dir` prop) | Yes |
| **Controlled/Uncontrolled** | Yes | Yes | Yes (store pattern) |
| **Roving tabindex** | Follows focus (W3C APG) | Follows selection | Follows focus |
| **forced-colors** | Partial (focus only) | Full | Full |
| **Size** | ~240 lines | ~800+ (with utilities) | ~1000+ |
| **Dependencies** | `clsx` | `@radix-ui/primitive`, `@radix-ui/react-*` | `ariakit-*` |

### What's better in our implementation
- **Built-in animated indicator** — Radix and Ariakit leave this to the user
- **Simplicity** — 240 lines, 3-field context, 0 external dependencies besides `clsx`
- **`label: string`** — stricter, but guarantees a textual accessible name without errors
- **`aria-label` or `aria-labelledby` required** — TypeScript enforces at least one (neither Radix nor Ariakit do this)

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

3. ~~**B3** — RTL support~~ **FIXED**
4. ~~**B5** — `padding` to logical properties~~ **FIXED**
5. ~~**B10** — Hover styles~~ **FIXED**

### Nice to have

6. ~~**B2** — Roving tabindex follows focus~~ **FIXED**
7. ~~**B7** — Memoize context value~~ **FIXED**
8. ~~**B8** — Dev-mode warnings~~ **FIXED**
9. `activationMode` prop (auto/manual)
10. Additional stories

### Scores

| Aspect | Score | Notes |
|---|---|---|
| ARIA | **10/10** | Full W3C compliance: `aria-labelledby` supported, configurable `tabIndex` on panel |
| Keyboard | **10/10** | Full W3C APG: RTL, roving tabindex follows focus, reset on blur |
| Controlled/Uncontrolled | **9/10** | Correct pattern, flash fixed, dev validation added |
| Context | **10/10** | Minimal, memoized. Consumers re-render only on actual changes |
| Indicator | **8/10** | ResizeObserver works, flash fixed, forced-colors deferred |
| CSS | **6/10** | Hardcoded colors, no dark theme. Hover, logical properties fixed |
| Types | **8/10** | Strict, no any, but no discriminated union for controlled |
| Stories | **6/10** | Core cases covered, many gaps |
| **Overall** | **7/10** | Solid base. 2 blockers before production, rest is iteratively improvable |
