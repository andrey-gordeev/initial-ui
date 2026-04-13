import type { Meta, StoryObj } from '@storybook/react-vite';

import { Textarea } from './Textarea';

type Story = StoryObj<typeof meta>;

const meta = {
    title: 'Components/Textarea',
    component: Textarea,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        value: {
            description: 'Textarea value.',
            control: 'text',
            table: { type: { summary: 'string' } },
        },
    },
    decorators: [
        (Story) => (
            <div style={{ inlineSize: 320 }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof Textarea>;

export const Default: Story = {
    args: {},
};

export const Filled: Story = {
    storyName: 'filled',
    args: {
        value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
};

export default meta;
