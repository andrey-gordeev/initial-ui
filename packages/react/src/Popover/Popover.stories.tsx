import type { Meta, StoryObj } from '@storybook/react-vite';

import StoryBox from '../../../../.storybook/StoryBox';
import { StoryGrid } from '../../../../.storybook/StoryGrid';
import { Popover } from './Popover';
import type { PopoverProps } from './types';

type Story = StoryObj<typeof meta>;

const PLACEMENTS: NonNullable<PopoverProps['placement']>[] = [
    'top',
    'top-start',
    'top-end',
    'bottom',
    'bottom-start',
    'bottom-end',
    'left',
    'right',
];

const meta = {
    title: 'Components/Popover',
    component: Popover,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        children: {
            control: false,
            description: 'Popover content.',
            table: {
                type: { summary: 'ReactNode' },
            },
        },
        placement: {
            description: 'Where the popover sits relative to its anchor.',
            control: 'select',
            options: PLACEMENTS,
            table: {
                type: {
                    summary: PLACEMENTS.map((p) => `'${p}'`).join(' | '),
                },
                defaultValue: { summary: 'top' },
            },
        },
    },
    render: (args) => (
        <div style={{ display: 'inline-block', position: 'relative' }}>
            <StoryBox inlineSize={160} label="Anchor" />
            <Popover {...args} />
        </div>
    ),
} satisfies Meta<typeof Popover>;

export const Default: Story = {
    args: {
        placement: 'top',
        children: (
            <div style={{ padding: 8, fontSize: 14 }}>Popover content</div>
        ),
    },
};

export const Placement: Story = {
    storyName: 'placement',
    args: {
        placement: 'bottom-end',
        children: (
            <div style={{ padding: 8, fontSize: 14 }}>
                Use the <strong>placement</strong> control
            </div>
        ),
    },
};

export const AllPlacements: Story = {
    storyName: 'all placements',
    render: () => (
        <StoryGrid<PopoverProps>
            columns={3}
            args={PLACEMENTS.map((placement) => ({ placement }))}
        >
            {(item) =>
                item ? (
                    <div
                        style={{
                            display: 'inline-block',
                            position: 'relative',
                        }}
                    >
                        <StoryBox inlineSize={100} label={item.placement} />
                        <Popover placement={item.placement}>
                            <div style={{ padding: 6, fontSize: 12 }}>
                                {item.placement}
                            </div>
                        </Popover>
                    </div>
                ) : null
            }
        </StoryGrid>
    ),
};

export default meta;
