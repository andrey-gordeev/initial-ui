import { type ComponentRef, useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryGrid } from '../../../../.storybook/StoryGrid';
import Button from '../Button';
import { Tooltip } from './Tooltip';
import { useTooltip } from './useTooltip';
import type { Placement, TooltipProps } from './types';

type Story = StoryObj<typeof meta>;

const PLACEMENTS: NonNullable<TooltipProps['placement']>[] = [
    'top',
    'bottom',
    'left',
    'right',
];

const meta = {
    title: 'Components/Tooltip',
    component: Tooltip,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        text: {
            description: 'Tooltip text content.',
            control: 'text',
            table: { type: { summary: 'string' } },
        },
        placement: {
            description: 'Arrow direction relative to the tooltip body.',
            control: 'select',
            options: PLACEMENTS,
            table: {
                type: {
                    summary: PLACEMENTS.map((p) => `'${p}'`).join(' | '),
                },
                defaultValue: { summary: "'top'" },
            },
        },
    },
} satisfies Meta<typeof Tooltip>;

export const Default: Story = {
    args: {
        text: 'Save changes now',
    },
};

export const LongText: Story = {
    name: 'long text',
    args: {
        text: 'This is a longer tooltip example to demonstrate how the tooltip adjusts its width and padding dynamically based on the content inside it.',
    },
};

export const WithHook: StoryObj = {
    name: 'with useTooltip hook',
    render: () => {
        const triggerRef = useRef<HTMLButtonElement>(null);

        const { triggerProps } = useTooltip(triggerRef, {
            /**
             * A custom id can be useful for stable e2e/visual tests
             * or integrations with analytics/accessibility where controlling aria bindings matters
             */
            id: 'custom-id',
            content: ({ id }) => <Tooltip id={id} text="Save changes" />,
        });

        return (
            <button ref={triggerRef} {...triggerProps}>
                Hover me
            </button>
        );
    },
};

function TooltipTrigger({ placement }: { placement: Placement }) {
    const triggerRef = useRef<ComponentRef<typeof Button>>(null);

    const { triggerProps } = useTooltip(triggerRef, {
        placement,
        content: ({ placement, id }) => (
            <Tooltip
                id={id}
                text={`${placement} tooltip`}
                placement={placement}
            />
        ),
    });

    return (
        <Button
            ref={triggerRef}
            label={placement}
            variant="secondary"
            {...triggerProps}
        />
    );
}

export const AllPlacements: StoryObj = {
    name: 'all placements (hook)',
    render: () => (
        <StoryGrid
            columns={4}
            args={PLACEMENTS.map((placement) => ({ placement }))}
        >
            {(item) =>
                item ? <TooltipTrigger placement={item.placement} /> : null
            }
        </StoryGrid>
    ),
};

export default meta;
