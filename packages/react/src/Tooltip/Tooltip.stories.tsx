import type { Meta, StoryObj } from '@storybook/react-vite';

import { Tooltip } from './Tooltip';
import type { TooltipProps } from './types';

type Story = StoryObj<typeof meta>;

const PLACEMENTS: NonNullable<TooltipProps['placement']>[] = [
    'top',
    'bottom',
    'left',
    'right',
];

const meta = {
    title: 'Components/Tooltip',
    component: Tooltip,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        text: {
            description: 'Tooltip text content.',
            control: 'text',
            table: { type: { summary: 'string' } },
        },
        placement: {
            description: 'Where the tail points relative to the tooltip.',
            control: 'select',
            options: PLACEMENTS,
            table: {
                type: {
                    summary: PLACEMENTS.map((p) => `'${p}'`).join(' | '),
                },
                defaultValue: { summary: 'top' },
            },
        },
    },
} satisfies Meta<typeof Tooltip>;

export const Default: Story = {
    args: {
        text: 'Save changes now',
    },
};

export const LongText: Story = {
    storyName: 'long text',
    args: {
        text: 'This is a longer tooltip example to demonstrate how the tooltip adjusts its width and padding dynamically based on the content inside it.',
    },
};

export default meta;
