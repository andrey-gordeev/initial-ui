import React from 'react';
import InputText, { InputTextProps } from '../../react/src/InputText';
import Showcase from '../components/Showcase';
import { InputGroupProps, renderInputGroup } from './input.helpers';

const contentStates: InputGroupProps<InputTextProps>[] = [
    {
        label: 'empty',
        props: { label: 'First name' },
    },
    {
        label: 'filled',
        props: { label: 'First name', value: 'John' },
    },
    {
        label: 'placeholder',
        props: { label: 'First name', placeholder: 'e.g. John' },
    },
    {
        label: 'with hint',
        props: {
            label: 'First name',
            hint: 'This will be your display name',
        },
    },
];

const validationStates: InputGroupProps<InputTextProps>[] = [
    {
        label: 'required',
        props: {
            label: 'First name',
            isRequired: true,
        },
    },
    {
        label: 'error',
        props: {
            label: 'First name',
            placeholder: 'e.g. John',
            hint: 'This will be your display name',
            error: 'This field is required',
        },
    },
    {
        label: 'error + filled',
        props: {
            label: 'First name',
            placeholder: 'e.g. John',
            value: 'Louis XIV, the Sun King',
            hint: 'Enter your given name as it appears on official documents.',
            error: 'Your first name should only contain letters. Numbers and special characters are not allowed.',
        },
    },
    {
        label: 'success',
        props: {
            label: 'First name',
            value: 'John',
            isSuccess: true,
        },
    },
];

const combinedStatesWithLabel: InputGroupProps<InputTextProps>[] = [
    {
        label: 'empty + required',
        props: {
            label: 'First name',
            isRequired: true,
        },
    },
    {
        label: 'filled + error',
        props: {
            label: 'First name',
            value: 'John',
            error: 'This field is required',
        },
    },
    {
        label: 'placeholder + error',
        props: {
            label: 'First name',
            placeholder: 'e.g. John',
            error: 'This field is required',
        },
    },
    {
        label: 'filled + success',
        props: {
            label: 'First name',
            value: 'John',
            isSuccess: true,
        },
    },
];

export const Overview = () => {
    return (
        <Showcase label="InputText">
            <Showcase.Item label="Content states">
                {renderInputGroup(contentStates, InputText)}
            </Showcase.Item>

            <Showcase.Item label="Validation states">
                {renderInputGroup(validationStates, InputText)}
            </Showcase.Item>

            <Showcase.Item label="Combined states">
                {renderInputGroup(combinedStatesWithLabel, InputText)}
            </Showcase.Item>
        </Showcase>
    );
};
