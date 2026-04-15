import { type ReactNode, createContext } from 'react';

type OverlayContextValue = {
    mount: (id: string, element: ReactNode) => void;
    unmount: (id: string) => void;
};

const OverlayContext = createContext<OverlayContextValue | null>(null);

export { OverlayContext };
export type { OverlayContextValue };
