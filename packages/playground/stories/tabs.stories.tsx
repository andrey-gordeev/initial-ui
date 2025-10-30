import Showcase from '../components/Showcase';
import Tabs from '../../react/src/Tabs';

export const Overview = () => {
    return (
        <Showcase label="Tabs">
            <Showcase.Item label={'data'}>
                <Tabs
                    tabList={[
                        { id: '1', label: 'Tab 1' },
                        { id: '2', label: 'Tab 2', isDisabled: true },
                        { id: '3', label: 'Tab 3' },
                    ]}
                    panelList={[
                        { id: '1', children: 'content 1' },
                        { id: '2', children: 'content 2' },
                        { id: '3', children: 'content 3' },
                    ]}
                />
            </Showcase.Item>
            <Showcase.Item label={'children'}>
                <Tabs>
                    <Tabs.TabList>
                        <Tabs.Tab id="1" label="Tab 1" />
                        <Tabs.Tab id="2" label="Tab 2" isDisabled={true} />
                        <Tabs.Tab id="3" label="Tab 3" />
                    </Tabs.TabList>
                    <Tabs.PanelList>
                        <Tabs.Panel id="1">{'content 1'}</Tabs.Panel>
                        <Tabs.Panel id="2">{'content 2'}</Tabs.Panel>
                        <Tabs.Panel id="3">{'content 3'}</Tabs.Panel>
                    </Tabs.PanelList>
                </Tabs>
            </Showcase.Item>
        </Showcase>
    );
};
