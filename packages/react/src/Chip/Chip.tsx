import clsx from 'clsx';
import Icon from '../Icon/Icon';
import { ChipProps } from './types';
import './styles.css';

export const Chip = ({
    label,
    icon,
    isSelectable,
    isSelected,
    onClick,
}: ChipProps) => {
    const Tag = isSelectable ? 'button' : 'div';

    const className = clsx('chip');

    let leadingIcon = null;
    if (isSelected) {
        leadingIcon = <Icon name="add" size="sm" />;
    }
    if (icon) {
        leadingIcon = <Icon name={icon} size="sm" />;
    }

    const trailingIcon = isSelectable ? <Icon name="close" /> : null;

    return (
        <Tag className={className}>
            {leadingIcon}
            <span>{label}</span>
            {trailingIcon}
        </Tag>
    );
};
