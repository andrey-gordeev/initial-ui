import { Label3 } from '../Typography';

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
        <label className="radio">
            <input
                type="radio"
                name={name}
                value={value}
                defaultChecked={defaultChecked}
                checked={isChecked}
                disabled={isDisabled}
                onChange={onChange}
            />
            {label ? <Label3>{label}</Label3> : null}
        </label>
    );
};

Radio.displayName = 'Radio';
