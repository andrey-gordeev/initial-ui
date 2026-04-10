import type {
    AriaAttributes,
    KeyboardEvent,
    PropsWithChildren,
    Ref,
    SyntheticEvent,
} from 'react';

export type DialogControlledProps = {
    /** Is the dialog open / visible. Set this to use Dialog as a controlled component. */
    isOpen: boolean;
    /** Called when the open state changes. Set this to use Dialog as a controlled component. */
    onOpenChange: (open: boolean) => void;
};

/**
 * Typing our props this way helps prevent one being set but not the other.
 * Both props must be set or neither must be set to avoid bugs between the dialog.open property and component's isOpen state.
 */
export type DialogIsOpenProps =
    | DialogControlledProps
    | {
          isOpen?: never;
          onOpenChange?: never;
      };

type DialogAriaAttributes = Pick<
    AriaAttributes,
    'aria-labelledby' | 'aria-label' | 'aria-describedby' | 'aria-description'
> & {
    role?: 'dialog' | 'alertdialog';
};

export type DialogProps = PropsWithChildren &
    DialogIsOpenProps &
    DialogAriaAttributes & {
        ref?: Ref<DialogRef>;
        /** Should a user be able to dismiss the dialog by clicking outside of it? */
        shouldOutsideDismiss?: boolean;
        /** Should pressing Escape close the dialog? */
        shouldEscapeDismiss?: boolean;
        /** Should the dialog be open by default? */
        initialOpen?: boolean;
        /** Called on keydown events on the dialog element. */
        onKeyDown?: (event: KeyboardEvent<HTMLDialogElement>) => void;
        /** Called when the dialog closes. Works in both controlled and uncontrolled modes. */
        onClose?: (event?: SyntheticEvent) => void;
    };

export interface DialogRef {
    close: () => void;
    showModal: () => void;
    /** Read-only. We intentionally don't expose a setter — use `isOpen`/`onOpenChange` props for controlled mode. */
    readonly isOpen: boolean;
}
