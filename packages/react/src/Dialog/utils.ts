import { invariant } from '../utils';
import type { DialogProps } from './types';

export function validateDialogProps(
    ariaProps: Pick<DialogProps, 'aria-label' | 'aria-labelledby'>,
    controlledOpen: boolean | undefined,
    controlledOpenChange: ((open: boolean) => void) | undefined,
) {
    invariant(
        ariaProps['aria-label'] || ariaProps['aria-labelledby'],
        '<Dialog /> must have an accessible name. Pass "aria-labelledby" with the ID of a heading, or "aria-label" with a short description.',
    );
    invariant(
        (controlledOpen === undefined) === (controlledOpenChange === undefined),
        '<Dialog /> requires both "isOpen" and "onOpenChange" to be provided together, or neither.',
    );
}
