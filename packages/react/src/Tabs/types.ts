import { ReactNode, Ref } from 'react';

export type TabProps = {
    id: string;
    label: string;
    isDisabled?: boolean;
    ref?: Ref<HTMLButtonElement>;
};

export type TabListProps = {
    children: ReactNode;
} & (
    | { 'aria-label': string; 'aria-labelledby'?: string }
    | { 'aria-label'?: string; 'aria-labelledby': string }
);

export type PanelProps = {
    children: ReactNode;
    id: string;
    tabIndex?: number;
};

export type TabsProps = {
    children: ReactNode;
    orientation?: 'horizontal' | 'vertical';
    defaultActiveId?: string;
    activeId?: string;
    onActiveIdChange?: (id: string) => void;
};
