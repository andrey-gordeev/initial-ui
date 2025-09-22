import React from 'react';
import { BaseIconProps } from '../types';

/**
 * HomeIcon Component
 * Генерируется из SVG файла с помощью SVGR
 */
const HomeIcon: React.FC<BaseIconProps> = ({
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
                d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
            />
            <polyline
                stroke={getColor()}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                points="9,22 9,12 15,12 15,22"
            />
        </svg>
    );
};

export default HomeIcon;
