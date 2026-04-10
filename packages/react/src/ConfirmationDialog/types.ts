import type { ReactNode, Ref } from 'react';

import type { DialogIsOpenProps, DialogRef } from '../Dialog';

export type ConfirmationDialogSeverity = 'low' | 'medium' | 'high' | 'critical';
export type ConfirmationDialogState = 'idle' | 'pending' | 'loading' | 'error';

export type ConfirmationDialogProps = DialogIsOpenProps & {
    ref?: Ref<DialogRef>;
    initialOpen?: boolean;

    title: string;
    description?: string;

    confirm: {
        label: string;
        onAction: () => Promise<void> | void;
    };

    dismiss?: {
        label?: string;
        onAction?: () => void;
    };

    severity?: ConfirmationDialogSeverity;
    state?: ConfirmationDialogState;

    children?: ReactNode;
};
