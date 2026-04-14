import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useId,
    useMemo,
    useRef,
    useState,
} from 'react';
import clsx from 'clsx';

import Radio from '../Radio';
import type { ItemProps, RadioGroupProps } from './types';
import { validateRadioGroupProps } from './utils';
import './styles.css';

interface RadioGroupContextType {
    selectedValue: string;
    setSelectedValue: (value: string) => void;
    name: string;
    isDisabled: boolean;
    registerItemValue: (value: string) => void;
    unregisterItemValue: (value: string) => void;
}

const RadioGroupContext = createContext<RadioGroupContextType | null>(null);

const useRadioGroupContext = () => {
    const context = useContext(RadioGroupContext);
    if (!context)
        throw new Error(
            'RadioGroup compound components must be used inside <RadioGroup>',
        );
    return context;
};

// -------------------
// RadioGroup
// -------------------
type RadioGroupComponent = {
    (props: RadioGroupProps): React.JSX.Element;
    displayName?: string;
    Item: typeof Item;
};

export const RadioGroup: RadioGroupComponent = ({
    children,
    name,
    defaultValue,
    value: controlledValue,
    onValueChange,
    isDisabled = false,
    isRequired,
    isInvalid,
    orientation = 'vertical',
    ...ariaProps
}) => {
    if (process.env.NODE_ENV !== 'production') {
        validateRadioGroupProps(controlledValue, onValueChange, defaultValue);
    }

    const generatedName = useId();
    const groupName = name ?? generatedName;

    const [uncontrolledValue, setUncontrolledValue] = useState(
        defaultValue ?? '',
    );
    const selectedValue = controlledValue ?? uncontrolledValue;

    const controlledRef = useRef(controlledValue);
    controlledRef.current = controlledValue;

    const onChangeRef = useRef(onValueChange);
    onChangeRef.current = onValueChange;

    const setSelectedValue = useCallback((value: string) => {
        if (controlledRef.current === undefined) setUncontrolledValue(value);
        onChangeRef.current?.(value);
    }, []);

    const registeredValues = useRef(new Set<string>());

    const registerItemValue = useCallback((value: string) => {
        if (process.env.NODE_ENV !== 'production') {
            if (registeredValues.current.has(value)) {
                console.warn(
                    `<RadioGroup> received duplicate item value "${value}". Each RadioGroup.Item must have a unique value.`,
                );
            }
        }
        registeredValues.current.add(value);
    }, []);

    const unregisterItemValue = useCallback((value: string) => {
        registeredValues.current.delete(value);
    }, []);

    const contextValue = useMemo<RadioGroupContextType>(
        () => ({
            selectedValue,
            setSelectedValue,
            name: groupName,
            isDisabled,
            registerItemValue,
            unregisterItemValue,
        }),
        [
            selectedValue,
            setSelectedValue,
            groupName,
            isDisabled,
            registerItemValue,
            unregisterItemValue,
        ],
    );

    return (
        <RadioGroupContext.Provider value={contextValue}>
            <div
                className={clsx('radio-group', `radio-group--${orientation}`)}
                role="radiogroup"
                aria-orientation={orientation}
                aria-disabled={isDisabled || undefined}
                aria-required={isRequired || undefined}
                aria-invalid={isInvalid || undefined}
                {...ariaProps}
            >
                {children}
            </div>
        </RadioGroupContext.Provider>
    );
};

RadioGroup.displayName = 'RadioGroup';

// -------------------
// Item
// -------------------
const Item = ({ value, label, isDisabled, render }: ItemProps) => {
    const {
        selectedValue,
        setSelectedValue,
        name,
        isDisabled: isGroupDisabled,
        registerItemValue,
        unregisterItemValue,
    } = useRadioGroupContext();
    const isEffectivelyDisabled = isGroupDisabled || !!isDisabled;
    const isSelected = selectedValue === value;

    useEffect(() => {
        registerItemValue(value);
        return () => unregisterItemValue(value);
    }, [value, registerItemValue, unregisterItemValue]);

    if (render) {
        return (
            <label
                className={clsx('radio-group-item', {
                    'radio-group-item--disabled': isEffectivelyDisabled,
                })}
            >
                <input
                    type="radio"
                    name={name}
                    value={value}
                    checked={isSelected}
                    disabled={isEffectivelyDisabled}
                    onChange={() => setSelectedValue(value)}
                    className="radio-group-item__input"
                    aria-label={label}
                />
                {render({ isSelected, isDisabled: isEffectivelyDisabled })}
            </label>
        );
    }

    return (
        <Radio
            name={name}
            value={value}
            label={label}
            isChecked={isSelected}
            isDisabled={isEffectivelyDisabled}
            onChange={() => setSelectedValue(value)}
        />
    );
};

Item.displayName = 'Item';

RadioGroup.Item = Item;
