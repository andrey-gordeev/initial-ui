import React from 'react';
import { BaseIconProps } from '../types';

/**
 * Plus16Icon Component
 * Генерируется из SVG файла с помощью SVGR
 */
const Plus16Icon: React.FC<BaseIconProps> = ({
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
    <path d="M7.75 2a.75.75 0 0 1 .75.75V7h4.25a.75.75 0 0 1 0 1.5H8.5v4.25a.75.75 0 0 1-1.5 0V8.5H2.75a.75.75 0 0 1 0-1.5H7V2.75A.75.75 0 0 1 7.75 2Z" />
  </svg>
  );
};

export default Plus16Icon;
