import type { Meta, StoryObj } from '@storybook/react-vite';
import { StoryGrid } from '../../../../.storybook/StoryGrid';

import { Radio } from './Radio';
import type { RadioProps } from './types';

type Story = StoryObj<typeof meta>;

const meta = {
    title: 'Components/Radio',
    component: Radio,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Radio>;

const base = {
    name: 'radio',
    value: 'option',
    label: 'Option',
} as const;

export const Default: Story = {
    args: {
        ...base,
    },
};

export const Checked: Story = {
    storyName: 'isChecked',
    args: {
        ...base,
        isChecked: true,
        onChange: () => {},
    },
};

export const DefaultChecked: Story = {
    storyName: 'defaultChecked',
    args: {
        ...base,
        defaultChecked: true,
    },
};

export const Disabled = {
    storyName: 'isDisabled',
    render: () => {
        const args: RadioProps[] = [
            {
                name: 'd0',
                value: '0',
                label: 'Disabled',
                isDisabled: true,
            },
            {
                name: 'd1',
                value: '1',
                label: 'Checked',
                isChecked: true,
                isDisabled: true,
                onChange: () => {},
            },
            {
                name: 'd2',
                value: '2',
                label: 'Default checked',
                defaultChecked: true,
                isDisabled: true,
            },
        ];

        return <StoryGrid component={Radio} args={args} />;
    },
};

export default meta;
