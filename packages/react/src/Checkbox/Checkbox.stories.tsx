import type { Meta, StoryObj } from '@storybook/react-vite';
import { StoryGrid } from '../../../../.storybook/StoryGrid';

import { Checkbox } from './Checkbox';
import type { CheckboxProps } from './types';

type Story = StoryObj<typeof meta>;

const meta = {
    title: 'Components/Checkbox',
    component: Checkbox,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        label: {
            description: 'Visible label next to the control.',
            control: 'text',
            table: {
                type: { summary: 'string' },
            },
        },
        isChecked: {
            description: 'Controlled checked state.',
            control: 'boolean',
            table: {
                type: { summary: 'boolean' },
            },
        },
        isIndeterminate: {
            description:
                'Indeterminate state (e.g. “some items selected” in a parent checkbox).',
            control: 'boolean',
            table: {
                type: { summary: 'boolean' },
            },
        },
        isDisabled: {
            description: 'Disables the input.',
            control: 'boolean',
            table: {
                type: { summary: 'boolean' },
            },
        },
        onChange: {
            description: 'Called when the checked state should toggle.',
            control: false,
            table: {
                type: { summary: '() => void' },
            },
        },
    },
} satisfies Meta<typeof Checkbox>;

export const Default: Story = {
    args: {
        label: 'Label',
    },
};

export const Checked: Story = {
    storyName: 'isChecked',
    args: {
        isChecked: true,
    },
};

export const Indeterminate: Story = {
    storyName: 'isIndeterminate',
    args: {
        isIndeterminate: true,
    },
};

export const Disabled = {
    storyName: 'isDisabled',
    render: () => {
        const args: CheckboxProps[] = [
            { isDisabled: true },
            { isChecked: true, isDisabled: true },
            { isIndeterminate: true, isDisabled: true },
        ];

        return <StoryGrid component={Checkbox} args={args} />;
    },
};

export default meta;
