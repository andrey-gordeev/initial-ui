import { FC, ReactNode } from 'react';

type ShowcaseProps = {
    children: ReactNode;
    label?: string;
};

export type ItemProps = {
    children: ReactNode;
    label?: string;
};

export type VariantProps = {
    children: ReactNode;
    label?: string;
};

export type ShowcaseComponent = FC<ShowcaseProps> & {
    Item: FC<ItemProps>;
    Variant: FC<VariantProps>;
};
