import {
    type MouseEvent,
    type SyntheticEvent,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import type { DialogProps } from './types';
import { validateDialogProps } from './validate';
import './styles.css';

export function Dialog({
    ref,
    shouldLightDismiss = true,
    initialOpen = false,
    isOpen: controlledOpen,
    onOpenChange: controlledOpenChange,
    onClose,
    children,
    ...ariaProps
}: DialogProps) {
    if (process.env.NODE_ENV !== 'production') {
        validateDialogProps(ariaProps, controlledOpen, controlledOpenChange);
    }

    const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen);
    const dialogRef = useRef<HTMLDialogElement>(null);

    const isOpen = controlledOpen ?? uncontrolledOpen;
    const onOpenChange = controlledOpenChange ?? setUncontrolledOpen;

    const onOpenChangeRef = useRef(onOpenChange);
    onOpenChangeRef.current = onOpenChange;

    const onCloseRef = useRef(onClose);
    onCloseRef.current = onClose;

    const mountedRef = useRef(true);
    useEffect(() => () => { mountedRef.current = false; }, []);

    const closingRef = useRef(false);

    function requestClose(event?: SyntheticEvent) {
        closingRef.current = true;
        onOpenChangeRef.current(false);
        onCloseRef.current?.(event);
    }

    useEffect(() => {
        const dialog = dialogRef.current;

        if (isOpen) {
            safelyOpenDialogAsModal(dialog);
        } else {
            dialog?.close();
        }

        return () => {
            dialog?.close();
        };
    }, [isOpen]);

    useImperativeHandle(
        ref,
        () => ({
            close() {
                requestClose();
            },
            showModal() {
                onOpenChangeRef.current(true);
            },
            get isOpen() {
                return isOpen;
            },
        }),
        [isOpen],
    );

    function handleCancel(event: SyntheticEvent) {
        event.preventDefault();
        requestClose(event);
    }

    function handleClick(event: MouseEvent<HTMLDialogElement>) {
        if (shouldLightDismiss && event.target === event.currentTarget) {
            requestClose(event);
        }
    }

    function handleClose(event: SyntheticEvent) {
        if (!mountedRef.current) return;

        if (closingRef.current) {
            closingRef.current = false;
            return;
        }

        if (isOpen) {
            onOpenChangeRef.current(false);
        }
        onCloseRef.current?.(event);
    }

    return (
        <dialog
            ref={dialogRef}
            className="iui-dialog"
            onCancel={handleCancel}
            onClick={handleClick}
            onClose={handleClose}
            {...ariaProps}
        >
            {children}
        </dialog>
    );
}

function safelyOpenDialogAsModal(dialog: HTMLDialogElement | null) {
    if (dialog && !dialog.open) {
        dialog.showModal();
    }
}
