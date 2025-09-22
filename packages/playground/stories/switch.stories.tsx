import { Showcase, ShowcaseItem } from '../components/Showcase/Showcase';

import { Switch } from '../../react/src/Switch/Switch';

export const Overview = () => {
    return (
        <Showcase>
            <ShowcaseItem label="default">
                <Switch />
            </ShowcaseItem>
            <ShowcaseItem label="isChecked">
                <Switch isChecked={true} />
            </ShowcaseItem>
            <ShowcaseItem label="isDisabled">
                <Switch isDisabled={true} />
            </ShowcaseItem>
            <ShowcaseItem label="isChecked and isDisabled">
                <Switch isChecked={true} isDisabled={true} />
            </ShowcaseItem>
        </Showcase>
    );
};
