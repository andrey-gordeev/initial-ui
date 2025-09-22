import { Showcase, ShowcaseItem } from '../components/Showcase/Showcase';
import Radio from '../../react/src/Radio/Radio';

export const Overview = () => {
    return (
        <Showcase>
            <ShowcaseItem label="default">
                <Radio name="name_A" value="value_A" />
            </ShowcaseItem>
            <ShowcaseItem label="isChecked">
                <Radio name="name_B" value="value_B" isChecked={true} />
            </ShowcaseItem>
            <ShowcaseItem label="isDisabled">
                <Radio name="name_C" value="value_C" isDisabled={true} />
            </ShowcaseItem>
            <ShowcaseItem label="isChecked and isDisabled">
                <Radio
                    name="name_D"
                    value="value_D"
                    isChecked={true}
                    isDisabled={true}
                />
            </ShowcaseItem>
            <ShowcaseItem>
                <Radio name="name_E" value="value_E_0" />
                <Radio name="name_E" value="value_E_1" />
                <Radio name="name_E" value="value_E_2" />
            </ShowcaseItem>
        </Showcase>
    );
};
