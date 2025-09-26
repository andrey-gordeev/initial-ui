import type { ReactNode } from 'react';
import type { RadioProps } from '../Radio';

type RadioGroupBase = {
    name?: string;
    value?: string;
    onChange?: (value: string | undefined) => void;
};

type RadioGroupWithChildren = {
    children: ReactNode;
    options?: never;
} & RadioGroupBase;

type RadioGroupWithOptions = {
    children?: never;
    options: RadioProps[];
} & RadioGroupBase;

export type RadioGroupProps = RadioGroupWithChildren | RadioGroupWithOptions;
