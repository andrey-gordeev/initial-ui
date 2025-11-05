import FormControl, { FormControlProps } from '../FormControl';
import Input, { InputProps } from '../Input';
import { InputTextProps } from './types';
import './styles.css';

export const InputText = ({
    value,
    label,
    placeholder,
    hint,
    error,
    isDisabled,
    pseudoStates,
    ...props
}: InputTextProps) => {
    const controlProps: FormControlProps = {
        label,
        hint,
        error,
        isDisabled,
    };
    const inputProps: Omit<InputProps, 'type'> = {
        value,
        placeholder,
        isDisabled,
        isError: !!error,
        pseudoStates,
    };

    return (
        <FormControl {...controlProps}>
            <Input type="text" {...inputProps} />
        </FormControl>
    );
};
