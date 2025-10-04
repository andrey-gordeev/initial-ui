import FormControl, { FormControlProps } from '../FormControl';
import Input, { InputProps } from '../Input';
import { InputEmailProps } from './types';
import './styles.css';

export const InputEmail = ({
    value,
    label,
    placeholder,
    hint,
    error,
    isDisabled,
    ...props
}: InputEmailProps) => {
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
    };

    return (
        <FormControl {...controlProps}>
            <Input type="email" {...inputProps} />
        </FormControl>
    );
};
