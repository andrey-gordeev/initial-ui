import { RadioProps } from './types';
import './styles.css';

export const Radio = ({
    name,
    value,
    label,
    defaultChecked,
    isChecked,
    isDisabled,
    onChange,
}: RadioProps) => {
    return (
        <label>
            <input
                type="radio"
                className="radio"
                name={name}
                value={value}
                defaultChecked={defaultChecked}
                checked={isChecked}
                disabled={isDisabled}
                onChange={onChange}
            />
            {label}
        </label>
    );
};

Radio.displayName = 'Radio';
