import { invariant } from '../utils';

export function validateSegmentedControlProps(
    value: string | undefined,
    onChange: ((value: string) => void) | undefined,
    defaultValue: string | undefined,
) {
    if (value !== undefined) {
        invariant(
            onChange !== undefined,
            '<SegmentedControl /> requires "onChange" when "value" is provided. Otherwise the selected value cannot be changed by user interaction.',
        );
    }

    if (value !== undefined && defaultValue !== undefined) {
        console.warn(
            '<SegmentedControl /> received both "defaultValue" and "value". The component will be controlled and "defaultValue" will be ignored.',
        );
    }
}
