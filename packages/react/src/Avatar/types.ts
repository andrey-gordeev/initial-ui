import { ReactNode } from 'react';

type BadgeDimensions = {
    width: number;
    height: number;
};

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
    size?: number;
    avatarContent: ReactNode;
    badges?: BadgeProps | BadgeProps[];
};

export type { BadgeDimensions };
