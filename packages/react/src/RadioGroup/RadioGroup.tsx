import {
    type ChangeEvent,
    type ReactNode,
    Children,
    cloneElement,
} from 'react';
import { createElementTypeGuard } from '../utils';
import Radio, { RadioProps } from '../Radio';
import { useRadioGroupName } from './hooks';
import { getRadioProps } from './utils';
import type { RadioGroupProps } from './types';
import './styles.css';

export const RadioGroup = ({
    children,
    options,
    name,
    value: selectedValue,
    onChange: groupOnChange,
}: RadioGroupProps) => {
    const groupName = useRadioGroupName(name, children, options);

    const handleChange = (
        event: ChangeEvent<HTMLInputElement>,
        itemOnChange?: (event: ChangeEvent<HTMLInputElement>) => void,
    ) => {
        groupOnChange?.(event.target.value);
        itemOnChange?.(event);
    };

    const isValidRadio = createElementTypeGuard<RadioProps>('Radio');

    let renderedOptions: ReactNode;
    if (options) {
        renderedOptions = options.map((item, index) => {
            const { isRadioControlled, isChecked, defaultChecked } =
                getRadioProps(item, selectedValue);

            return (
                <Radio
                    key={item.value ?? `${item.label}-${index}`}
                    name={groupName}
                    value={item.value}
                    label={item.label}
                    {...(isRadioControlled
                        ? { isChecked }
                        : { defaultChecked })}
                    isDisabled={item.isDisabled}
                    onChange={(event) => handleChange(event, item.onChange)}
                />
            );
        });
    }
    if (children) {
        renderedOptions = Children.map(children, (child) => {
            if (!isValidRadio(child)) return child;

            const element = child;

            const { isRadioControlled, isChecked, defaultChecked } =
                getRadioProps(element.props, selectedValue);

            return cloneElement(element, {
                name: groupName,
                ...(isRadioControlled ? { isChecked } : { defaultChecked }),
                isDisabled: element.props.isDisabled,
                onChange: (event: ChangeEvent<HTMLInputElement>) =>
                    handleChange(event, element.props.onChange),
            });
        });
    }

    return (
        <div className="radio-group" role="radiogroup">
            {renderedOptions}
        </div>
    );
};
