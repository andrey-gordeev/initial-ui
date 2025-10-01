import { BadgeProps } from '../types';

const PLACEMENT_ANGLES: Record<BadgeProps['placement'], number> = {
    ['top']: -Math.PI / 2,
    ['top-start']: (-3 * Math.PI) / 4,
    ['top-end']: -Math.PI / 4,
    ['bottom']: Math.PI / 2,
    ['bottom-start']: (3 * Math.PI) / 4,
    ['bottom-end']: Math.PI / 4,
    ['left']: Math.PI,
    ['right']: 0,
};

export const getBadgePosition = (
    placement: BadgeProps['placement'],
    avatarSize: number,
    badgeDimensions: { width: number; height: number },
    gap: number = 0,
) => {
    const avatarRadius = avatarSize / 2;
    const { width, height } = badgeDimensions;
    const angle = PLACEMENT_ANGLES[placement];

    const offset = avatarRadius + Math.max(width, height) / 2 + gap;

    const x = avatarRadius + offset * Math.cos(angle);
    const y = avatarRadius + offset * Math.sin(angle);

    return { x, y };
};
