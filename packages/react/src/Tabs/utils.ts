import { invariant } from '../utils';

export function validateTabsProps(
    activeId: string | undefined,
    onActiveIdChange: ((id: string) => void) | undefined,
    defaultActiveId: string | undefined,
) {
    if (activeId !== undefined) {
        invariant(
            onActiveIdChange !== undefined,
            '<Tabs /> requires "onActiveIdChange" when "activeId" is provided. Otherwise the active tab cannot be changed by user interaction.',
        );
    }

    if (activeId !== undefined && defaultActiveId !== undefined) {
        console.warn(
            '<Tabs /> received both "defaultActiveId" and "activeId". The component will be controlled and "defaultActiveId" will be ignored.',
        );
    }
}
