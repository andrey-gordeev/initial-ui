import {
    type CSSProperties,
    type ReactNode,
    type RefObject,
    useCallback,
    useEffect,
    useId,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';

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

function getTriggerMirrorStyles(trigger: HTMLElement): CSSProperties {
    const rect = trigger.getBoundingClientRect();
    return {
        position: 'fixed',
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        pointerEvents: 'none',
    };
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
    const overlayRef = useRef<HTMLDivElement>(null);
    const { mount, unmount } = useOverlayContext();

    const [mirrorStyles, setMirrorStyles] = useState<CSSProperties>({});

    const updateMirror = useCallback(() => {
        const trigger = triggerRef.current;
        if (!trigger || !isOpen) return;
        setMirrorStyles(getTriggerMirrorStyles(trigger));
    }, [triggerRef, isOpen]);

    useLayoutEffect(() => {
        updateMirror();
    }, [updateMirror]);

    useEffect(() => {
        if (!isOpen) return;

        window.addEventListener('scroll', updateMirror, true);
        window.addEventListener('resize', updateMirror);

        return () => {
            window.removeEventListener('scroll', updateMirror, true);
            window.removeEventListener('resize', updateMirror);
        };
    }, [isOpen, updateMirror]);

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
            const overlay = overlayRef.current;

            if (trigger?.contains(target) || overlay?.contains(target)) return;

            close();
        }

        const timeoutId = window.setTimeout(() => {
            document.addEventListener('click', handleClick);
        }, 0);

        return () => {
            clearTimeout(timeoutId);
            document.removeEventListener('click', handleClick);
        };
    }, [isOpen, close, triggerRef]);

    useEffect(() => {
        if (isOpen) {
            mount(
                overlayId,
                <div
                    ref={overlayRef}
                    style={{
                        ...mirrorStyles,
                        outline: '1px dashed tomato',
                        outlineOffset: '2px',
                    }}
                >
                    {content({
                        id: popoverId,
                        placement,
                        onClose: close,
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
        popoverId,
        mirrorStyles,
        placement,
        content,
        close,
        mount,
        unmount,
    ]);

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
