export const BADGE_COLORS = {
    ['danger']: 'danger',
    ['success']: 'success',
    ['warning']: 'warning',
    ['info']: 'info',
} as const;

export const BADGE_SIZES = {
    ['sm']: 'sm',
    ['md']: 'md',
    ['lg']: 'lg',
} as const;

export const BADGE_COLORS_TO_CLASS_NAME_MAP: Record<
    keyof typeof BADGE_COLORS,
    string
> = {
    [BADGE_COLORS['danger']]: 'iui-badge--color-danger',
    [BADGE_COLORS['success']]: 'iui-badge--color-success',
    [BADGE_COLORS['warning']]: 'iui-badge--color-warning',
    [BADGE_COLORS['info']]: 'iui-badge--color-info',
};

export const BADGE_SIZES_TO_CLASS_NAME_MAP: Record<
    keyof typeof BADGE_SIZES,
    string
> = {
    [BADGE_SIZES['sm']]: 'iui-badge--size-sm',
    [BADGE_SIZES['md']]: 'iui-badge--size-md',
    [BADGE_SIZES['lg']]: 'iui-badge--size-lg',
};
