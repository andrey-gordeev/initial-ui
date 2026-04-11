import { IconName } from '../Icon';
import { JSX } from 'react';

export type ChipProps = {
    label: string;
    icon?: IconName;
    isSelectable?: boolean;
    isSelected?: boolean;
    onClick?: () => void;
};

export type Tags = Extract<keyof JSX.IntrinsicElements, 'button' | 'div'>;
