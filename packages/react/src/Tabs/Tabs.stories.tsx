import type { Meta, StoryObj } from '@storybook/react-vite';

import { Tabs } from './Tabs';

type Story = StoryObj<typeof meta>;

const shellStyle = { minWidth: 360 } as const;

const meta = {
    title: 'Components/Tabs',
    component: Tabs,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        children: {
            control: false,
            description:
                'Composition API: `Tabs.TabList` / `Tabs.Tab` and `Tabs.PanelList` / `Tabs.Panel`.',
            table: {
                type: { summary: 'ReactNode' },
            },
        },
    },
} satisfies Meta<typeof Tabs>;

export const Default: Story = {
    render: () => (
        <div style={shellStyle}>
            <Tabs>
                <Tabs.TabList>
                    <Tabs.Tab id="1" label="Tab 1" />
                    <Tabs.Tab id="2" label="Tab 2" isDisabled />
                    <Tabs.Tab id="3" label="Tab 3" />
                </Tabs.TabList>
                <Tabs.PanelList>
                    <Tabs.Panel id="1">content 1</Tabs.Panel>
                    <Tabs.Panel id="2">content 2</Tabs.Panel>
                    <Tabs.Panel id="3">content 3</Tabs.Panel>
                </Tabs.PanelList>
            </Tabs>
        </div>
    ),
};

export const Vertical: Story = {
    storyName: 'orientation: vertical',
    render: () => (
        <div style={shellStyle}>
            <Tabs>
                <Tabs.TabList orientation="vertical">
                    <Tabs.Tab id="1" label="Tab 1" />
                    <Tabs.Tab id="2" label="Tab 2" isDisabled />
                    <Tabs.Tab id="3" label="Tab 3" />
                </Tabs.TabList>
                <Tabs.PanelList>
                    <Tabs.Panel id="1">content 1</Tabs.Panel>
                    <Tabs.Panel id="2">content 2</Tabs.Panel>
                    <Tabs.Panel id="3">content 3</Tabs.Panel>
                </Tabs.PanelList>
            </Tabs>
        </div>
    ),
};

export default meta;
