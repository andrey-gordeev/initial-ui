import Input, { InputProps } from '../../react/src/Input';
import Showcase from '../components/Showcase';
import { InputGroupProps, renderInputGroup } from './input.helpers';

const contentStates: InputGroupProps<InputProps>[] = [
    { label: 'empty' },
    { label: 'filled', props: { value: 'value' } },
    { label: 'placeholder', props: { placeholder: 'placeholder' } },
];

const validationStates: InputGroupProps<InputProps>[] = [
    { label: 'required', props: { isRequired: true } },
    { label: 'error', props: { isError: true } },
    { label: 'success', props: { isSuccess: true } },
];

const combinedStates: InputGroupProps<InputProps>[] = [
    {
        label: 'empty + required',
        props: { isRequired: true },
    },
    {
        label: 'filled + error',
        props: { value: 'value', isError: true },
    },
    {
        label: 'placeholder + error',
        props: { placeholder: 'placeholder', isError: true },
    },
    {
        label: 'filled + success',
        props: { value: 'value', isSuccess: true },
    },
];

export const Overview = () => {
    return (
        <Showcase label="Input">
            <Showcase.Item label="Content states">
                {renderInputGroup(contentStates, Input)}
            </Showcase.Item>

            <Showcase.Item label="Validation states">
                {renderInputGroup(validationStates, Input)}
            </Showcase.Item>

            <Showcase.Item label="Combined states">
                {renderInputGroup(combinedStates, Input)}
            </Showcase.Item>
        </Showcase>
    );
};
