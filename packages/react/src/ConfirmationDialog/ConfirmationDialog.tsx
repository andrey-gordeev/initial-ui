import { type KeyboardEvent, useId, useImperativeHandle, useRef } from 'react';

import Dialog, { type DialogRef } from '../Dialog';
import Button from '../Button';
import ButtonGroup from '../ButtonGroup';

import type { ConfirmationDialogProps } from './types';
import { SEVERITY_CONFIG } from './constants';

export function ConfirmationDialog({
    ref,
    isOpen,
    onOpenChange,
    initialOpen,
    title,
    description,
    confirm,
    dismiss,
    severity = 'medium',
    state = 'idle',
    children,
}: ConfirmationDialogProps) {
    const config = SEVERITY_CONFIG[severity];

    const titleId = useId();
    const descId = useId();

    const dialogRef = useRef<DialogRef>(null);
    const actionInFlightRef = useRef(false);

    const isPending = state === 'pending' || state === 'loading';
    const isLoading = state === 'loading';

    useImperativeHandle(ref, () => dialogRef.current!, []);

    function handleDismiss() {
        if (isPending) return;
        dismiss?.onAction?.();
        if (onOpenChange) {
            onOpenChange(false);
        } else {
            dialogRef.current?.close();
        }
    }

    function handleConfirm() {
        if (isPending || actionInFlightRef.current) return;
        actionInFlightRef.current = true;

        const result = confirm.onAction();
        if (result instanceof Promise) {
            result.finally(() => {
                actionInFlightRef.current = false;
            });
        } else {
            actionInFlightRef.current = false;
        }
    }

    function handleEnterConfirm(event: KeyboardEvent<HTMLDialogElement>) {
        if (!config.shouldEnterConfirm || isPending) return;
        if (event.key !== 'Enter') return;

        event.preventDefault();
        handleConfirm();
    }

    const dismissLabel = dismiss?.label ?? 'Cancel';

    const openProps = onOpenChange
        ? { isOpen: isOpen!, onOpenChange: handleDismiss }
        : {};

    return (
        <Dialog
            ref={dialogRef}
            initialOpen={initialOpen}
            shouldOutsideDismiss={config.shouldOutsideDismiss}
            shouldEscapeDismiss={config.shouldEscapeDismiss}
            onKeyDown={handleEnterConfirm}
            onClose={handleDismiss}
            role="alertdialog"
            aria-labelledby={titleId}
            aria-describedby={description ? descId : undefined}
            {...openProps}
        >
            <h2 id={titleId}>{title}</h2>
            {description && <p id={descId}>{description}</p>}
            {children}
            <ButtonGroup>
                <Button
                    label={dismissLabel}
                    variant="secondary"
                    onClick={handleDismiss}
                    isDisabled={isPending}
                />
                <Button
                    label={confirm.label}
                    variant={config.confirmVariant}
                    onClick={handleConfirm}
                    isDisabled={isPending}
                    isLoading={isLoading}
                />
            </ButtonGroup>
        </Dialog>
    );
}
