import type { Meta, StoryObj } from '@storybook/react-vite';
import { StoryGrid } from '../../../../.storybook/StoryGrid';

import { Button } from './Button';
import { BUTTON_VARIANT } from './constants';
import type { ButtonProps } from './types';

type Story = StoryObj<typeof meta>;

const meta = {
    title: 'Components/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        label: {
            description: 'Button text.',
            control: 'text',
            table: {
                type: { summary: 'string' },
            },
        },
        variant: {
            description: 'Visual style.',
            control: 'select',
            options: Object.keys(BUTTON_VARIANT),
            table: {
                type: { summary: 'ButtonVariant' },
            },
        },
        icon: {
            description:
                'Optional leading icon (`IconName` from the icon set).',
            control: 'text',
            table: {
                type: { summary: 'IconName' },
            },
        },
        isDisabled: {
            description: 'Disables interaction.',
            control: 'boolean',
            table: {
                type: { summary: 'boolean' },
            },
        },
        isLoading: {
            description: 'Shows loading state.',
            control: 'boolean',
            table: {
                type: { summary: 'boolean' },
            },
        },
        onClick: {
            description: 'Click handler.',
            control: false,
            table: {
                type: { summary: '() => void' },
            },
        },
    },
} satisfies Meta<typeof Button>;

export const Default: Story = {
    args: {
        label: 'Button',
    },
};

const buttonVariants = Object.keys(
    BUTTON_VARIANT,
) as (keyof typeof BUTTON_VARIANT)[];

export const Variant = {
    storyName: 'variant',
    render: () => {
        const args: (ButtonProps | null)[] = buttonVariants.map((variant) => ({
            label: 'Button',
            variant,
        }));

        return <StoryGrid component={Button} args={args} />;
    },
};

export const Icon: Story = {
    storyName: 'icon',
    args: {
        label: 'Button',
        icon: 'plus-24',
    },
};

export const Disabled = {
    storyName: 'isDisabled',
    render: () => {
        const args: (ButtonProps | null)[] = buttonVariants.map((variant) => ({
            label: 'Button',
            variant,
            isDisabled: true,
        }));

        return <StoryGrid component={Button} args={args} />;
    },
};

export const Loading: Story = {
    storyName: 'isLoading',
    args: {
        label: 'Button',
        variant: 'primary',
        isLoading: true,
    },
};

export default meta;
