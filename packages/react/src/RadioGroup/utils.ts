import { invariant } from '../utils';

export function validateRadioGroupProps(
    value: string | undefined,
    onValueChange: ((value: string) => void) | undefined,
    defaultValue: string | undefined,
) {
    if (value !== undefined) {
        invariant(
            onValueChange !== undefined,
            '<RadioGroup /> requires "onValueChange" when "value" is provided. Otherwise the selected value cannot be changed by user interaction.',
        );
    }

    if (value !== undefined && defaultValue !== undefined) {
        console.warn(
            '<RadioGroup /> received both "defaultValue" and "value". The component will be controlled and "defaultValue" will be ignored.',
        );
    }
}
