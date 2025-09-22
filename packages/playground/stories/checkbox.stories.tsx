import { Showcase, ShowcaseItem } from '../components/Showcase/Showcase';
import { Checkbox } from '../../react/src/Checkbox/Checkbox';

export const Overview = () => {
    return (
        <Showcase>
            <ShowcaseItem label="default">
                <Checkbox />
            </ShowcaseItem>
            <ShowcaseItem label="isChecked">
                <Checkbox isChecked={true} />
            </ShowcaseItem>
            <ShowcaseItem label="isIndeterminate">
                <Checkbox isIndeterminate={true} />
            </ShowcaseItem>
            <ShowcaseItem label="isDisabled">
                <Checkbox isDisabled={true} />
            </ShowcaseItem>
            <ShowcaseItem label="isChecked and isDisabled">
                <Checkbox isChecked={true} isDisabled={true} />
            </ShowcaseItem>
        </Showcase>
    );
};
