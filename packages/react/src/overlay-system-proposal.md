# Overlay System — Architecture Proposal

## Problem

Current overlay components (Tooltip, Popover, Dialog) are either purely presentational
or manage their own state in isolation. There is no unified system for:

- Trigger association without wrapper components
- Stacking and dismissal coordination
- Focus management across overlays
- Silencing lower-priority overlays (e.g., toasts during a critical dialog)

## Design Principles

1. **No trigger wrappers** — overlays connect to triggers via `ref`, not by wrapping children
2. **Overlays are components** — they own their rendering, styles, ARIA roles, and scroll/viewport behavior
3. **OverlayManager is the coordinator** — a centralized layer (React Context) manages the stack, priorities, dismissal routing, focus, and silence
4. **Hook-per-type** — each overlay type has its own hook (`useTooltip`, `usePopover`, `useDialog`, `useToast`) that encapsulates the interaction pattern and registers with the manager
5. **Exit animations are CSS-driven** — components must be ready for exit animations; timing is determined solely by CSS transition/animation duration

## Architecture

```
useTooltip / usePopover / useDialog / useToast   (consumer-facing hooks)
                        |
                registers overlay in
                        |
                  OverlayManager              (React Context + stack)
                        |
                manages: stack, priority,
                dismiss, focus, silence
                        |
                   OverlayPortal              (renders into document.body)
```

## OverlayManager

Wraps the application:

```tsx
<OverlayProvider>
  <App />
</OverlayProvider>
```

### Stack entry

```ts
type OverlayType = 'tooltip' | 'popover' | 'dropdown' | 'dialog' | 'toast';

type OverlayEntry = {
  id: string;
  type: OverlayType;
  priority: number;
  isSilencing: boolean;
  onDismiss: () => void;
};
```

### Responsibilities

| Concern                      | Behavior                                                                                    |
| ---------------------------- | ------------------------------------------------------------------------------------------- |
| **Escape**                   | Calls `onDismiss` on the topmost stack entry only                                           |
| **Click outside**            | Calls `onDismiss` on the topmost stack entry only                                           |
| **Focus — dialog**           | Traps focus inside; saves `document.activeElement` on open, restores on close               |
| **Focus — popover/dropdown** | Moves focus into overlay; returns to trigger on close                                       |
| **Focus — tooltip**          | No focus movement                                                                           |
| **Focus — toast**            | Never steals focus                                                                          |
| **Silence**                  | While any entry with `isSilencing: true` is in the stack, new toasts are queued (not shown) |
| **Toast queue**              | When the last silencing overlay closes, queued toasts are released                          |
| **Same-type displacement**   | New tooltip closes the previous tooltip (one at a time)                                     |

### Priority and displacement

Higher-priority overlays can displace (close) lower-priority ones. The priority order
(lowest to highest):

> **Open question:** Exact ordering needs validation. Proposed:
>
> ```
> tooltip (lowest) → popover/dropdown → toast → dialog (highest)
> ```
>
> Scenario to validate: an open dropdown menu + incoming toast — should the dropdown
> close or should they coexist?

### Silence mode

- Any overlay can set `isSilencing: true`, regardless of type
- While at least one silencing overlay is in the stack, toasts are held in a queue
- When the last silencing overlay is removed, queued toasts are shown

> **Open question:** How are queued toasts released?
>
> - All at once (toast stack)
> - One by one with interval
> - Only the most recent (older ones are stale)

### Same-type coexistence

> **Open question:** Rules for multiple overlays of the same type:
>
> - Tooltip: one at a time (confirmed)
> - Toast: can multiple toasts stack, or one at a time?
> - Popover: can two popovers coexist, or does the new one close the old?

## Hooks API

### useTooltip

Tooltip has no children — only `text`. The hook renders `<Tooltip>` internally via portal.
The consumer never writes `<Tooltip>` JSX.

```tsx
function Page() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { triggerProps } = useTooltip(buttonRef, {
    text: 'Save changes',
    placement: 'top',
  });

  return (
    <button ref={buttonRef} {...triggerProps}>
      Save
    </button>
  );
}
```

- `triggerProps` contains `aria-describedby` (linking to the tooltip's generated `id`)
- Event listeners (mouseenter, mouseleave, focus, blur) are attached imperatively via `triggerRef`
- Escape dismisses (routed through OverlayManager)
- Hoverable: moving pointer onto the tooltip keeps it open (WCAG 1.4.13)
- Delay on show (~150ms) and hide (~100ms) to prevent flicker and allow hover transfer
- Registers as `{ type: 'tooltip', priority: lowest }` in the manager

### usePopover / useDropdown

Popover has arbitrary JSX content — it needs a component. The hook takes a render function
that receives behavioral props.

```tsx
function Page() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { triggerProps } = usePopover(buttonRef, {
    placement: 'bottom-start',
    content: ({ onClose }) => (
      <Popover>
        <SettingsPanel onClose={onClose} onSave={handleSave} />
      </Popover>
    ),
  });

  return (
    <button ref={buttonRef} {...triggerProps}>
      Settings
    </button>
  );
}
```

- `triggerProps` contains `aria-expanded`, `aria-haspopup`
- Trigger event: click (attached imperatively via ref)
- Positioned relative to `triggerRef.current.getBoundingClientRect()`
- Render function receives `{ onClose }` — TypeScript enforces the contract
- Registers as `{ type: 'popover', priority: medium }` in the manager

### useDialog

Dialog is trigger-independent (centered, modal). The hook provides a controlled open/close
mechanism linked to a trigger.

```tsx
function Page() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { triggerProps } = useDialog(buttonRef, {
    content: ({ onClose }) => (
      <ConfirmationDialog
        title="Delete item?"
        confirm={{ label: 'Delete', onAction: handleDelete }}
        onClose={onClose}
      />
    ),
  });

  return (
    <button ref={buttonRef} {...triggerProps}>
      Delete
    </button>
  );
}
```

- Trigger event: click
- No positioning (dialog is centered via CSS / native `<dialog>`)
- Focus trap managed by OverlayManager
- Can set `isSilencing: true` for critical flows
- Registers as `{ type: 'dialog', priority: highest }` in the manager

### useToast

Toast has no trigger — it is called imperatively.

```tsx
function Page() {
  const showToast = useToast();

  async function handleSave() {
    await save();
    showToast({ text: 'Changes saved', duration: 5000 });
  }

  return <button onClick={handleSave}>Save</button>;
}
```

- No `triggerRef`, no `triggerProps`
- Renders via portal, does not steal focus
- `role="status"` + `aria-live="polite"` (or `"assertive"` for errors)
- Queued when a silencing overlay is active; released when silence ends
- Registers in the manager stack for priority/displacement tracking

## Component Responsibilities

Each component is responsible for its own:

| Concern                                       | Owner                                                     |
| --------------------------------------------- | --------------------------------------------------------- |
| Rendering and styles                          | Component                                                 |
| ARIA roles and attributes                     | Component                                                 |
| Scroll behavior (follow trigger, close, etc.) | Component                                                 |
| Viewport boundaries (flip/shift)              | Component (tooltip, popover only; not critical for v1)    |
| Exit animation                                | Component (CSS-driven, manager waits for `transitionend`) |

The OverlayManager does NOT render components — hooks do, via portal.
The manager only tracks the stack and coordinates behavior.

## Open Questions

1. **Priority order** — exact ranking of all overlay types and displacement rules
2. **Toast queue release** — all at once, sequential, or most-recent-only
3. **Same-type coexistence** — toast stacking, multiple popovers
4. **Scroll behavior per type** — tooltip follows trigger? popover closes on scroll?
5. **Portal target** — always `document.body`, or configurable container?
