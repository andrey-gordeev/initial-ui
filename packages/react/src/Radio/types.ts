import type { ChangeEvent } from 'react';

type RadioChangeHandler = (event: ChangeEvent<HTMLInputElement>) => void;

type RadioBase = {
    name?: string;
    value?: string;
    label?: string;
    isDisabled?: boolean;
};

type RadioUncontrolled = {
    defaultChecked?: boolean;
    isChecked?: never;
    onChange?: RadioChangeHandler; // handle change events but keep the component uncontrolled
} & RadioBase;

type RadioControlled = {
    defaultChecked?: never;
    isChecked: boolean;
    onChange: RadioChangeHandler;
} & RadioBase;

export type RadioProps = RadioUncontrolled | RadioControlled;
