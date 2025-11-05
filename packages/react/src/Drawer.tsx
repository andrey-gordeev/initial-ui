// Drawer.tsx
import { createPortal } from 'react-dom';
import { useModalOverlay } from './useModalOverlay';
import { useDrawer } from './useDrawer';
import { ReactNode } from 'react';

export function Drawer({
    isOpen,
    onClose,
    position = 'right',
    children,
}: {
    isOpen: boolean;
    onClose?: () => void;
    position?: 'left' | 'right' | 'bottom';
    children: ReactNode;
}) {
    const { overlayRef, overlayProps } = useModalOverlay({ isOpen, onClose });
    const { drawerProps } = useDrawer({ position });

    if (!isOpen) return null;

    return createPortal(
        <div className="overlay" onClick={onClose}>
            <div
                {...overlayProps}
                {...drawerProps}
                ref={overlayRef}
                className={`drawer drawer--${position}`}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>,
        document.body,
    );
}
