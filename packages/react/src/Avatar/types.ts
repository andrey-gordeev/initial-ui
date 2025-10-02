import { ReactNode } from 'react';

type BadgeDimensions = {
    width: number;
    height: number;
    left: number;
    top: number;
};

export type AvatarSize = 'sm' | 'md' | 'lg' | 'jumbo';

type Placement =
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'right';

export type BadgeProps = {
    placement: Placement;
    gap?: number;
    content?: ReactNode;
};

export type AvatarProps = {
    children?: ReactNode;
    content?: ReactNode;
    size?: AvatarSize;
    badges?: BadgeProps | BadgeProps[];
    halo?: boolean;
    inset?: boolean;
};

export type { BadgeDimensions };
