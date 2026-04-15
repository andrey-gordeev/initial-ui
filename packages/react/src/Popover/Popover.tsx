import clsx from 'clsx';

import {
    DEFAULT_POPOVER_PLACEMENT,
    POPOVER_PLACEMENT_TO_CLASS_NAME_MAP,
} from './constants';
import type { PopoverProps } from './types';
import './styles.scss';

export function Popover({
    id,
    placement = DEFAULT_POPOVER_PLACEMENT,
    style,
    children,
}: PopoverProps) {
    const className = clsx(
        'popover',
        POPOVER_PLACEMENT_TO_CLASS_NAME_MAP[placement],
    );

    return (
        <div id={id} className={className} style={style}>
            {children}
        </div>
    );
}
