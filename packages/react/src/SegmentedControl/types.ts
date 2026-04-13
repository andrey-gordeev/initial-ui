import type { ReactNode } from 'react';

export type ItemProps = {
    value: string;
    label: string;
    description?: string;
    isDisabled?: boolean;
};

export type SegmentedControlProps = {
    children: ReactNode;
    name?: string;
    defaultValue?: string;
    value?: string;
    onChange?: (value: string) => void;
};
