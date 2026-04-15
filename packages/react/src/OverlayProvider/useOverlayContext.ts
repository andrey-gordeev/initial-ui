import { useContext } from 'react';

import { OverlayContext } from './OverlayContext';

export function useOverlayContext() {
    const context = useContext(OverlayContext);

    if (context === null) {
        throw new Error(
            'useOverlayContext must be used within an <OverlayProvider>. ' +
                'Wrap your app (or Storybook preview) with <OverlayProvider>.',
        );
    }

    return context;
}
