import { ReactNode } from 'react';

export type FormControlProps = {
    children?: ReactNode;
    label?: string;
    hint?: string;
    error?: string;
    isDisabled?: boolean;
    isRequired?: boolean;
};
