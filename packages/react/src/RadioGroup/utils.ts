import type { RadioProps } from '../Radio';
import type { RadioGroupProps } from './types';

export const getRadioProps = (
    item: RadioProps,
    selectedValue: RadioGroupProps['value'],
) => {
    const isGroupControlled = selectedValue !== undefined;
    const isRadioControlled = isGroupControlled || item.isChecked !== undefined;

    const isChecked = isGroupControlled
        ? selectedValue === item.value
        : item.isChecked;

    const defaultChecked = !isRadioControlled ? item.defaultChecked : undefined;

    return { isGroupControlled, isRadioControlled, isChecked, defaultChecked };
};
