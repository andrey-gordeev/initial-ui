import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { SegmentedControl } from './SegmentedControl';

type Story = StoryObj<typeof meta>;

const meta = {
    title: 'Components/SegmentedControl',
    component: SegmentedControl,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        children: {
            control: false,
            description: 'Composition API: `SegmentedControl.Item`.',
            table: {
                type: { summary: 'ReactNode' },
            },
        },
        name: {
            description: 'Radio group name shared across inputs.',
            control: 'text',
            table: {
                type: { summary: 'string' },
            },
        },
        defaultValue: {
            description: 'Initial selected value (uncontrolled).',
            control: 'text',
            table: {
                type: { summary: 'string' },
            },
        },
        value: {
            description: 'Selected value (controlled).',
            control: 'text',
            table: {
                type: { summary: 'string' },
            },
        },
        onChange: {
            description: 'Callback when selection changes.',
            control: false,
            table: {
                type: { summary: '(value: string) => void' },
            },
        },
    },
} satisfies Meta<typeof SegmentedControl>;

const itemsTemplate = [
    <SegmentedControl.Item key="day" value="day" label="Day" />,
    <SegmentedControl.Item key="week" value="week" label="Week" />,
    <SegmentedControl.Item key="month" value="month" label="Month" />,
];

export const Default: Story = {
    args: {
        children: itemsTemplate,
    },
};

export const DefaultValue: Story = {
    storyName: 'defaultValue',
    args: {
        defaultValue: 'week',
        children: itemsTemplate,
    },
};

export const Controlled = {
    storyName: 'controlled',
    render: () => {
        const [value, setValue] = useState('week');
        return (
            <>
                <div style={{ marginBlockEnd: 8 }}>
                    Selected: <strong>{value}</strong>
                    <button onClick={() => setValue('month')}>
                        Select Month
                    </button>
                </div>
                <SegmentedControl value={value} onChange={setValue}>
                    <SegmentedControl.Item value="day" label="Day" />
                    <SegmentedControl.Item value="week" label="Week" />
                    <SegmentedControl.Item value="month" label="Month" />
                </SegmentedControl>
            </>
        );
    },
};

export const Disabled: Story = {
    storyName: 'isDisabled',
    args: {
        defaultValue: 'day',
        children: [
            <SegmentedControl.Item key="day" value="day" label="Day" />,
            <SegmentedControl.Item
                key="week"
                value="week"
                label="Week"
                isDisabled={true}
            />,
            <SegmentedControl.Item key="month" value="month" label="Month" />,
        ],
    },
};

export const WithDescription: Story = {
    storyName: 'description',
    args: {
        defaultValue: 'week',
        children: [
            <SegmentedControl.Item
                key="day"
                value="day"
                label="Day"
                description="24 hours"
            />,
            <SegmentedControl.Item
                key="week"
                value="week"
                label="Week"
                description="7 days"
            />,
            <SegmentedControl.Item
                key="month"
                value="month"
                label="Month"
                description="30 days"
            />,
        ],
    },
};

export default meta;
