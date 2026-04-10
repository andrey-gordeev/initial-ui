import type { ConfirmationDialogSeverity } from './types';

type SeverityConfig = {
    shouldOutsideDismiss: boolean;
    shouldEscapeDismiss: boolean;
    shouldEnterConfirm: boolean;
    confirmVariant: 'primary' | 'danger';
};

export const SEVERITY_CONFIG: Record<
    ConfirmationDialogSeverity,
    SeverityConfig
> = {
    low: {
        shouldOutsideDismiss: true,
        shouldEscapeDismiss: true,
        shouldEnterConfirm: true,
        confirmVariant: 'primary',
    },
    medium: {
        shouldOutsideDismiss: true,
        shouldEscapeDismiss: true,
        shouldEnterConfirm: true,
        confirmVariant: 'primary',
    },
    high: {
        shouldOutsideDismiss: false,
        shouldEscapeDismiss: false,
        shouldEnterConfirm: false,
        confirmVariant: 'danger',
    },
    critical: {
        shouldOutsideDismiss: false,
        shouldEscapeDismiss: false,
        shouldEnterConfirm: false,
        confirmVariant: 'danger',
    },
};
