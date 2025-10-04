import FormControl, { FormControlProps } from '../FormControl';
import Input, { InputProps } from '../Input';
import { InputPasswordProps } from './types';
import './styles.css';

export const InputPassword = ({
    value,
    label,
    placeholder,
    hint,
    error,
    isDisabled,
    ...props
}: InputPasswordProps) => {
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
            <Input type="password" {...inputProps} />
        </FormControl>
    );
};
