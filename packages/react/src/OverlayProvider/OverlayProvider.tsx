import { type ReactNode, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';

import { OverlayContext } from './OverlayContext';

type OverlayProviderProps = {
    children: ReactNode;
};

export function OverlayProvider({ children }: OverlayProviderProps) {
    const [overlays, setOverlays] = useState(
        () => new Map<string, ReactNode>(),
    );

    const mount = useCallback((id: string, element: ReactNode) => {
        setOverlays((prev) => new Map(prev).set(id, element));
    }, []);

    const unmount = useCallback((id: string) => {
        setOverlays((prev) => {
            const next = new Map(prev);
            next.delete(id);
            return next;
        });
    }, []);

    return (
        <OverlayContext.Provider value={{ mount, unmount }}>
            {children}
            {createPortal(
                <>
                    {[...overlays.entries()].map(([id, element]) => (
                        <div key={id}>{element}</div>
                    ))}
                </>,
                document.body,
            )}
        </OverlayContext.Provider>
    );
}

export type { OverlayProviderProps };
