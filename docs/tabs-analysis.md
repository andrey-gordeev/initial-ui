# Tabs Component — Deep Analysis

## Context

Analysis of `packages/react/src/Tabs/` against:
- W3C WAI-ARIA APG Tabs Pattern (manual activation)
- Dual API approach (data + composition) — comparison with RadioGroup
- Architecture for a design system base (copy-paste, Mid+, restricted interface, strong foundation)

---

## 1. Accessibility — remaining issues

### 1.1 Missing ARIA attributes

| Attribute | Element | Requirement | Status |
|---|---|---|---|
| `aria-orientation` | `[role="tablist"]` | Required for vertical, default = `"horizontal"` | **Done** |
| `aria-label` / `aria-labelledby` | `[role="tablist"]` | One of the two is required | **Done** (required prop) |
| `tabindex="0"` | `[role="tabpanel"]` | When first element inside panel is not focusable | **Done** (always set) |

### 1.2 Keyboard navigation

| Key | Spec | Status |
|---|---|---|
| `Home` | Focus first tab | **Done** |
| `End` | Focus last tab | **Done** |
| `ArrowUp` (vertical) | Same as `ArrowLeft` when `aria-orientation="vertical"` | **Done** |
| `ArrowDown` (vertical) | Same as `ArrowRight` when `aria-orientation="vertical"` | **Done** |
| `Enter` / `Space` | Native button click (no explicit handler) | **Done** |
| `event.stopPropagation()` | Called for all handled keys | **Done** |

### 1.3 Style issues

- ~~`outline: 1px dotted blue` — weak focus ring~~ **Done**: 2px solid + forced-colors media query
- Hardcoded colors (`#000`, `#999`, `rgb(79, 70, 229)`) instead of design tokens — Phase 3
- W3C recommends separate visual indication for focus vs selection

---

## 2. Controlled / Uncontrolled

### Current state ✅ DONE

Standard controlled/uncontrolled pattern implemented:
- `defaultActiveId` — uncontrolled with initial value
- `activeId` + `onActiveIdChange` — fully controlled
- No props — auto-init first enabled tab (backwards compatible)

### Required for design system base

| Scenario | Mode |
|---|---|
| Simple out-of-the-box tabs | Uncontrolled with `defaultActiveId` |
| URL sync (`?tab=settings`) | Controlled |
| Conditional logic ("show tab if...") | Controlled |
| Analytics / tracking | `onChange` callback |

### Recommended pattern

```tsx
type TabsProps = {
    defaultActiveId?: string;   // uncontrolled
    activeId?: string;          // controlled
    onActiveIdChange?: (id: string) => void;
};
```

Internal implementation:
```tsx
const [uncontrolledId, setUncontrolledId] = useState(defaultActiveId ?? firstEnabledId);
const currentId = activeId ?? uncontrolledId;
const handleChange = (id: string) => {
    if (activeId === undefined) setUncontrolledId(id);
    onActiveIdChange?.(id);
};
```

This pattern is already used in `Dialog` — consistency.

---

## 3. Dual API: Data + Composition ✅ DONE (Phase 0)

> **Decision: removed data-driven API, composition-only.**

Removed `tabList`/`panelList` props, `TabsPropsWithLists`, `TabsPropsWithChildren`, `hasChildren` guard, dual `activeId` initialization, dual ref registration, data-driven render path. ~400 → ~240 lines, one code path.

---

## 4. Architecture simplification ✅ DONE (Phase 0.5)

### What changed

**Panel reads context directly:**
- `PanelList` component removed entirely
- `Panel` reads `activeId` from context, decides its own `hidden` state
- Removed: `cloneElement`, `Children.map`, `createElementTypeGuard` dependency

**Keyboard + indicator moved to TabList:**
- TabList handles keyboard navigation via DOM (`querySelectorAll('[role="tab"]:not([disabled])')`)
- TabList measures active tab position via `querySelector('[aria-selected="true"]')`
- Removed from Tabs: `registerTab`, `focusNextTab`, `focusPrevTab`, `tabsRefs` Map, `disabledTabs` Set, `tabsRef` array, `inlineStyles`
- Removed `useElementSize` hook + `hooks/` directory
- Tab component: ~70 → ~25 lines, zero `useEffect`s

**orientation moved from TabList to Tabs:**
- `orientation` is a property of the entire tabbed interface
- Passed via context — TabList uses it for CSS/ARIA, keyboard handler uses it for arrow key direction
- `aria-orientation` attribute now set on tablist element

**Context:** 7 fields → 3 (`activeId`, `setActiveId`, `orientation`)

**No React.FC** — callable type signature for compound component type.

### Current scores

| Aspect | Original | After Phase 0 | After Phase 0.5 | Notes |
|---|---|---|---|---|
| ARIA roles/states | 6/10 | 6/10 | **10/10** | All required attributes in place |
| Keyboard navigation | 5/10 | 5/10 | **9/10** | Home/End, ArrowUp/Down, stopPropagation, native Enter/Space |
| Controlled/Uncontrolled | 3/10 | 3/10 | **9/10** | defaultActiveId, activeId, onActiveIdChange |
| Code complexity | 4/10 | 6/10 | **9/10** | 3-field context, no registration, no cloneElement |
| Indicator | 5/10 | 5/10 | **6/10** | Simpler (DOM query), still no ResizeObserver |
| CSS | 4/10 | 4/10 | 4/10 | Still hardcoded — Phase 3 |
| Type safety | 6/10 | 7/10 | **8/10** | Clean types, no displayName guard |
| Extensibility | 5/10 | 6/10 | **8/10** | Minimal context, thin Tab, easy to extend |

---

## 5. Refactoring plan

### Phase 0 — Remove data API ✅ DONE

- [x] Remove data-driven API (`tabList`/`panelList` props)
- [x] Remove types `TabsPropsWithChildren`, `TabsPropsWithLists`
- [x] Remove `hasChildren` type guard
- [x] Simplify `activeId` initialization (one code path)
- [x] Simplify ref registration in `Tab` (one code path)
- [x] Remove `tabs` field from context
- [x] Update stories (composition-only)
- [x] Storybook build passing

### Phase 0.5 — Architecture simplification ✅ DONE

- [x] Panel reads context directly (removes `cloneElement`, `displayName` guard)
- [x] Remove `PanelList` component
- [x] Move keyboard navigation to TabList (DOM-based, no registration)
- [x] Move indicator positioning to TabList
- [x] Move `orientation` from TabList to Tabs (via context)
- [x] Remove imperative registration system (`registerTab`, refs, Maps, Sets)
- [x] Remove `useElementSize` hook
- [x] Add `aria-orientation` on tablist
- [x] Add `Home`/`End` keyboard support
- [x] Add `ArrowUp`/`ArrowDown` for vertical orientation
- [x] Native button click for Enter/Space (no explicit handler)
- [x] Add `event.stopPropagation()` for handled keys
- [x] Replace `React.FC` with callable type signature
- [x] Storybook build passing

### Phase 1 — Remaining accessibility ✅ DONE

- [x] Add `aria-label` prop for tablist (required, via `Required<Pick<AriaAttributes>>`)
- [x] Add `tabindex="0"` on tabpanel for keyboard focusability
- [x] Improve focus ring (2px solid, forced-colors support)

### Phase 2 — Controlled / Uncontrolled ✅ DONE

- [x] Add `defaultActiveId`, `activeId`, `onActiveIdChange`
- [x] Add stories: `defaultActiveId`, controlled with external state
- [x] Update argTypes for new props

### Phase 3 — CSS & tokens

- [ ] Add `ResizeObserver` to indicator
- [ ] Replace hardcoded colors with design tokens
- [ ] Convert CSS to SCSS (consistency with other components)

### Phase 4 — DX

- [x] Update stories for all scenarios
- [x] Add story for controlled mode
- [ ] Add story for vertical + keyboard
- [ ] Add E2E tests (keyboard navigation, ARIA states)

---

## 6. Target API (after all phases)

```tsx
// Composition-only API
<Tabs defaultActiveId="profile" onActiveIdChange={handleChange}>
    <Tabs.TabList aria-label="User settings">
        <Tabs.Tab id="profile">Profile</Tabs.Tab>
        <Tabs.Tab id="security">Security</Tabs.Tab>
        <Tabs.Tab id="billing" disabled>Billing</Tabs.Tab>
    </Tabs.TabList>
    <Tabs.Panel id="profile">
        <ProfileSettings />
    </Tabs.Panel>
    <Tabs.Panel id="security">
        <SecuritySettings />
    </Tabs.Panel>
    <Tabs.Panel id="billing">
        <BillingSettings />
    </Tabs.Panel>
</Tabs>

// Controlled
<Tabs activeId={tab} onActiveIdChange={setTab}>
    ...
</Tabs>

// Vertical
<Tabs orientation="vertical" defaultActiveId="1">
    <Tabs.TabList aria-label="...">
        ...
    </Tabs.TabList>
    ...
</Tabs>
```

**API changes not yet implemented:**
- `label` prop removed from `Tab` — children instead (flexibility: icons, badges)
- `isDisabled` → `disabled` (consistency with native HTML)
