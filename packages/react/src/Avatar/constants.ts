export const AVATAR_SIZES = {
    ['sm']: 'sm',
    ['md']: 'md',
    ['lg']: 'lg',
    ['jumbo']: 'jumbo',
} as const;

export const AVATAR_BADGE_PLACEMENTS = {
    ['top']: 'top',
    ['top-start']: 'top-start',
    ['top-end']: 'top-end',
    ['bottom']: 'bottom',
    ['bottom-start']: 'bottom-start',
    ['bottom-end']: 'bottom-end',
    ['left']: 'left',
    ['right']: 'right',
} as const;

export const AVATAR_SIZES_TO_CLASS_NAME_MAP: Record<
    keyof typeof AVATAR_SIZES,
    string
> = {
    [AVATAR_SIZES['sm']]: 'avatar--sm',
    [AVATAR_SIZES['md']]: 'avatar--md',
    [AVATAR_SIZES['lg']]: 'avatar--lg',
    [AVATAR_SIZES['jumbo']]: 'avatar--jumbo',
};

export const AVATAR_BADGE_PLACEMENT_TO_CLASS_NAME_MAP: Record<
    keyof typeof AVATAR_BADGE_PLACEMENTS,
    string
> = {
    [AVATAR_BADGE_PLACEMENTS['top']]: 'avatar-badge--top',
    [AVATAR_BADGE_PLACEMENTS['top-start']]: 'avatar-badge--top-start',
    [AVATAR_BADGE_PLACEMENTS['top-end']]: 'avatar-badge--top-end',
    [AVATAR_BADGE_PLACEMENTS['bottom']]: 'avatar-badge--bottom',
    [AVATAR_BADGE_PLACEMENTS['bottom-start']]: 'avatar-badge--bottom-start',
    [AVATAR_BADGE_PLACEMENTS['bottom-end']]: 'avatar-badge--bottom-end',
    [AVATAR_BADGE_PLACEMENTS['left']]: 'avatar-badge--left',
    [AVATAR_BADGE_PLACEMENTS['right']]: 'avatar-badge--right',
};
