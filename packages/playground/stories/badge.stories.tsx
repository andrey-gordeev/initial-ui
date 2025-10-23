import {
    Showcase,
    ShowcaseItem,
    ShowcaseVariant,
} from '../components/Showcase';
import Badge from '../../react/src/Badge';

export const Overview = () => {
    return (
        <Showcase>
            <ShowcaseItem label="text">
                <ShowcaseVariant>
                    <Badge text="1" />
                </ShowcaseVariant>
                <ShowcaseVariant>
                    <Badge text="12" />
                </ShowcaseVariant>
                <ShowcaseVariant>
                    <Badge text="99+" />
                </ShowcaseVariant>
                <ShowcaseVariant>
                    <Badge text="999+" />
                </ShowcaseVariant>
            </ShowcaseItem>
            <ShowcaseItem>
                <ShowcaseVariant>
                    <Badge icon="sun-16" />
                </ShowcaseVariant>
            </ShowcaseItem>
        </Showcase>
    );
};
