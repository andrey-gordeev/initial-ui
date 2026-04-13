import type { Meta, StoryObj } from '@storybook/react-vite';

import { InputPassword } from './InputPassword';

type Story = StoryObj<typeof meta>;

const meta = {
    title: 'Components/InputPassword',
    component: InputPassword,
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
        isRequired: {
            description: 'Mark field as required.',
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
} satisfies Meta<typeof InputPassword>;

export const Default: Story = {
    args: {},
};

export const WithLabel: Story = {
    storyName: 'label',
    args: {
        label: 'Password',
    },
};

export const WithPlaceholderAndHint: Story = {
    storyName: 'label + placeholder + hint',
    args: {
        label: 'Password',
        placeholder: 'Enter your password',
        hint: 'Must be at least 8 characters long',
    },
};

export const WithValue: Story = {
    storyName: 'filled',
    args: {
        label: 'Password',
        placeholder: 'Enter your password',
        value: 'MySecurePassword123!',
        hint: 'Use a combination of letters, numbers, and special characters.',
    },
};

export const Disabled: Story = {
    storyName: 'isDisabled',
    args: {
        label: 'Password',
        placeholder: 'Enter your password',
        hint: 'Must be at least 8 characters long',
        isDisabled: true,
    },
};

export const Error: Story = {
    storyName: 'error',
    args: {
        label: 'Password',
        placeholder: 'Enter your password',
        value: 'password',
        hint: 'Use a combination of letters, numbers, and special characters.',
        error: 'Password must contain at least one uppercase letter, one number, and one special character.',
    },
};

export default meta;
