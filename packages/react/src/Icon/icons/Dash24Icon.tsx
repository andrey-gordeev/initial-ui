import React from 'react';
import { BaseIconProps } from '../types';

/**
 * Dash24Icon Component
 * Генерируется из SVG файла с помощью SVGR
 */
const Dash24Icon: React.FC<BaseIconProps> = ({
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
    <path d="M4.5 12.75a.75.75 0 0 1 .75-.75h13.5a.75.75 0 0 1 0 1.5H5.25a.75.75 0 0 1-.75-.75Z" />
  </svg>
  );
};

export default Dash24Icon;
