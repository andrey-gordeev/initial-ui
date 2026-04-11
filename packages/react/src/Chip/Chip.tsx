import clsx from 'clsx';

import Icon from '../Icon/Icon';
import { Label3 } from '../Typography';
import { ChipProps, Tags } from './types';
import './styles.css';

export const Chip = ({
    label,
    icon,
    isSelectable,
    isSelected,
    onClick,
}: ChipProps) => {
    const Tag: Tags = isSelectable ? 'button' : 'div';

    const className = clsx('chip');

    let leadingIcon = null;
    if (isSelected) {
        leadingIcon = <Icon name="plus-16" size="sm" />;
    }
    if (icon) {
        leadingIcon = <Icon name={icon} size="sm" />;
    }

    const trailingIcon = isSelectable ? <Icon name="close" size="sm" /> : null;

    return (
        <Tag className={className} onClick={onClick}>
            {leadingIcon}
            <Label3>{label}</Label3>
            {trailingIcon}
        </Tag>
    );
};
