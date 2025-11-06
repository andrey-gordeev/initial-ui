import React from 'react';
import { BaseIconProps } from '../types';

/**
 * Dot16Icon Component
 * Генерируется из SVG файла с помощью SVGR
 */
const Dot16Icon: React.FC<BaseIconProps> = ({
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
    <path d="M4 8a4 4 0 1 1 8 0 4 4 0 0 1-8 0Zm4-2.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z" />
  </svg>
  );
};

export default Dot16Icon;
