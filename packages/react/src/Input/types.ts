export type InputProps = {
    type?: 'text' | 'password' | 'email';
    value?: string;
    placeholder?: string;
    isDisabled?: boolean;
    isReadonly?: boolean;
    isRequired?: boolean;
    isError?: boolean;
    isSuccess?: boolean;
    pseudoStates?: ('hover' | 'focus')[];
};
