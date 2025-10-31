import Showcase from '../components/Showcase';
import OptionsList, { Option } from '../../react/src/OptionsList';

export const Overview = () => {
    return (
        <Showcase label="OptionsList">
            <Showcase.Item label="With children (only Option elements)">
                <OptionsList>
                    <Option label="Option 1" />
                    <Option label="Option 2" />
                    <Option label="Option 3" />
                </OptionsList>
            </Showcase.Item>

            <Showcase.Item label="With options array">
                <OptionsList
                    options={[
                        { label: 'Option A' },
                        { label: 'Option B' },
                        { label: 'Option C' },
                    ]}
                />
            </Showcase.Item>

            <Showcase.Item label="With children (including invalid elements)">
                <OptionsList>
                    <Option label="Valid Option 1" />
                    <div>Invalid div (will be ignored)</div>
                    <Option label="Valid Option 2" />
                    <span>Invalid span (will be ignored)</span>
                    <Option label="Valid Option 3" />
                </OptionsList>
            </Showcase.Item>

            <Showcase.Item label="With additional props">
                <OptionsList
                    options={[
                        {
                            label: 'Clickable Option',
                            value: '1',
                            onClick: () => alert('Clicked!'),
                        },
                        {
                            label: 'Disabled Option',
                            value: '2',
                            isDisabled: true,
                        },
                        { label: 'Normal Option', value: '3' },
                    ]}
                />
            </Showcase.Item>
        </Showcase>
    );
};
