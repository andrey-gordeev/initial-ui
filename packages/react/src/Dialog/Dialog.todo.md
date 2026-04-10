# Dialog TODO

## Important

- [x] **`import.meta.env.DEV` → `process.env.NODE_ENV !== 'production'`**
      `import.meta.env.DEV` only works in Vite/esbuild. Consumers on webpack/Rspack/Turbopack will see an error.
      Alternatively, tree-shake at the package build step.

## Accessibility

- [ ] **Explicit focus management** (initial focus, focus return on close)

- [ ] **Focus restoration on close**
      On close, focus should return to the element that opened the dialog.
      Save `document.activeElement` before `showModal()`, call `.focus()` after close.

- [ ] **`role="alertdialog"` for confirmation/destructive dialogs**
      Alert dialog must not close on backdrop click. Requires an explicit response from the user.
      Add prop `role?: 'dialog' | 'alertdialog'`; when `alertdialog`, disable outside dismiss.

- [ ] **Compound component pattern for automatic aria bindings**
      `Dialog.Title` / `Dialog.Description` auto-generate `id` and propagate `aria-labelledby` / `aria-describedby` via context.
      Eliminates a whole class of a11y bugs (forgotten `id`, `id` / `aria-labelledby` mismatch).

## Architecture

- [ ] **Compound component pattern** (`Dialog.Root`, `Dialog.Trigger`, `Dialog.Content`, `Dialog.Title`, `Dialog.Description`, `Dialog.Close`)
      The current monolithic component forces consumers to manually manage trigger buttons, `useId()`, and aria attributes.
      Compound components remove boilerplate and make the API declarative.

## Behavior

- [ ] **Esc/backdrop dismiss — should ConfirmationDialog call `dismiss.onAction`?**
      Currently `handleDismiss` (which calls `dismiss.onAction`) is bound to `onOpenChange` and `onClose`,
      so Esc and backdrop for `low`/`medium` are routed through it.
      Verify this is intentional, not a side effect — semantically Esc is not the same as clicking "Cancel".

- [ ] **Native `<dialog>` CloseWatcher vs `shouldEscapeDismiss={false}`**
      Browsers can fire a second Escape that is non-cancelable (CloseWatcher “escape hatch”) after the first `cancel` was prevented.
      We currently call `preventDefault()` on `keydown` for Escape when escape dismiss is disabled, so the dialog stays open until explicit user actions.
      Revisit later: product/accessibility trade-off (strict confirmation UX vs aligning with platform default “always a way out”), nested dialogs, and whether to document any residual browser quirks.

## UX

- [ ] Safari close animation — [webkit#275184](https://bugs.webkit.org/show_bug.cgi?id=275184)

## Links

- [React A11y Modal Dialog](https://clhenrick.io/blog/react-a11y-modal-dialog/)
- [Building accessible modals with React (Nutrient)](https://www.nutrient.io/blog/building-accessible-modals-with-react/)
- [Building a dialog component (web.dev)](https://web.dev/articles/building/a-dialog-component)
- [Create modal dialogs in React (dev.to)](https://dev.to/receter/create-modal-dialogs-in-react-2ioj)
- [Modal Dialog Example — WAI-ARIA APG](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/dialog/)
