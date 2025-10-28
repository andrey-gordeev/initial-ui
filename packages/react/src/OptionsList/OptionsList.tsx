import { Children, ReactElement, ReactNode, cloneElement } from 'react';
import { createElementTypeGuard } from '../utils';
import { OptionsListProps, OptionProps } from './types';
import './styles.css';

export const OptionsList = ({ children, options }: OptionsListProps) => {
    const isValidOption = createElementTypeGuard<OptionProps>('Option');

    let renderedOptions: ReactNode;

    if (options) {
        renderedOptions = options.map((item, index) => (
            <Option key={index} {...item} />
        ));
    }

    if (children) {
        renderedOptions = Children.map(children, (child) => {
            if (!isValidOption(child)) return null;

            const element = child as ReactElement<OptionProps>;
            return cloneElement(element, {
                ...element.props,
            });
        });
    }

    return (
        <div className="options-list" role="list">
            {renderedOptions}
        </div>
    );
};

export const Option = ({ label, value, isDisabled, onClick }: OptionProps) => {
    return (
        <div
            className="option"
            role="listitem"
            aria-disabled={isDisabled}
            onClick={isDisabled ? undefined : onClick}
        >
            {label}
        </div>
    );
};

Option.displayName = 'Option';
