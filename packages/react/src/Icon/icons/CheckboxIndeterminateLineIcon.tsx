import React from 'react';
import { BaseIconProps } from '../types';

/**
 * CheckboxIndeterminateLineIcon Component
 * Генерируется из SVG файла с помощью SVGR
 */
const CheckboxIndeterminateLineIcon: React.FC<BaseIconProps> = ({
    size = 'md',
    color = 'black',
    className,
    style,
}) => {
    const getSize = () => {
        switch (size) {
            case 'sm':
                return '16px';
            case 'md':
                return '24px';
            case 'lg':
                return '32px';
            case 'stretch':
                return '100%';
            default:
                return '24px';
        }
    };

    const getColor = () => {
        return `var(--iui-token-icon-color-${color})`;
    };

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={getColor()}
            viewBox="0 0 24 24"
            width={getSize()}
            height={getSize()}
            aria-hidden="true"
        >
            <path d="M4 3H20C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM5 5V19H19V5H5ZM7 11H17V13H7V11Z" />
        </svg>
    );
};

export default CheckboxIndeterminateLineIcon;
