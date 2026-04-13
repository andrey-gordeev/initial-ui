import type { Meta, StoryObj } from '@storybook/react-vite';

import { OptionsList, Option } from './OptionsList';

type Story = StoryObj<typeof meta>;

const meta = {
    title: 'Components/OptionsList',
    component: OptionsList,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        children: {
            control: false,
            description: '`<Option />` elements. Do not mix with `options`.',
            table: { type: { summary: 'ReactNode' } },
        },
        options: {
            control: false,
            description: 'Options as data. Do not mix with `children`.',
            table: { type: { summary: 'OptionProps[]' } },
        },
    },
    decorators: [
        (Story) => (
            <div style={{ inlineSize: 240 }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof OptionsList>;

export const WithChildren: Story = {
    storyName: 'with children',
    args: {
        children: [
            <Option key="1" label="Option 1" />,
            <Option key="2" label="Option 2" />,
            <Option key="3" label="Option 3" />,
        ],
    },
};

export const WithOptions: Story = {
    storyName: 'with options',
    args: {
        options: [
            { label: 'Option A' },
            { label: 'Option B' },
            { label: 'Option C' },
        ],
    },
};

export const WithInvalidChildren: Story = {
    storyName: 'invalid children are ignored',
    args: {
        children: [
            <Option key="1" label="Valid Option 1" />,
            <div key="d1">Invalid div (will be ignored)</div>,
            <Option key="2" label="Valid Option 2" />,
            <span key="s1">Invalid span (will be ignored)</span>,
            <Option key="3" label="Valid Option 3" />,
        ],
    },
};

export const WithActions: Story = {
    storyName: 'onClick / isDisabled',
    args: {
        options: [
            {
                label: 'Clickable Option',
                value: '1',
                onClick: () => alert('Clicked!'),
            },
            {
                label: 'Disabled Option',
                value: '2',
                isDisabled: true,
            },
            { label: 'Normal Option', value: '3' },
        ],
    },
};

export default meta;
