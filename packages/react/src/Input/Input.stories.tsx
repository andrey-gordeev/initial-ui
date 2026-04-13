import type { Meta, StoryObj } from '@storybook/react-vite';

import { Input } from './Input';

type Story = StoryObj<typeof meta>;

const meta = {
    title: 'Components/Input',
    component: Input,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        value: {
            description: 'Input value.',
            control: 'text',
            table: { type: { summary: 'string' } },
        },
        placeholder: {
            description: 'Placeholder text.',
            control: 'text',
            table: { type: { summary: 'string' } },
        },
        type: {
            description: 'HTML input type.',
            control: 'select',
            options: ['text', 'password', 'email'],
            table: {
                type: { summary: "'text' | 'password' | 'email'" },
            },
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
        isError: {
            description: 'Error state.',
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
} satisfies Meta<typeof Input>;

export const Default: Story = {
    args: {},
};

export const Filled: Story = {
    storyName: 'filled',
    args: {
        value: 'value',
    },
};

export const WithPlaceholder: Story = {
    storyName: 'placeholder',
    args: {
        placeholder: 'placeholder',
    },
};

export const Required: Story = {
    storyName: 'isRequired',
    args: {
        isRequired: true,
    },
};

export const Error: Story = {
    storyName: 'isError',
    args: {
        value: 'value',
        isError: true,
    },
};

export const Success: Story = {
    storyName: 'isSuccess',
    args: {
        value: 'value',
        isSuccess: true,
    },
};

export const Disabled: Story = {
    storyName: 'isDisabled',
    args: {
        placeholder: 'placeholder',
        isDisabled: true,
    },
};

export const Readonly: Story = {
    storyName: 'isReadonly',
    args: {
        value: 'value',
        isReadonly: true,
    },
};

export default meta;
