import React, { CSSProperties, ReactNode, Ref } from 'react';

export type TabProps = {
    id: string;
    label: string;
    isDisabled?: boolean;
    ref?: Ref<HTMLButtonElement>;
};

export type TabListProps = {
    children: ReactNode;
    orientation?: 'horizontal' | 'vertical';
    styles?: CSSProperties;
};

export type PanelProps = {
    children: ReactNode;
    id: string;
    hidden?: boolean;
};

export type PanelListProps = {
    children: ReactNode;
}

export interface TabsPropsWithChildren {
    children: React.ReactNode;
    orientation?: 'horizontal' | 'vertical';
}

export interface TabsPropsWithLists {
    tabList: TabProps[];
    panelList?: PanelProps[];
    orientation?: 'horizontal' | 'vertical';
}

export type TabsProps = TabsPropsWithChildren | TabsPropsWithLists;
