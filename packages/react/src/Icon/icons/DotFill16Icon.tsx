import React from 'react';
import { BaseIconProps } from '../types';

/**
 * DotFill16Icon Component
 * Генерируется из SVG файла с помощью SVGR
 */
const DotFill16Icon: React.FC<BaseIconProps> = ({
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
    viewBox="0 0 16 16"
    aria-hidden="true"
  >
    <path d="M8 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z" />
  </svg>
  );
};

export default DotFill16Icon;
