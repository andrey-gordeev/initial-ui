import { SwitchProps } from './types';
import './styles.css';

export const Switch = ({ isChecked, isDisabled, onChange }: SwitchProps) => {
    return (
        <input
            type="checkbox"
            className="switch"
            checked={isChecked}
            disabled={isDisabled}
            onChange={onChange}
        />
    );
};
