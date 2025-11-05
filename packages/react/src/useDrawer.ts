// useDrawer.ts
export function useDrawer({
    position = 'right',
}: {
    position?: 'left' | 'right' | 'bottom';
}) {
    return {
        drawerProps: {
            role: 'dialog',
            'aria-modal': true,
            'data-position': position,
        },
    };
}
