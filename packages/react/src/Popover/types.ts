import type { CSSProperties, ReactNode } from 'react';

import type { POPOVER_PLACEMENT } from './constants';

export type Placement =
    (typeof POPOVER_PLACEMENT)[keyof typeof POPOVER_PLACEMENT];

export type PopoverProps = {
    id?: string;
    placement?: Placement;
    style?: CSSProperties;
    children?: ReactNode;
};
