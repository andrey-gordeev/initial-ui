import { clsx } from 'clsx';
import { PopoverProps } from './types';
import './styles.scss';

export const Popover = ({ children, placement = 'top' }: PopoverProps) => {
    const className = clsx('popover', {
        [`popover--${placement}`]: true,
    });

    return <div className={className}>{children}</div>;
};
