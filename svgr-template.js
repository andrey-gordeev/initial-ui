const template = (variables, { tpl }) => {
  return tpl`
import React from 'react';
import { BaseIconProps } from '../types';

/**
 * ${variables.componentName} Component
 * Генерируется из SVG файла с помощью SVGR
 */
const ${variables.componentName}: React.FC<BaseIconProps> = ({ 
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
    return \`var(--iui-token-icon-color-\${color})\`;
  };

  return (
    <svg
      width={getSize()}
      height={getSize()}
      ${variables.jsx}
      className={className}
      style={style}
      aria-hidden="true"
    >
      ${variables.jsx}
    </svg>
  );
};

export default ${variables.componentName};
`;
};

module.exports = template;

