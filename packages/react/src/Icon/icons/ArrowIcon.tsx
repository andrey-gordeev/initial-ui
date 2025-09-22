import React from 'react';
import { BaseIconProps } from '../types';

/**
 * ArrowIcon Component
 * Генерируется из SVG файла с помощью SVGR
 */
const ArrowIcon: React.FC<BaseIconProps> = ({
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
                d="M7 17L17 7M17 7H7M17 7v10"
            />
        </svg>
    );
};

export default ArrowIcon;
