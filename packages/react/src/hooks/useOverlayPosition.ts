import {
    type CSSProperties,
    type RefObject,
    useCallback,
    useEffect,
    useLayoutEffect,
    useState,
} from 'react';

type OverlayPlacement =
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'right';

function calculateStyles(
    triggerRect: DOMRect,
    placement: OverlayPlacement,
    offset: number,
): CSSProperties {
    const centerX = triggerRect.left + triggerRect.width / 2;
    const centerY = triggerRect.top + triggerRect.height / 2;

    switch (placement) {
        case 'top':
            return {
                left: centerX,
                top: triggerRect.top - offset,
                transform: 'translate(-50%, -100%)',
            };
        case 'top-start':
            return {
                left: triggerRect.left,
                top: triggerRect.top - offset,
                transform: 'translateY(-100%)',
            };
        case 'top-end':
            return {
                left: triggerRect.right,
                top: triggerRect.top - offset,
                transform: 'translate(-100%, -100%)',
            };
        case 'bottom':
            return {
                left: centerX,
                top: triggerRect.bottom + offset,
                transform: 'translateX(-50%)',
            };
        case 'bottom-start':
            return {
                left: triggerRect.left,
                top: triggerRect.bottom + offset,
            };
        case 'bottom-end':
            return {
                left: triggerRect.right,
                top: triggerRect.bottom + offset,
                transform: 'translateX(-100%)',
            };
        case 'left':
            return {
                left: triggerRect.left - offset,
                top: centerY,
                transform: 'translate(-100%, -50%)',
            };
        case 'right':
            return {
                left: triggerRect.right + offset,
                top: centerY,
                transform: 'translateY(-50%)',
            };
    }
}

export function useOverlayPosition<P extends OverlayPlacement>(
    triggerRef: RefObject<HTMLElement | null>,
    config: { placement: P; offset?: number; isOpen: boolean },
) {
    const { placement, offset = 8, isOpen } = config;
    const [styles, setStyles] = useState<CSSProperties>({});

    const updatePosition = useCallback(() => {
        const trigger = triggerRef.current;
        if (!trigger || !isOpen) return;

        const rect = trigger.getBoundingClientRect();
        setStyles({
            position: 'fixed',
            zIndex: 9999,
            ...calculateStyles(rect, placement, offset),
        });
    }, [triggerRef, isOpen, placement, offset]);

    useLayoutEffect(() => {
        updatePosition();
    }, [updatePosition]);

    useEffect(() => {
        if (!isOpen) return;

        window.addEventListener('scroll', updatePosition, true);
        window.addEventListener('resize', updatePosition);

        return () => {
            window.removeEventListener('scroll', updatePosition, true);
            window.removeEventListener('resize', updatePosition);
        };
    }, [isOpen, updatePosition]);

    return { styles, resolvedPlacement: placement };
}

export type { OverlayPlacement };
