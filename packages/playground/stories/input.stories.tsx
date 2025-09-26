import {
    Showcase,
    ShowcaseItem,
    ShowcaseVariant,
} from '../components/Showcase';
import Input from '../../react/src/Input';

export const Overview = () => {
    return (
        <Showcase>
            <ShowcaseItem label="default">
                <ShowcaseVariant>
                    <Input />
                </ShowcaseVariant>
                <ShowcaseVariant>
                    <Input placeholder="placeholder" />
                </ShowcaseVariant>
                <ShowcaseVariant>
                    <Input value="value" />
                </ShowcaseVariant>
            </ShowcaseItem>
            <ShowcaseItem label="isDisabled">
                <ShowcaseVariant>
                    <Input isDisabled={true} />
                </ShowcaseVariant>
                <ShowcaseVariant>
                    <Input placeholder="placeholder" isDisabled={true} />
                </ShowcaseVariant>
                <ShowcaseVariant>
                    <Input value="value" isDisabled={true} />
                </ShowcaseVariant>
            </ShowcaseItem>
            <ShowcaseItem label="isError">
                <ShowcaseVariant>
                    <Input isError={true} />
                </ShowcaseVariant>
                <ShowcaseVariant>
                    <Input placeholder="placeholder" isError={true} />
                </ShowcaseVariant>
                <ShowcaseVariant>
                    <Input value="value" isError={true} />
                </ShowcaseVariant>
            </ShowcaseItem>
        </Showcase>
    );
};
