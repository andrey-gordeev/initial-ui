import Showcase from '../components/Showcase';
import Radio from '../../react/src/Radio';
import RadioGroup from '../../react/src/RadioGroup';

export const Overview = () => {
    return (
        <Showcase>
            <Showcase.Item label="with children (uncontrolled)">
                <RadioGroup>
                    <Radio value="auto" label="Auto" />
                    <Radio value="light" label="Light" />
                    <Radio value="dark" label="Dark" />
                </RadioGroup>
            </Showcase.Item>
            <Showcase.Item label="with options (uncontrolled)">
                <RadioGroup
                    options={[
                        { value: 'auto', label: 'Auto' },
                        { value: 'light', label: 'Light' },
                        { value: 'dark', label: 'Dark' },
                    ]}
                />
            </Showcase.Item>
        </Showcase>
    );
};
