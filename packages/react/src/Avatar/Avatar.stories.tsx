import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryGrid } from '../../../../.storybook/StoryGrid';
import { Avatar } from './Avatar';
import { AVATAR_BADGE_PLACEMENTS, AVATAR_SIZES } from './constants';
import type { AvatarBadgeProps, AvatarProps } from './types';
import Badge from '../Badge';

type Story = StoryObj<typeof meta>;

const SIZES = Object.values(AVATAR_SIZES);
const PLACEMENTS = Object.values(AVATAR_BADGE_PLACEMENTS);

const meta = {
    title: 'Components/Avatar',
    component: Avatar,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        children: {
            control: 'text',
            description: 'Avatar content (initials or image).',
            table: { type: { summary: 'ReactNode' } },
        },
        size: {
            description: 'Avatar size.',
            control: 'select',
            options: SIZES,
            table: {
                type: { summary: SIZES.map((s) => `'${s}'`).join(' | ') },
                defaultValue: { summary: 'md' },
            },
        },
        type: {
            description: 'Avatar type.',
            control: 'select',
            options: ['normal', 'add-button'],
            table: {
                type: { summary: "'normal' | 'add-button'" },
                defaultValue: { summary: 'normal' },
            },
        },
        halo: {
            description: 'Show halo ring around the avatar.',
            control: 'boolean',
            table: { type: { summary: 'boolean' } },
        },
        inset: {
            description: 'Inset the badge into the avatar circle.',
            control: 'boolean',
            table: { type: { summary: 'boolean' } },
        },
        label: {
            description: 'Accessible label.',
            control: 'text',
            table: { type: { summary: 'string' } },
        },
        badges: {
            control: false,
            table: {
                type: {
                    summary: 'AvatarBadgeProps | AvatarBadgeProps[]',
                },
            },
        },
    },
} satisfies Meta<typeof Avatar>;

export const Default: Story = {
    args: {
        children: '[AV]',
        size: 'md',
    },
};

export const Sizes: Story = {
    storyName: 'sizes',
    render: () => (
        <StoryGrid<AvatarProps>
            columns={SIZES.length}
            args={SIZES.map((size) => ({
                size,
                label: `Size: '${size}'`,
            }))}
            component={Avatar}
        />
    ),
};

const badgeCentrePoint = (
    <div
        style={{
            inlineSize: 12,
            blockSize: 12,
            backgroundColor: 'crimson',
            borderRadius: '50%',
        }}
    />
);

export const AllBadgePlacements: Story = {
    storyName: 'badge placements',
    args: {
        children: '[AV]',
        size: 'lg',
        badges: PLACEMENTS.map(
            (placement) =>
                ({
                    placement,
                    gap: 4,
                    content: badgeCentrePoint,
                }) as AvatarBadgeProps,
        ),
    },
};

export const Halo: Story = {
    storyName: 'halo',
    args: {
        children: '[AV]',
        halo: true,
        badges: {
            placement: 'top-end',
            content: <Badge text="9" />,
        },
    },
};

export const Inset: Story = {
    storyName: 'inset',
    args: {
        children: '[AV]',
        inset: true,
        badges: {
            placement: 'top-end',
            content: <Badge text="9" />,
        },
    },
};

export const AddButton: Story = {
    storyName: "type: 'add-button'",
    args: {
        children: '+1',
        type: 'add-button',
    },
};

export default meta;
