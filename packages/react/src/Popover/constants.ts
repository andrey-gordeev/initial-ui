export const POPOVER_PLACEMENT = {
    'top': 'top',
    'top-start': 'top-start',
    'top-end': 'top-end',
    'bottom': 'bottom',
    'bottom-start': 'bottom-start',
    'bottom-end': 'bottom-end',
    'left': 'left',
    'right': 'right',
} as const;

export const DEFAULT_POPOVER_PLACEMENT = POPOVER_PLACEMENT.top;

export const POPOVER_PLACEMENT_TO_CLASS_NAME_MAP: Record<
    keyof typeof POPOVER_PLACEMENT,
    string
> = {
    [POPOVER_PLACEMENT.top]: 'popover--top',
    [POPOVER_PLACEMENT['top-start']]: 'popover--top-start',
    [POPOVER_PLACEMENT['top-end']]: 'popover--top-end',
    [POPOVER_PLACEMENT.bottom]: 'popover--bottom',
    [POPOVER_PLACEMENT['bottom-start']]: 'popover--bottom-start',
    [POPOVER_PLACEMENT['bottom-end']]: 'popover--bottom-end',
    [POPOVER_PLACEMENT.left]: 'popover--left',
    [POPOVER_PLACEMENT.right]: 'popover--right',
};
