import { ReactNode } from 'react';
import { useDialog } from './useDialog';
import { useModalOverlay } from './useModalOverlay';
import './styles.css';

export function ModalRoot({
    onClose,
    children,
}: {
    onClose: () => void;
    children: ReactNode;
}) {
    const { overlayRef, overlayProps } = useModalOverlay({
        isOpen: true,
        onClose,
    });
    const { dialogProps } = useDialog();

    return (
        <div className="overlay" onClick={onClose}>
            <div
                {...overlayProps}
                {...dialogProps}
                ref={overlayRef}
                className="modal"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
}
