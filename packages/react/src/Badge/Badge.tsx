import clsx from 'clsx';
import { BadgeProps } from './types';
import './styles.css';
import { Icon } from '../Icon';

export const Badge = ({ text, icon }: BadgeProps) => {
    const className = clsx('iui-badge');

    return (
        <div className="iui-badge">
            {icon ? <Icon name={icon} size="sm" /> : null}
            {text ? <span>{text}</span> : null}
        </div>
    );
};
