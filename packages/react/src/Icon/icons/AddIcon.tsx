import React from 'react';
import { BaseIconProps } from '../types';

/**
 * AddIcon Component
 * Генерируется из SVG файла с помощью SVGR
 */
const AddIcon: React.FC<BaseIconProps> = ({
    size = 'md',
    color,
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
        return color ? `var(--iui-token-icon-color-${color})` : 'currentColor';
    };

    return (
        <svg
            width={getSize()}
            height={getSize()}
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
            <path
                stroke={getColor()}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v14m-7-7h14"
            />
        </svg>
    );
};

export default AddIcon;
