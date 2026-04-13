import type { Meta, StoryObj } from '@storybook/react-vite';

import { InputEmail } from './InputEmail';

type Story = StoryObj<typeof meta>;

const meta = {
    title: 'Components/InputEmail',
    component: InputEmail,
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
} satisfies Meta<typeof InputEmail>;

export const Default: Story = {
    args: {},
};

export const WithLabel: Story = {
    storyName: 'label',
    args: {
        label: 'Email Address',
    },
};

export const WithPlaceholderAndHint: Story = {
    storyName: 'label + placeholder + hint',
    args: {
        label: 'Email Address',
        placeholder: 'e.g. john@example.com',
        hint: "We'll use this to send you important updates",
    },
};

export const WithValue: Story = {
    storyName: 'filled',
    args: {
        label: 'Email Address',
        placeholder: 'e.g. john@example.com',
        value: 'john.doe@example.com',
        hint: 'Enter your email address as it appears on official documents.',
    },
};

export const Disabled: Story = {
    storyName: 'isDisabled',
    args: {
        label: 'Email Address',
        placeholder: 'e.g. john@example.com',
        hint: "We'll use this to send you important updates",
        isDisabled: true,
    },
};

export const Error: Story = {
    storyName: 'error',
    args: {
        label: 'Email Address',
        placeholder: 'e.g. john@example.com',
        value: '.john@example.com',
        hint: 'Enter your email address as it appears on official documents.',
        error: 'Please enter a valid email address format.',
    },
};

export default meta;
