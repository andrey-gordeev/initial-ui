import { ReactNode } from 'react';

export type PopoverProps = {
    children?: ReactNode;
    placement?:
        | 'top'
        | 'top-start'
        | 'top-end'
        | 'bottom'
        | 'bottom-start'
        | 'bottom-end'
        | 'left'
        | 'right';
};
