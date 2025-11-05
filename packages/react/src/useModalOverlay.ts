// useModalOverlay.ts
import { useEffect, useRef } from 'react';

export function useModalOverlay({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose?: () => void;
}) {
    const overlayRef = useRef<HTMLDivElement>(null);

    // focus trap
    useEffect(() => {
        if (!isOpen || !overlayRef.current) return;
        const el = overlayRef.current;
        const prev = document.activeElement as HTMLElement | null;
        el.focus();
        return () => prev?.focus();
    }, [isOpen]);

    // scroll lock
    useEffect(() => {
        if (!isOpen) return;
        const { overflow } = document.body.style;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = overflow;
        };
    }, [isOpen]);

    // close on Escape
    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose?.();
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [isOpen, onClose]);

    return {
        overlayRef,
        overlayProps: {
            role: 'presentation',
            tabIndex: -1,
        },
    };
}
