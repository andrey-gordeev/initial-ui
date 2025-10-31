import Showcase from '../components/Showcase';
import Input from '../../react/src/Input';

export const Overview = () => {
    return (
        <Showcase label="Input">
            <Showcase.Item label="default">
                <Showcase.Variant>
                    <Input />
                </Showcase.Variant>
                <Showcase.Variant>
                    <Input placeholder="placeholder" />
                </Showcase.Variant>
                <Showcase.Variant>
                    <Input value="value" />
                </Showcase.Variant>
            </Showcase.Item>
            <Showcase.Item label="isDisabled">
                <Showcase.Variant>
                    <Input isDisabled={true} />
                </Showcase.Variant>
                <Showcase.Variant>
                    <Input placeholder="placeholder" isDisabled={true} />
                </Showcase.Variant>
                <Showcase.Variant>
                    <Input value="value" isDisabled={true} />
                </Showcase.Variant>
            </Showcase.Item>
            <Showcase.Item label="isError">
                <Showcase.Variant>
                    <Input isError={true} />
                </Showcase.Variant>
                <Showcase.Variant>
                    <Input placeholder="placeholder" isError={true} />
                </Showcase.Variant>
                <Showcase.Variant>
                    <Input value="value" isError={true} />
                </Showcase.Variant>
            </Showcase.Item>
        </Showcase>
    );
};
