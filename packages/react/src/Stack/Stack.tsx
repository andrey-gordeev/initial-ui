import clsx from 'clsx';

import { StackProps } from './types';
import './styles.css';

export const Stack = ({ children, direction = 'horizontal' }: StackProps) => {
    const className = clsx('stack', {
        'stack--direction-horizontal': direction === 'horizontal',
        'stack--direction-vertical': direction === 'vertical',
    });

    return <div className={className}>{children}</div>;
};
