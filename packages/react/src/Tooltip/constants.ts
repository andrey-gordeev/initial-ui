export const TOOLTIP_PLACEMENT = {
    top: 'top',
    bottom: 'bottom',
    left: 'left',
    right: 'right',
} as const;

export const DEFAULT_TOOLTIP_PLACEMENT = TOOLTIP_PLACEMENT.top;

export const TOOLTIP_PLACEMENT_TO_CLASS_NAME_MAP: Record<
    keyof typeof TOOLTIP_PLACEMENT,
    string
> = {
    [TOOLTIP_PLACEMENT.top]: 'tooltip--top',
    [TOOLTIP_PLACEMENT.bottom]: 'tooltip--bottom',
    [TOOLTIP_PLACEMENT.left]: 'tooltip--left',
    [TOOLTIP_PLACEMENT.right]: 'tooltip--right',
};
