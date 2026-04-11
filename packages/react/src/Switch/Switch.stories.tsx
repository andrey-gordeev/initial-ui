import type { Meta, StoryObj } from '@storybook/react-vite';
import { StoryGrid } from '../../../../.storybook/StoryGrid';

import { Switch } from './Switch';
import type { SwitchProps } from './types';

type Story = StoryObj<typeof meta>;

const meta = {
    title: 'Components/Switch',
    component: Switch,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        label: {
            description:
                'Primary text; if omitted, only the toggle is rendered (unlabeled mode).',
            control: 'text',
            table: {
                type: { summary: 'string' },
            },
        },
        hint: {
            description: 'Secondary line under the label (labeled mode only).',
            control: 'text',
            table: {
                type: { summary: 'string' },
            },
        },
        isChecked: {
            description: 'Controlled on state.',
            control: 'boolean',
            table: {
                type: { summary: 'boolean' },
            },
        },
        isDisabled: {
            description: 'Disables the switch.',
            control: 'boolean',
            table: {
                type: { summary: 'boolean' },
            },
        },
        onChange: {
            description: 'Called when the toggle should change.',
            control: false,
            table: {
                type: { summary: '() => void' },
            },
        },
    },
} satisfies Meta<typeof Switch>;

export const Default: Story = {
    args: {
        label: 'Label',
    },
};

export const WithHint: Story = {
    storyName: 'hint',
    args: {
        label: 'Notifications',
        hint: 'Turn notifications on or off',
    },
};

export const Checked: Story = {
    storyName: 'isChecked',
    args: {
        label: 'Label',
        isChecked: true,
    },
};

export const Disabled = {
    storyName: 'isDisabled',
    render: () => {
        const args: SwitchProps[] = [
            { isDisabled: true },
            { isChecked: true, isDisabled: true },
            { label: 'Label', isDisabled: true },
            { label: 'Label', isChecked: true, isDisabled: true },
        ];

        return <StoryGrid component={Switch} args={args} />;
    },
};

export default meta;
