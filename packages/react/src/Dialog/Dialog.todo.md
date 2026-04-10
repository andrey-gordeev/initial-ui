# Dialog TODO

## Important

- [x] **`import.meta.env.DEV` → `process.env.NODE_ENV !== 'production'`**
  `import.meta.env.DEV` работает только в Vite/esbuild. Потребители на webpack/Rspack/Turbopack увидят ошибку.
  Либо tree-shake на этапе сборки пакета.

## Accessibility

- [ ] **Explicit focus management** (initial focus, focus return on close)

- [ ] **Focus restoration on close**
  При закрытии диалога фокус должен вернуться на элемент, который его открыл.
  Сохранять `document.activeElement` перед `showModal()`, вызывать `.focus()` после закрытия.

- [ ] **`role="alertdialog"` для confirmation/destructive диалогов**
  Alert dialog не должен закрываться по backdrop click. Требует явного ответа от пользователя.
  Добавить проп `role?: 'dialog' | 'alertdialog'`, при `alertdialog` отключать light dismiss.

- [ ] **Compound component pattern для автоматических aria-связей**
  `Dialog.Title` / `Dialog.Description` автоматически генерируют `id` и пробрасывают `aria-labelledby` / `aria-describedby` через контекст.
  Убирает целый класс a11y-багов (забытые `id`, рассинхрон между `id` и `aria-labelledby`).

## Architecture

- [ ] **Compound component pattern** (`Dialog.Root`, `Dialog.Trigger`, `Dialog.Content`, `Dialog.Title`, `Dialog.Description`, `Dialog.Close`)
  Текущий монолитный компонент вынуждает потребителя вручную управлять trigger-кнопкой, `useId()`, aria-атрибутами.
  Compound components убирают boilerplate и делают API декларативным.

## UX

- [ ] Safari close animation — [webkit#275184](https://bugs.webkit.org/show_bug.cgi?id=275184)

## Links

- [React A11y Modal Dialog](https://clhenrick.io/blog/react-a11y-modal-dialog/)
- [Building accessible modals with React (Nutrient)](https://www.nutrient.io/blog/building-accessible-modals-with-react/)
- [Building a dialog component (web.dev)](https://web.dev/articles/building/a-dialog-component)
- [Create modal dialogs in React (dev.to)](https://dev.to/receter/create-modal-dialogs-in-react-2ioj)
- [Modal Dialog Example — WAI-ARIA APG](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/dialog/)
