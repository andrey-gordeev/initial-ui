import Showcase from '../components/Showcase';
import { noop } from '../utils';
import Radio from '../../react/src/Radio';

export const Overview = () => {
    return (
        <Showcase label="Radio">
            <Showcase.Item label="default">
                <Radio />
            </Showcase.Item>
            <Showcase.Item label="isChecked (controlled)">
                <Radio isChecked={true} onChange={noop} />
            </Showcase.Item>
            <Showcase.Item label="defaultChecked (uncontrolled)">
                <Radio defaultChecked={true} />
            </Showcase.Item>
            <Showcase.Item label="isDisabled">
                <Radio isDisabled={true} />
            </Showcase.Item>
            <Showcase.Item label="isChecked and isDisabled">
                <Radio isChecked={true} isDisabled={true} onChange={noop} />
            </Showcase.Item>
            <Showcase.Item label="multiple (controlled)">
                <Radio name="a" isChecked={true} onChange={noop} />
                <Radio name="a" />
                <Radio name="a" />
            </Showcase.Item>
            <Showcase.Item label="multiple (uncontrolled)">
                <Showcase.Item label="default">
                    <Radio />
                    <Radio />
                    <Radio />
                </Showcase.Item>
                <Showcase.Item label="with name">
                    <Radio name="b" />
                    <Radio name="b" />
                    <Radio name="b" />
                </Showcase.Item>
            </Showcase.Item>
        </Showcase>
    );
};
