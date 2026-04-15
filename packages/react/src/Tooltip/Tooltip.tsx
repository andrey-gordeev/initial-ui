import clsx from 'clsx';

import { Body } from '../Typography';

import {
    DEFAULT_TOOLTIP_PLACEMENT,
    TOOLTIP_PLACEMENT_TO_CLASS_NAME_MAP,
} from './constants';
import type { TooltipProps } from './types';
import './styles.scss';

export function Tooltip({
    id,
    text,
    placement = DEFAULT_TOOLTIP_PLACEMENT,
    style,
}: TooltipProps) {
    const className = clsx(
        'tooltip',
        TOOLTIP_PLACEMENT_TO_CLASS_NAME_MAP[placement],
    );

    return (
        <div id={id} role="tooltip" className={className} style={style}>
            <Body>{text}</Body>
        </div>
    );
}
