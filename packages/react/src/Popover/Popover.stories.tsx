import { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import StoryBox from '../../../../.storybook/StoryBox';
import { StoryGrid } from '../../../../.storybook/StoryGrid';
import { Popover } from './Popover';
import { usePopover } from './usePopover';
import type { PopoverProps } from './types';
import { Body } from '../Typography';

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
                defaultValue: { summary: "'bottom'" },
            },
        },
    },
    render: (args) => (
        <div
            style={{
                position: 'relative',
                marginBlock: '112px',
                aspectRatio: 1,
                inlineSize: '4px',
                borderRadius: '50%',
                backgroundColor: 'tomato',
            }}
        >
            <Popover {...args} />
        </div>
    ),
} satisfies Meta<typeof Popover>;

export const Default: Story = {
    args: {
        children: <Body>Popover content</Body>,
    },
};

export const Placement: Story = {
    name: 'placement',
    args: {
        placement: 'bottom',
        children: (
            <Body>
                Use the <strong>placement</strong> control
            </Body>
        ),
    },
};

export const AllPlacements: StoryObj = {
    name: 'all placements',
    render: () => (
        <StoryGrid<PopoverProps>
            columns={3}
            args={
                [
                    { placement: 'top-start' },
                    { placement: 'top' },
                    { placement: 'top-end' },
                    { placement: 'left' },
                    null,
                    { placement: 'right' },
                    { placement: 'bottom-start' },
                    { placement: 'bottom' },
                    { placement: 'bottom-end' },
                ] as ({ placement: PopoverProps['placement'] } | null)[]
            }
        >
            {(item) =>
                item ? (
                    <Popover
                        placement={item.placement}
                        style={{
                            position: 'static',
                            inset: 'unset',
                            transform: 'none',
                        }}
                    >
                        <Body>{item.placement}</Body>
                    </Popover>
                ) : null
            }
        </StoryGrid>
    ),
};

export const WithHook: StoryObj = {
    name: 'with usePopover hook',
    render: () => {
        const triggerRef = useRef<HTMLButtonElement>(null);

        const { triggerProps } = usePopover(triggerRef, {
            content: ({ id, placement, onClose }) => (
                <Popover id={id} placement={placement}>
                    <div style={{ padding: 8, fontSize: 14 }}>
                        <p>Popover content</p>
                        <button onClick={onClose}>Close</button>
                    </div>
                </Popover>
            ),
        });

        return (
            <button ref={triggerRef} {...triggerProps}>
                Click me
            </button>
        );
    },
};

function ControllerDemo() {
    const triggerRef = useRef<HTMLButtonElement>(null);
    const { triggerProps } = usePopover(triggerRef, {
        placement: 'bottom-end',
        content: ({ placement, id, onClose }) => (
            <Popover id={id} placement={placement}>
                <SettingsController onClose={onClose} />
            </Popover>
        ),
    });

    return (
        <button ref={triggerRef} {...triggerProps}>
            Settings
        </button>
    );
}

function SettingsController({ onClose }: { onClose: () => void }) {
    const [saved, setSaved] = useState(false);

    function handleSave() {
        setSaved(true);
        setTimeout(onClose, 800);
    }

    return (
        <>
            <p style={{ margin: '0 0 8px' }}>
                {saved ? 'Saved!' : 'Adjust settings'}
            </p>
            {!saved && (
                <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </div>
            )}
        </>
    );
}

export const WithController: StoryObj = {
    name: 'with controller',
    render: () => <ControllerDemo />,
};

export default meta;
