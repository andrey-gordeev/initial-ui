import { ReactNode } from 'react';

export type OptionProps = {
    label: string;
    value?: string;
    isDisabled?: boolean;
    onClick?: () => void;
};

type OptionsListWithChildren = {
    children: ReactNode;
    options?: never;
};

type OptionsListWithOptions = {
    children?: never;
    options: OptionProps[];
};

export type OptionsListProps = OptionsListWithChildren | OptionsListWithOptions;
