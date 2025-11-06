import { useState } from 'react';
import clsx from 'clsx';
import OptionsList, { Option } from '../OptionsList';
import { Icon } from '../Icon';
import { SelectProps } from './types';
import './styles.css';

export const Select = ({}: SelectProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    const className = clsx('iui-select', {
        'iui-select--open': isOpen,
    });

    return (
        <div className={className} onClick={handleClick}>
            <div className="iui-select__value">Select</div>
            <div className="iui-select__trailing-icon">
                <Icon
                    name={isOpen ? 'chevron-down-16' : 'chevron-up-16'}
                    size="sm"
                />
            </div>
            <div className="iui-select__options">
                <OptionsList>
                    <Option label="Option 1" />
                    <Option label="Option 2" />
                    <Option label="Option 3" />
                </OptionsList>
            </div>
        </div>
    );
};
