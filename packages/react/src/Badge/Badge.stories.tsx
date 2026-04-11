import type { Meta, StoryObj } from '@storybook/react-vite';
import { StoryGrid } from '../../../../.storybook/StoryGrid';

import { Badge } from './Badge';
import type { BadgeProps } from './types';
import { BADGE_COLORS, BADGE_SIZES } from './constants';

type Story = StoryObj<typeof meta>;

const meta = {
    title: 'Components/Badge',
    component: Badge,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        text: {
            description:
                'Counter or label text. Mutually exclusive with `icon` — use one or the other.',
            control: 'text',
            table: {
                type: { summary: 'string' },
            },
        },
        icon: {
            description:
                'Icon-only badge. Mutually exclusive with `text` — use one or the other.',
            control: 'select',
            options: ['sun-16', 'moon-16', 'rocket-16', 'telescope-16'],
            table: {
                type: { summary: 'IconName' },
            },
        },
        color: {
            description: 'Semantic color.',
            control: 'select',
            options: Object.values(BADGE_COLORS),
            table: {
                type: { summary: 'BadgeColor' },
                defaultValue: { summary: 'info' },
            },
        },
        size: {
            description: 'Padding and typography scale.',
            control: 'select',
            options: Object.values(BADGE_SIZES),
            table: {
                type: { summary: 'BadgeSize' },
                defaultValue: { summary: 'md' },
            },
        },
    },
} satisfies Meta<typeof Badge>;

export const Default: Story = {
    args: {
        text: '9',
    },
};

export const WithTextLengths = {
    storyName: 'text',
    render: () => {
        const args: BadgeProps[] = [
            { text: '1' },
            { text: '12' },
            { text: '99+' },
            { text: '999+ new' },
        ];

        return <StoryGrid component={Badge} args={args} columns={4} />;
    },
};

export const WithIcon: Story = {
    storyName: 'icon',
    args: {
        icon: 'sun-16',
    },
};

export const Sizes = {
    storyName: 'size',
    render: () => {
        const args: BadgeProps[] = [
            { text: '9', size: 'sm' },
            { text: '9+', size: 'sm' },
            { text: '99+', size: 'sm' },
            { text: 'Label', size: 'sm' },
            { text: '9', size: 'md' },
            { text: '9+', size: 'md' },
            { text: '99+', size: 'md' },
            { text: 'Label', size: 'md' },
            { text: '9', size: 'lg' },
            { text: '9+', size: 'lg' },
            { text: '99+', size: 'lg' },
            { text: 'Label', size: 'lg' },
        ];

        return <StoryGrid component={Badge} args={args} columns={4} />;
    },
};

export const Colors = {
    storyName: 'color',
    render: () => {
        const args: BadgeProps[] = Object.values(BADGE_COLORS).map((color) => ({
            color,
            text: color,
        }));

        return <StoryGrid component={Badge} args={args} columns={4} />;
    },
};

export default meta;
