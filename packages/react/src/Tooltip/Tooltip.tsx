import clsx from 'clsx';
import { TooltipProps } from './types';
import './styles.scss';

export const Tooltip = ({ text, placement = 'top' }: TooltipProps) => {
    const className = clsx('tooltip', {
        [`tooltip--${placement}`]: placement,
    });

    return (
        <div className="tooltip-container">
            <div className={className}>
                <div>{text}</div>
            </div>
        </div>
    );
};
