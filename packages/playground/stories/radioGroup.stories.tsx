import { Showcase, ShowcaseItem } from '../components/Showcase';
import Radio from '../../react/src/Radio';
import RadioGroup from '../../react/src/RadioGroup';

export const Overview = () => {
    return (
        <Showcase>
            <ShowcaseItem label="with children (uncontrolled)">
                <RadioGroup>
                    <Radio value="auto" label="Auto" />
                    <Radio value="light" label="Light" />
                    <Radio value="dark" label="Dark" />
                </RadioGroup>
            </ShowcaseItem>
            <ShowcaseItem label="with options (uncontrolled)">
                <RadioGroup
                    options={[
                        { value: 'auto', label: 'Auto' },
                        { value: 'light', label: 'Light' },
                        { value: 'dark', label: 'Dark' },
                    ]}
                />
            </ShowcaseItem>
        </Showcase>
    );
};
