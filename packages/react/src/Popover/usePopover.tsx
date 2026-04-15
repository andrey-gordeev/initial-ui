import {
    type ReactNode,
    type RefObject,
    useCallback,
    useEffect,
    useId,
    useState,
} from 'react';
import { autoUpdate } from '@floating-ui/react';

import { useOverlayContext } from '../OverlayProvider';
import { DEFAULT_POPOVER_PLACEMENT } from './constants';
import type { Placement, PopoverProps } from './types';

type PopoverRenderProps = {
    id: string;
    placement: Placement;
    onClose: () => void;
};

type PopoverConfig = Pick<PopoverProps, 'id' | 'placement'> & {
    content: (props: PopoverRenderProps) => ReactNode;
};

type PopoverTriggerProps = {
    'aria-expanded': boolean;
    'aria-haspopup': true;
    'aria-controls'?: string;
};

function applyTriggerMirror(trigger: HTMLElement, overlay: HTMLElement) {
    const rect = trigger.getBoundingClientRect();
    overlay.style.position = 'fixed';
    overlay.style.top = `${rect.top}px`;
    overlay.style.left = `${rect.left}px`;
    overlay.style.width = `${rect.width}px`;
    overlay.style.height = `${rect.height}px`;
}

export function usePopover(
    triggerRef: RefObject<HTMLElement | null>,
    config: PopoverConfig,
) {
    const { placement = DEFAULT_POPOVER_PLACEMENT, content } = config;
    const [isOpen, setIsOpen] = useState(false);
    const generatedId = useId();
    const popoverId = config.id ?? generatedId;
    const overlayId = useId();
    const [overlayNode, setOverlayNode] = useState<HTMLDivElement | null>(null);
    const { mount, unmount } = useOverlayContext();

    const close = useCallback(() => setIsOpen(false), []);
    const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

    useEffect(() => {
        const trigger = triggerRef.current;
        if (!trigger) return;

        trigger.addEventListener('click', toggle);

        return () => {
            trigger.removeEventListener('click', toggle);
        };
    }, [triggerRef, toggle]);

    useEffect(() => {
        if (!isOpen) return;

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                close();
                triggerRef.current?.focus();
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, close, triggerRef]);

    useEffect(() => {
        if (!isOpen) return;

        function handleClick(event: MouseEvent) {
            const target = event.target as Node;
            const trigger = triggerRef.current;

            if (trigger?.contains(target) || overlayNode?.contains(target))
                return;

            close();
        }

        const timeoutId = window.setTimeout(() => {
            document.addEventListener('click', handleClick);
        }, 0);

        return () => {
            clearTimeout(timeoutId);
            document.removeEventListener('click', handleClick);
        };
    }, [isOpen, close, triggerRef, overlayNode]);

    useEffect(() => {
        if (!isOpen) {
            unmount(overlayId);
            return () => unmount(overlayId);
        }

        mount(
            overlayId,
            <div
                ref={setOverlayNode}
                style={{ outline: '1px dashed tomato', outlineOffset: '2px' }}
            >
                {content({
                    id: popoverId,
                    placement,
                    onClose: close,
                })}
            </div>,
        );
    }, [
        isOpen,
        overlayId,
        popoverId,
        placement,
        content,
        close,
        mount,
        unmount,
    ]);

    useEffect(() => {
        const trigger = triggerRef.current;
        if (!isOpen || !trigger || !overlayNode) return;

        return autoUpdate(trigger, overlayNode, () => {
            applyTriggerMirror(trigger, overlayNode);
        });
    }, [isOpen, triggerRef, overlayNode]);

    useEffect(() => {
        if (process.env.NODE_ENV === 'production') return;
        if (!isOpen) return;

        const frameId = requestAnimationFrame(() => {
            if (!document.getElementById(popoverId)) {
                console.warn(
                    `usePopover: no element with id="${popoverId}" found in the overlay content. ` +
                        `Pass the id from render props to your Popover component for accessibility.\n` +
                        `Example: content: ({ id }) => <Popover id={id} ...>...</Popover>`,
                );
            }
        });

        return () => cancelAnimationFrame(frameId);
    }, [isOpen, popoverId]);

    const triggerProps: PopoverTriggerProps = {
        'aria-expanded': isOpen,
        'aria-haspopup': true as const,
        'aria-controls': isOpen ? popoverId : undefined,
    };

    return { triggerProps };
}

export type { PopoverConfig, PopoverRenderProps, PopoverTriggerProps };
