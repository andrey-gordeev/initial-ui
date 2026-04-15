import {
    type ReactNode,
    type RefObject,
    useCallback,
    useEffect,
    useId,
    useRef,
    useState,
} from 'react';

import { useOverlayContext } from '../OverlayProvider';
import { useOverlayPosition } from '../hooks/useOverlayPosition';
import { DEFAULT_TOOLTIP_PLACEMENT } from './constants';
import type { Placement, TooltipProps } from './types';

type TooltipRenderProps = {
    id: string;
    placement: Placement;
};

type TooltipConfig = Pick<TooltipProps, 'id' | 'placement'> & {
    content: (props: TooltipRenderProps) => ReactNode;
};

type TooltipTriggerProps = {
    'aria-describedby'?: string;
};

export function useTooltip(
    triggerRef: RefObject<HTMLElement | null>,
    config: TooltipConfig,
) {
    const { placement = DEFAULT_TOOLTIP_PLACEMENT, content } = config;
    const [isOpen, setIsOpen] = useState(false);
    const generatedId = useId();
    const tooltipId = config.id ?? generatedId;
    const overlayId = useId();
    const { mount, unmount } = useOverlayContext();

    const showTimeoutRef = useRef<number | undefined>(undefined);
    const hideTimeoutRef = useRef<number | undefined>(undefined);

    const { styles: positionStyles, resolvedPlacement } = useOverlayPosition(
        triggerRef,
        { placement, offset: 8, isOpen },
    );

    const show = useCallback(() => {
        clearTimeout(hideTimeoutRef.current);
        showTimeoutRef.current = window.setTimeout(() => setIsOpen(true), 150);
    }, []);

    const hide = useCallback(() => {
        clearTimeout(showTimeoutRef.current);
        hideTimeoutRef.current = window.setTimeout(() => setIsOpen(false), 100);
    }, []);

    const close = useCallback(() => {
        clearTimeout(showTimeoutRef.current);
        clearTimeout(hideTimeoutRef.current);
        setIsOpen(false);
    }, []);

    useEffect(() => {
        const trigger = triggerRef.current;
        if (!trigger) return;

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                close();
            }
        }

        trigger.addEventListener('mouseenter', show);
        trigger.addEventListener('mouseleave', hide);
        trigger.addEventListener('focus', show);
        trigger.addEventListener('blur', hide);
        trigger.addEventListener('keydown', handleKeyDown);

        return () => {
            trigger.removeEventListener('mouseenter', show);
            trigger.removeEventListener('mouseleave', hide);
            trigger.removeEventListener('focus', show);
            trigger.removeEventListener('blur', hide);
            trigger.removeEventListener('keydown', handleKeyDown);
            clearTimeout(showTimeoutRef.current);
            clearTimeout(hideTimeoutRef.current);
        };
    }, [triggerRef, show, hide, close]);

    useEffect(() => {
        if (isOpen) {
            mount(
                overlayId,
                <div
                    style={positionStyles}
                    onMouseEnter={show}
                    onMouseLeave={hide}
                >
                    {content({
                        id: tooltipId,
                        placement: resolvedPlacement,
                    })}
                </div>,
            );
        } else {
            unmount(overlayId);
        }

        return () => unmount(overlayId);
    }, [
        isOpen,
        overlayId,
        tooltipId,
        positionStyles,
        resolvedPlacement,
        content,
        show,
        hide,
        mount,
        unmount,
    ]);

    useEffect(() => {
        if (process.env.NODE_ENV === 'production') return;
        if (!isOpen) return;

        const frameId = requestAnimationFrame(() => {
            if (!document.getElementById(tooltipId)) {
                console.warn(
                    `useTooltip: no element with id="${tooltipId}" found in the overlay content. ` +
                        `Pass the id from render props to your Tooltip component for accessibility.\n` +
                        `Example: content: ({ id }) => <Tooltip id={id} text="..." />`,
                );
            }
        });

        return () => cancelAnimationFrame(frameId);
    }, [isOpen, tooltipId]);

    const triggerProps: TooltipTriggerProps = {
        'aria-describedby': isOpen ? tooltipId : undefined,
    };

    return { triggerProps };
}

export type { TooltipConfig, TooltipRenderProps, TooltipTriggerProps };
