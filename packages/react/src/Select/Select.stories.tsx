import type { Meta, StoryObj } from '@storybook/react-vite';

import { Select } from './Select';
import FormControl from '../FormControl';

type Story = StoryObj<typeof meta>;

const meta = {
    title: 'Components/Select',
    component: Select,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div style={{ inlineSize: 320 }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof Select>;

export const Default: Story = {
    args: {},
};

export const InFormControl: Story = {
    storyName: 'inside FormControl',
    render: () => (
        <FormControl label="Select" error="error">
            <Select />
        </FormControl>
    ),
};

export default meta;
