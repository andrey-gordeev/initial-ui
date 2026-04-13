import { useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryGrid } from '../../../../.storybook/StoryGrid';
import Icon from './Icon';
import { ICON_COLORS, ICON_NAMES, ICON_SIZES } from './types';
import type { IconProps } from './types';

type Story = StoryObj<typeof meta>;

const NAMES = Object.values(ICON_NAMES);
const SIZES = Object.values(ICON_SIZES);
const COLORS = Object.values(ICON_COLORS);

const meta = {
    title: 'Components/Icon',
    component: Icon,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        name: {
            description: 'Icon name from the registry.',
            control: 'select',
            options: NAMES,
            table: { type: { summary: 'IconName' } },
        },
        size: {
            description: 'Icon size preset.',
            control: 'select',
            options: SIZES,
            table: {
                type: { summary: SIZES.map((s) => `'${s}'`).join(' | ') },
                defaultValue: { summary: 'md' },
            },
        },
        color: {
            description: 'Icon color preset.',
            control: 'select',
            options: [undefined, ...COLORS],
            table: {
                type: { summary: COLORS.map((c) => `'${c}'`).join(' | ') },
            },
        },
    },
} satisfies Meta<typeof Icon>;

export const Default: Story = {
    args: {
        name: 'home',
        size: 'md',
    },
};

export const AllIcons: Story = {
    storyName: 'all icons',
    render: () => {
        const [query, setQuery] = useState('');
        const filtered = useMemo(() => {
            const q = query.trim().toLowerCase();
            if (!q) return NAMES;
            return NAMES.filter((name) => name.toLowerCase().includes(q));
        }, [query]);

        return (
            <div>
                <input
                    type="search"
                    value={query}
                    placeholder={`Search ${NAMES.length} icons…`}
                    onChange={(e) => setQuery(e.target.value)}
                    style={{
                        inlineSize: '100%',
                        marginBlockEnd: 16,
                        padding: '8px 12px',
                        border: '1px solid #d1d5db',
                        borderRadius: 6,
                        fontSize: 14,
                    }}
                />
                {filtered.length === 0 ? (
                    <div
                        style={{
                            padding: 32,
                            textAlign: 'center',
                            color: '#6b7280',
                            fontSize: 14,
                        }}
                    >
                        No icons match “{query}”
                    </div>
                ) : (
                    <StoryGrid<IconProps>
                        columns={6}
                        args={filtered.map((name) => ({
                            name,
                            size: 'md',
                        }))}
                    >
                        {(item) =>
                            item ? (
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: 8,
                                    }}
                                >
                                    <Icon {...item} />
                                    <span
                                        style={{
                                            fontFamily: 'monospace',
                                            fontSize: 11,
                                            color: '#6b7280',
                                        }}
                                    >
                                        {item.name}
                                    </span>
                                </div>
                            ) : null
                        }
                    </StoryGrid>
                )}
            </div>
        );
    },
};

export const Sizes: Story = {
    storyName: 'sizes',
    render: () => (
        <StoryGrid<IconProps>
            columns={SIZES.length}
            args={SIZES.map((size) => ({ name: 'rocket-24', size }))}
        >
            {(item) =>
                item ? (
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 8,
                        }}
                    >
                        <Icon {...item} />
                        <span
                            style={{
                                fontFamily: 'monospace',
                                fontSize: 11,
                                color: '#6b7280',
                            }}
                        >
                            {item.size}
                        </span>
                    </div>
                ) : null
            }
        </StoryGrid>
    ),
};

export const Colors: Story = {
    storyName: 'colors',
    render: () => (
        <StoryGrid<IconProps>
            columns={COLORS.length}
            args={COLORS.map((color) => ({
                name: 'rocket-24',
                size: 'md',
                color,
            }))}
        >
            {(item) =>
                item ? (
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 8,
                        }}
                    >
                        <Icon {...item} />
                        <span
                            style={{
                                fontFamily: 'monospace',
                                fontSize: 11,
                                color: '#6b7280',
                            }}
                        >
                            {item.color}
                        </span>
                    </div>
                ) : null
            }
        </StoryGrid>
    ),
};

export default meta;
