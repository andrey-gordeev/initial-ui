import { AvatarSize, AvatarProps, BadgeDimensions, BadgeProps } from './types';

const SIZE_TO_VALUE_MAP: Record<AvatarSize, number> = {
    sm: 48,
    md: 72,
    lg: 120,
    jumbo: 220,
};

export const getAvatarSize = (size: AvatarProps['size'] = 'md') => {
    const avatarSize = SIZE_TO_VALUE_MAP[size];
    return {
        avatarSize,
        avatarRadius: avatarSize / 2,
    };
};

export const calculateBadgeRadius = (
    badgeDimensions: BadgeDimensions[],
    badges: BadgeProps[],
) => {
    return badgeDimensions.map((dimensions, index) => {
        const badge = badges[index];
        const gap = badge.gap || 0;
        const { width, height } = dimensions;

        const notchRadius = Math.min(width + gap * 2, height + gap * 2) / 2;
        return Math.max(0, notchRadius - gap);
    });
};
