import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import Radio, { type RadioProps } from '../Radio';
import { RadioGroup } from './RadioGroup';

type Story = StoryObj<typeof meta>;

const meta = {
    title: 'Components/RadioGroup',
    component: RadioGroup,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        name: {
            description: 'Radio group name shared across inputs.',
            table: {
                type: { summary: 'string' },
            },
        },
        value: {
            description: 'Controlled selected value.',
            control: 'text',
            table: {
                type: { summary: 'string | undefined' },
            },
        },
        onChange: {
            description: 'Called when selection changes.',
            control: false,
            table: {
                type: { summary: '(value: string | undefined) => void' },
            },
        },
        children: {
            control: false,
            description: 'Do not mix with `options`.',
            table: {
                type: { summary: '<Radio />' },
            },
        },
        options: {
            control: false,
            description: 'Do not mix with `children`.',
            table: {
                type: { summary: 'RadioProps[]' },
            },
        },
    },
} satisfies Meta<typeof RadioGroup>;

export const WithOptions: Story = {
    storyName: 'with Options (uncontrolled)',
    args: {
        options: getRadioOptions(),
        name: 'b',
    },
};

export const WithChildren: Story = {
    storyName: 'with Children (uncontrolled)',
    args: {
        children: getRadioOptions().map((item) => (
            <Radio key={`a-${item.value}`} {...item} />
        )),
        name: 'a',
    },
};

export const WithDefaultChecked: Story = {
    storyName: 'with Children (uncontrolled, defaultChecked)',
    args: {
        name: 'c',
        children: getRadioOptions().map((item) => (
            <Radio
                key={`c-${item.value}`}
                defaultChecked={item.value === 'mage'}
                {...item}
            />
        )),
    },
};

export const WithOptionsControlled = {
    storyName: 'with Options (controlled)',
    render: function ControlledRender() {
        const [value, setValue] = useState<string | undefined>('mage');

        return (
            <RadioGroup
                name="d"
                value={value}
                options={getRadioOptions()}
                onChange={setValue}
            />
        );
    },
};

export const WithChildrenControlled = {
    storyName: 'with Children (controlled)',
    render: function ControlledRender() {
        const [value, setValue] = useState<string | undefined>('mage');

        return (
            <RadioGroup name="e" value={value} onChange={setValue}>
                {getRadioOptions().map((item) => (
                    <Radio key={`e-${item.value}`} {...item} />
                ))}
            </RadioGroup>
        );
    },
};

export const Disabled: Story = {
    storyName: 'isDisabled',
    args: {
        children: getRadioOptions().map((item) => (
            <Radio
                key={`f-${item.value}`}
                defaultChecked={item.value === 'mage'}
                isDisabled={true}
                {...item}
            />
        )),
        name: 'f',
    },
};

type RadioOption = Pick<RadioProps, 'value' | 'label'>;

function getRadioOptions(): RadioOption[] {
    return [
        { value: 'warrior', label: 'Warrior (STR)' },
        { value: 'mage', label: 'Mage (INT)' },
        { value: 'rogue', label: 'Rogue (DEX)' },
    ];
}

export default meta;
