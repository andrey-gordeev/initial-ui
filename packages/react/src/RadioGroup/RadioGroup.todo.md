# RadioGroup TODO

## Important

- [x] **Radio component missing `:focus-visible` — keyboard users have no focus indicator**
      `Radio.tsx` applies `all: unset` on `<input>` (removes native focus ring) but never re-adds a `:focus-visible` rule.
      In non-render-prop mode, `RadioGroup.Item` renders `<Radio>` directly, inheriting this gap.
      Render-prop mode is fine — `.radio-group-item:has(:focus-visible)` handles it.
      Added `:focus-visible` and `forced-colors` fallback to `Radio/styles.css`.

- [x] **Controlled/uncontrolled typing: allow both `value` and `defaultValue` simultaneously**
      Dialog uses a discriminated union (`DialogIsOpenProps`) that makes controlled and uncontrolled mutually exclusive at the type level.
      RadioGroup catches the conflict at runtime (`validateRadioGroupProps`), but TypeScript allows it.
      Added `RadioGroupValueProps` discriminated union (`RadioGroupControlledProps | Uncontrolled`).
      Runtime validation in `utils.ts` kept as safety net for JS consumers.

## Accessibility

- [x] **Missing `aria-required` support**
      Added `isRequired?: boolean` to `RadioGroupProps`. Renders `aria-required` on the container.

- [x] **Missing `aria-invalid` / `aria-errormessage` support**
      Added `isInvalid?: boolean` to `RadioGroupProps`. Renders `aria-invalid` on the container.
      Added `aria-errormessage` to `RadioGroupAriaAttributes` pick (flows through `...ariaProps`).

- [x] **Missing `aria-description` in allowed aria attributes**
      Added `aria-description` to `RadioGroupAriaAttributes` pick, consistent with Dialog.

- [x] **Visually hidden input: `position: absolute` without positioned ancestor causes scroll jumps**
      Added `position: relative` to `.radio-group-item`. Anchors the hidden input to its visual parent.

- [ ] **Native radio RTL arrow key behavior differs from ARIA APG spec**
      Known limitation. APG says Right Arrow = next, Left Arrow = previous, regardless of text direction.
      Browsers swap Left/Right for native `<input type="radio">` in RTL context.
      Fixing requires replacing native radio keyboard behavior with manual roving tabindex + custom `onKeyDown` (like Tabs does).
      Deferred until RTL support is required.

- [x] **Group-level `aria-disabled`**
      Added `isDisabled?: boolean` to `RadioGroupProps`. Renders `aria-disabled` on the container.
      Propagates to all Items via context — each Item merges `isGroupDisabled || isItemDisabled`.

- [x] **Forced-colors mode: selection and disabled states**
      Added forced-colors rules: selected items get `outline: 2px solid LinkText`, disabled items get `color: GrayText; opacity: 1`.

## Architecture

- [ ] **No `ref` forwarding on RadioGroup**
      Dialog exposes a ref via `useImperativeHandle`. RadioGroup provides no way to access the container `<div>`.
      Accept `ref?: Ref<HTMLDivElement>` and forward it to the container.
      Use cases: `.focus()`, `getBoundingClientRect()`, scroll-into-view.
      React 19+: `ref` is a regular prop — no `forwardRef` needed (Dialog already uses this pattern).

- [ ] **No `ref` forwarding on Item**
      No way for consumers to access the underlying `<input>` element (e.g., for imperative `.focus()`).
      Accept `ref?: Ref<HTMLInputElement>` on `ItemProps` and forward it to the `<input>`.
      React 19+: just add `ref` to props destructuring, pass to `<input ref={ref}>`.
      Requires handling both render-prop path and Radio fallback path (pass ref through to `<Radio>`).

- [ ] **No `className` or `style` on RadioGroup or Item**
      Other components in the library accept these for layout adjustments.
      Add `className?: string` and `style?: CSSProperties` to both `RadioGroupProps` and `ItemProps`.
      RadioGroup: merge with `clsx('radio-group', className)` on the container div.
      Item: merge with `clsx('radio-group-item', className)` on the wrapper.
      Use cases: margins/grid placement on group (`className="my-form-row"`), custom spacing (`style={{ gap: '12px' }}`), per-item grid spanning (`className="col-span-2"`).

- [x] **Dev-mode validation: warn on duplicate `value` across Items**
      If two Items share the same `value`, both appear selected but the group is semantically broken.
      Added `registerItemValue`/`unregisterItemValue` to context. Each Item registers in `useEffect` (+ cleanup on unmount/value change).
      `console.warn` guarded with `process.env.NODE_ENV !== 'production'`.

## Behavior

- [ ] **Stale selection after dynamic Item removal**
      If the currently selected Item is removed from the tree, `selectedValue` still holds its value.
      No radio is checked but `selectedValue !== ''`. `onValueChange` isn't called.
      Consider: when the selected value doesn't match any registered Item, either clear it (call `onValueChange('')`) or document this as the consumer's responsibility.

- [x] **`onValueChange` should not fire when clicking the already-selected item**
      Verified: native `<input type="radio">` does not fire `onChange` when clicking an already-checked radio.
      Even if it did, React `useState` bail-out prevents re-render when setting the same value.

- [ ] **No native form participation**
      RadioGroup uses `onValueChange(value: string)` but doesn't expose a way to integrate with `<form>` submission or form libraries that expect `onChange(event)`.
      The hidden `<input type="radio">` does participate in native form submission (it has `name` and `value`), so form data collection works. But consumers using `onSubmit` with `FormData` need to know about the auto-generated `name` when `name` prop is omitted.
      Document that omitting `name` uses a React `useId()` value which won't be stable across SSR/hydration boundaries for form purposes.

## UX

- [ ] **`render` prop doesn't expose `isFocused` state**
      `ItemRenderProps` has `{ isSelected, isDisabled }` but no `isFocused`.
      The CSS `:has(:focus-visible)` approach handles outline on the wrapper, which is sufficient for most cases.
      But custom renders (e.g., star rating with glow effect, card with shadow change) may want JS-driven focus styling.
      Add `isFocused: boolean` to `ItemRenderProps` using an `onFocus`/`onBlur` listener on the hidden input.

- [ ] **No disabled cursor feedback on Radio (non-render-prop mode)**
      Radio items with `isDisabled` show `opacity: 0.55` but the `<label>` is still interactive-looking.
      The Radio component doesn't apply any disabled class on its `<label>` — only `&:has(> input:disabled) { opacity: 0.55 }`.
      This works visually, but the `cursor` isn't changed.
      Per design system convention, disabled elements use color/opacity only with no cursor change — so this is currently correct. Just confirm this is intentional.

- [ ] **Rating story: star fill depends on parent `value` state, not `isSelected`**
      In the Rating story, `Star` fill is `n <= Number(value)` — it reads the outer state, not the render prop's `isSelected`.
      This is fine for the "all stars up to N are filled" pattern, but it makes `isSelected` unused in this story.
      Not a bug, but the story should demonstrate `isSelected` usage more explicitly (or add a comment explaining the pattern).

## Links

- [Radio Group Pattern — WAI-ARIA APG](https://www.w3.org/WAI/ARIA/apg/patterns/radio/)
- [Radio Group Example — WAI-ARIA APG](https://www.w3.org/WAI/ARIA/apg/patterns/radio/examples/radio/)
- [Rating Radio Group Example — WAI-ARIA APG](https://www.w3.org/WAI/ARIA/apg/patterns/radio/examples/radio-rating/)
- [Radio Group APG Reference JS](https://www.w3.org/WAI/content-assets/wai-aria-practices/patterns/radio/examples/js/radio.js)
- [Rating APG Reference JS](https://www.w3.org/WAI/content-assets/wai-aria-practices/patterns/radio/examples/js/radio-rating.js)
- [`clip` vs `clip-path` for visually hidden — Scott O'Hara](https://www.scottohara.me/blog/2023/03/21/visually-hidden-hack.html)
- [Inclusively Hidden — Sara Soueidan](https://www.sarasoueidan.com/blog/inclusively-hiding-and-styling-checkboxes-and-radio-buttons/)
