import { ReactNode } from 'react';

type Placement =
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'right';

export type PopoverProps = {
    children?: ReactNode;
    placement?: Placement;
};
