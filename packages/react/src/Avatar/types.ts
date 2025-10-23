import { ReactNode } from 'react';
import { AVATAR_SIZES, AVATAR_BADGE_PLACEMENTS } from './constants';

type BadgeDimensions = {
    width: number;
    height: number;
    left: number;
    top: number;
};

export type AvatarSize = (typeof AVATAR_SIZES)[keyof typeof AVATAR_SIZES];

export type AvatarBadgePlacement =
    (typeof AVATAR_BADGE_PLACEMENTS)[keyof typeof AVATAR_BADGE_PLACEMENTS];

export type AvatarBadgeProps = {
    placement: AvatarBadgePlacement;
    gap?: number;
    content?: ReactNode;
};

export type AvatarProps = {
    children?: ReactNode;
    content?: ReactNode;
    type?: 'add-button';
    size?: AvatarSize;
    badges?: AvatarBadgeProps | AvatarBadgeProps[];
    halo?: boolean;
    inset?: boolean;
    label?: string;
    description?: string;
};

export type { BadgeDimensions };
