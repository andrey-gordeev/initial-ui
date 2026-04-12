import { AriaAttributes, ReactNode, Ref } from 'react';

export type TabProps = {
    id: string;
    label: string;
    isDisabled?: boolean;
    ref?: Ref<HTMLButtonElement>;
};

export type TabListProps = {
    children: ReactNode;
} & Required<Pick<AriaAttributes, 'aria-label'>>;

export type PanelProps = {
    children: ReactNode;
    id: string;
};

export type TabsProps = {
    children: ReactNode;
    orientation?: 'horizontal' | 'vertical';
    defaultActiveId?: string;
    activeId?: string;
    onActiveIdChange?: (id: string) => void;
};
