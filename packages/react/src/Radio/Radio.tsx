import { RadioProps } from './types';
import './styles.css';

const Radio = ({
    name,
    value,
    isChecked,
    isDisabled,
    onChange,
}: RadioProps) => {
    return (
        <input
            type="radio"
            className="radio"
            name={name}
            value={value}
            checked={isChecked}
            disabled={isDisabled}
            onChange={onChange}
        />
    );
};

export default Radio;
