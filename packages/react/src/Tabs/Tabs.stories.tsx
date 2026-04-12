import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Tabs } from './Tabs';

type Story = StoryObj<typeof meta>;

const meta = {
    title: 'Components/Tabs',
    component: Tabs,
    decorators: [
        (Story) => (
            <div style={{ minWidth: 360 }}>
                <Story />
            </div>
        ),
    ],
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        children: {
            control: false,
            description:
                'Composition API: `Tabs.TabList` / `Tabs.Tab` and `Tabs.Panel`.',
            table: {
                type: { summary: 'ReactNode' },
            },
        },
        orientation: {
            description: 'Tab list axis.',
            control: 'select',
            options: ['horizontal', 'vertical'],
            table: {
                type: { summary: "'horizontal' | 'vertical'" },
                defaultValue: { summary: 'horizontal' },
            },
        },
        defaultActiveId: {
            description: 'Initial active tab id (uncontrolled).',
            control: 'text',
            table: {
                type: { summary: 'string' },
            },
        },
        activeId: {
            description: 'Active tab id (controlled).',
            control: 'text',
            table: {
                type: { summary: 'string' },
            },
        },
        onActiveIdChange: {
            description: 'Callback when active tab changes.',
            control: false,
            table: {
                type: { summary: '(id: string) => void' },
            },
        },
    },
} satisfies Meta<typeof Tabs>;

const tabsTemplate = [
    <Tabs.TabList key="list" aria-label="Sample tabs">
        <Tabs.Tab id="1" label="Tab 1" />
        <Tabs.Tab id="2" label="Tab 2" isDisabled={true} />
        <Tabs.Tab id="3" label="Tab 3" />
    </Tabs.TabList>,
    <Tabs.Panel key="p1" id="1">
        content 1
    </Tabs.Panel>,
    <Tabs.Panel key="p2" id="2">
        content 2
    </Tabs.Panel>,
    <Tabs.Panel key="p3" id="3">
        content 3
    </Tabs.Panel>,
];

export const Default: Story = {
    args: {
        orientation: 'horizontal',
        children: tabsTemplate,
    },
};

export const DefaultActiveId: Story = {
    storyName: 'defaultActiveId',
    args: {
        defaultActiveId: '3',
        children: tabsTemplate,
    },
};

export const Controlled = {
    storyName: 'controlled',
    render: () => {
        const [activeId, setActiveId] = useState('1');
        return (
            <>
                <div style={{ marginBlockEnd: 8 }}>
                    Active: <strong>{activeId}</strong>
                    <button onClick={() => setActiveId('3')}>
                        Go to Tab 3
                    </button>
                </div>
                <Tabs activeId={activeId} onActiveIdChange={setActiveId}>
                    <Tabs.TabList aria-label="Controlled tabs">
                        <Tabs.Tab id="1" label="Tab 1" />
                        <Tabs.Tab id="2" label="Tab 2" />
                        <Tabs.Tab id="3" label="Tab 3" />
                    </Tabs.TabList>
                    <Tabs.Panel id="1">content 1</Tabs.Panel>
                    <Tabs.Panel id="2">content 2</Tabs.Panel>
                    <Tabs.Panel id="3">content 3</Tabs.Panel>
                </Tabs>
            </>
        );
    },
};

export const Vertical: Story = {
    storyName: 'orientation: vertical',
    args: {
        orientation: 'vertical',
        children: tabsTemplate,
    },
};

export default meta;
