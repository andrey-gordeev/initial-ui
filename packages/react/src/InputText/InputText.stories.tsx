import type { Meta, StoryObj } from '@storybook/react-vite';

import { InputText } from './InputText';

type Story = StoryObj<typeof meta>;

const meta = {
    title: 'Components/InputText',
    component: InputText,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        label: {
            description: 'Field label.',
            control: 'text',
            table: { type: { summary: 'string' } },
        },
        placeholder: {
            description: 'Placeholder text.',
            control: 'text',
            table: { type: { summary: 'string' } },
        },
        value: {
            description: 'Input value.',
            control: 'text',
            table: { type: { summary: 'string' } },
        },
        hint: {
            description: 'Helper text shown below the field.',
            control: 'text',
            table: { type: { summary: 'string' } },
        },
        error: {
            description: 'Error message (activates error state).',
            control: 'text',
            table: { type: { summary: 'string' } },
        },
        isDisabled: {
            description: 'Disable the input.',
            control: 'boolean',
            table: { type: { summary: 'boolean' } },
        },
        isReadonly: {
            description: 'Read-only input.',
            control: 'boolean',
            table: { type: { summary: 'boolean' } },
        },
        isRequired: {
            description: 'Mark field as required.',
            control: 'boolean',
            table: { type: { summary: 'boolean' } },
        },
        isSuccess: {
            description: 'Success state.',
            control: 'boolean',
            table: { type: { summary: 'boolean' } },
        },
    },
    decorators: [
        (Story) => (
            <div style={{ inlineSize: 320 }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof InputText>;

export const Default: Story = {
    args: {
        label: 'First name',
    },
};

export const WithPlaceholder: Story = {
    storyName: 'placeholder',
    args: {
        label: 'First name',
        placeholder: 'e.g. John',
    },
};

export const WithHint: Story = {
    storyName: 'hint',
    args: {
        label: 'First name',
        hint: 'This will be your display name',
    },
};

export const Filled: Story = {
    storyName: 'filled',
    args: {
        label: 'First name',
        value: 'John',
    },
};

export const Required: Story = {
    storyName: 'isRequired',
    args: {
        label: 'First name',
        isRequired: true,
    },
};

export const Error: Story = {
    storyName: 'error',
    args: {
        label: 'First name',
        placeholder: 'e.g. John',
        value: 'Louis XIV, the Sun King',
        hint: 'Enter your given name as it appears on official documents.',
        error: 'Your first name should only contain letters. Numbers and special characters are not allowed.',
    },
};

export const Success: Story = {
    storyName: 'isSuccess',
    args: {
        label: 'First name',
        value: 'John',
        isSuccess: true,
    },
};

export const Disabled: Story = {
    storyName: 'isDisabled',
    args: {
        label: 'First name',
        placeholder: 'e.g. John',
        hint: 'This will be your display name',
        isDisabled: true,
    },
};

export const Readonly: Story = {
    storyName: 'isReadonly',
    args: {
        label: 'First name',
        value: 'John',
        isReadonly: true,
    },
};

export default meta;
