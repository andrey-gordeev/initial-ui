import React from 'react';
import { BaseIconProps } from '../types';

/**
 * CheckboxBlankCircleLineIcon Component
 * Генерируется из SVG файла с помощью SVGR
 */
const CheckboxBlankCircleLineIcon: React.FC<BaseIconProps> = ({
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
            <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z" />
        </svg>
    );
};

export default CheckboxBlankCircleLineIcon;
