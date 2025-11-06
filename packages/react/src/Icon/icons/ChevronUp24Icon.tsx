import React from 'react';
import { BaseIconProps } from '../types';

/**
 * ChevronUp24Icon Component
 * Генерируется из SVG файла с помощью SVGR
 */
const ChevronUp24Icon: React.FC<BaseIconProps> = ({
  size = 'md',
  color = 'black',
  className,
  style
}) => {
  const getSize = () => {
    switch (size) {
      case 'sm': return '16px';
      case 'md': return '24px';
      case 'lg': return '32px';
      case 'stretch': return '100%';
      default: return '24px';
    }
  };

  const getColor = () => {
    return `var(--iui-token-icon-color-${color})`;
  };

  return (
        <svg
    xmlns="http://www.w3.org/2000/svg"
    width={getSize()}
    height={getSize()}
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M18.78 15.78a.749.749 0 0 1-1.06 0L12 10.061 6.28 15.78a.749.749 0 1 1-1.06-1.06l6.25-6.25a.749.749 0 0 1 1.06 0l6.25 6.25a.749.749 0 0 1 0 1.06Z" />
  </svg>
  );
};

export default ChevronUp24Icon;
