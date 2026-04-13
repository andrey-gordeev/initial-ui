import type { Meta, StoryObj } from '@storybook/react-vite';

import { AvatarGroup } from './AvatarGroup';

type Story = StoryObj<typeof meta>;

const avatars = [
    { id: '1', content: 'AV' },
    { id: '2', content: 'AC' },
    { id: '3', content: 'DC' },
    { id: '4', content: 'KO' },
    { id: '5', content: 'AI' },
    { id: '6', content: 'VR' },
    { id: '7', content: 'DJ' },
    { id: '8', content: 'PR' },
    { id: '9', content: 'HR' },
    { id: '10', content: 'XL' },
];

const meta = {
    title: 'Components/AvatarGroup',
    component: AvatarGroup,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        avatars: {
            control: false,
            description: 'Avatars to display in the group.',
            table: { type: { summary: 'AvatarGroupItem[]' } },
        },
        maxVisible: {
            description: 'Maximum number of avatars to show.',
            control: { type: 'number', min: 1 },
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '5' },
            },
        },
        overlap: {
            description: 'Overlap between avatars (px).',
            control: { type: 'number', min: 0 },
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '8' },
            },
        },
        gap: {
            description: 'Gap in the cut-out (px).',
            control: { type: 'number', min: 0 },
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '0' },
            },
        },
        size: {
            description: 'Size of all avatars in the group.',
            control: 'select',
            options: ['sm', 'md', 'lg', 'jumbo'],
            table: {
                type: { summary: "'sm' | 'md' | 'lg' | 'jumbo'" },
                defaultValue: { summary: 'md' },
            },
        },
        showOverflow: {
            description: 'Show overflow badge with hidden avatar count.',
            control: 'boolean',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
            },
        },
    },
} satisfies Meta<typeof AvatarGroup>;

export const Default: Story = {
    args: {
        avatars,
    },
};

export const MaxVisible: Story = {
    storyName: 'maxVisible',
    args: {
        avatars,
        maxVisible: 4,
    },
};

export const MaxVisibleLarge: Story = {
    storyName: 'maxVisible: 99',
    args: {
        avatars,
        maxVisible: 99,
    },
};

export const Overlap: Story = {
    storyName: 'overlap',
    args: {
        avatars,
        overlap: 16,
    },
};

export const OverlapAndGap: Story = {
    storyName: 'overlap + gap',
    args: {
        avatars,
        overlap: 16,
        gap: 4,
    },
};

export const Size: Story = {
    storyName: "size: 'sm'",
    args: {
        avatars,
        size: 'sm',
    },
};

export const HiddenOverflow: Story = {
    storyName: 'showOverflow: false',
    args: {
        avatars,
        maxVisible: 4,
        showOverflow: false,
    },
};

export default meta;
