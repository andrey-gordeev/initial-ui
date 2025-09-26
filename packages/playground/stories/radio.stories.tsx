import { Showcase, ShowcaseItem } from '../components/Showcase';
import { noop } from '../utils';
import Radio from '../../react/src/Radio';

export const Overview = () => {
    return (
        <Showcase>
            <ShowcaseItem label="default">
                <Radio />
            </ShowcaseItem>
            <ShowcaseItem label="isChecked (controlled)">
                <Radio isChecked={true} onChange={noop} />
            </ShowcaseItem>
            <ShowcaseItem label="defaultChecked (uncontrolled)">
                <Radio defaultChecked={true} />
            </ShowcaseItem>
            <ShowcaseItem label="isDisabled">
                <Radio isDisabled={true} />
            </ShowcaseItem>
            <ShowcaseItem label="isChecked and isDisabled">
                <Radio isChecked={true} isDisabled={true} onChange={noop} />
            </ShowcaseItem>
            <ShowcaseItem label="multiple (controlled)">
                <Radio name="a" isChecked={true} onChange={noop} />
                <Radio name="a" />
                <Radio name="a" />
            </ShowcaseItem>
            <ShowcaseItem label="multiple (uncontrolled)">
                <ShowcaseItem label="default">
                    <Radio />
                    <Radio />
                    <Radio />
                </ShowcaseItem>
                <ShowcaseItem label="with name">
                    <Radio name="b" />
                    <Radio name="b" />
                    <Radio name="b" />
                </ShowcaseItem>
            </ShowcaseItem>
        </Showcase>
    );
};
