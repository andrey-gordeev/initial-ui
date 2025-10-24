import clsx from 'clsx';
import { Icon } from '../Icon';
import { BadgeProps } from './types';
import {
    BADGE_COLORS_TO_CLASS_NAME_MAP,
    BADGE_SIZES_TO_CLASS_NAME_MAP,
} from './constants';
import './styles.scss';

export const Badge = ({
    text,
    icon,
    color = 'info',
    size = 'md',
}: BadgeProps) => {
    const className = clsx(
        'iui-badge',
        BADGE_COLORS_TO_CLASS_NAME_MAP[color],
        BADGE_SIZES_TO_CLASS_NAME_MAP[size],
    );

    return (
        <div className={className}>
            {icon ? <Icon name={icon} size="sm" /> : null}
            {text ? <span className="iui-badge__text">{text}</span> : null}
        </div>
    );
};
