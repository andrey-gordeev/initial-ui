import { ChangeEvent, ReactNode } from 'react';

type SegmentedControlBase = {
    name?: string;
    value?: string;
    onChange?: (value: SegmentedControlBase['value']) => void;
};

type SegmentedControlWithChildren = {
    children?: ReactNode;
    segments?: never;
} & SegmentedControlBase;

type SegmentedControlWithSegments = {
    children?: never;
    segments: SegmentProps[];
} & SegmentedControlBase;

export type SegmentedControlProps =
    | SegmentedControlWithChildren
    | SegmentedControlWithSegments;

export type SegmentProps = {
    ref?: (element: HTMLLabelElement | null) => void;
    name?: string;
    value?: string;
    label?: string;
    description?: string;
    isSelected?: boolean;
    isDisabled?: boolean;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};
