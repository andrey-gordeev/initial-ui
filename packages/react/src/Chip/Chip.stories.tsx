import type { Meta, StoryObj } from '@storybook/react-vite';
import { StoryGrid } from '../../../../.storybook/StoryGrid';

import { Chip } from './Chip';
import type { ChipProps } from './types';

type Story = StoryObj<typeof meta>;

const meta = {
    title: 'Components/Chip',
    component: Chip,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        label: {
            description: 'Visible text.',
            control: 'text',
            table: {
                type: { summary: 'string' },
            },
        },
        icon: {
            description:
                'Optional leading icon (`IconName` from the icon set). When set, it replaces the default selected icon.',
            control: 'select',
            options: [
                undefined,
                'moon-16',
                'rocket-16',
                'sun-16',
                'telescope-16',
            ],
            table: {
                type: { summary: 'IconName' },
            },
        },
        isSelectable: {
            description:
                'Renders as a button with a trailing close affordance for removable/filter chips.',
            control: 'boolean',
            table: {
                type: { summary: 'boolean' },
            },
        },
        isSelected: {
            description:
                'Shows the selected state (leading check-style icon when no custom `icon` is passed).',
            control: 'boolean',
            table: {
                type: { summary: 'boolean' },
            },
        },
        onClick: {
            description: 'Click handler (intended for selectable chips).',
            control: false,
            table: {
                type: { summary: '() => void' },
            },
        },
    },
} satisfies Meta<typeof Chip>;

export const Default: Story = {
    args: {
        label: 'Chip',
    },
};

export const WithIcon: Story = {
    storyName: 'icon',
    args: {
        label: 'Moon',
        icon: 'moon-16',
    },
};

export const Selected: Story = {
    storyName: 'isSelected',
    args: {
        label: 'Selected',
        isSelected: true,
    },
};

export const Selectable: Story = {
    storyName: 'isSelectable',
    args: {
        label: 'Filter',
        isSelectable: true,
    },
};

export const Examples = {
    storyName: 'examples',
    render: () => {
        const args: ChipProps[] = [
            { label: 'Grocery' },
            { label: 'Pharmacy' },
            { label: 'Restaurant' },
            { label: 'Coffee shop' },
            { label: 'Moon', icon: 'moon-16' },
            { label: 'Rocket', icon: 'rocket-16' },
            { label: 'Sun', icon: 'sun-16' },
            { label: 'Telescope', icon: 'telescope-16' },
            { label: 'Active', isSelected: true },
            { label: 'Removable', isSelectable: true },
        ];

        return <StoryGrid component={Chip} args={args} columns={4} />;
    },
};

export default meta;
