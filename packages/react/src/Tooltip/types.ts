import type { CSSProperties } from 'react';

import type { TOOLTIP_PLACEMENT } from './constants';

export type Placement =
    (typeof TOOLTIP_PLACEMENT)[keyof typeof TOOLTIP_PLACEMENT];

export type TooltipProps = {
    id?: string;
    text: string;
    placement?: Placement;
    style?: CSSProperties;
};
