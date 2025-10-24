import {
    Showcase,
    ShowcaseItem,
    ShowcaseVariant,
} from '../components/Showcase';
import Badge from '../../react/src/Badge';
import Stack from '../../react/src/Stack';
import { BADGE_COLORS } from '../../react/src/Badge/constants';

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
            <ShowcaseItem label="icon">
                <ShowcaseVariant>
                    <Badge icon="sun-16" />
                </ShowcaseVariant>
            </ShowcaseItem>
            <ShowcaseItem label="size">
                <ShowcaseVariant>
                    <Stack>
                        <Badge text="9" size="sm" />
                        <Badge text="9+" size="sm" />
                        <Badge text="99+" size="sm" />
                        <Badge text="Label" size="sm" />
                    </Stack>
                </ShowcaseVariant>
                <ShowcaseVariant>
                    <Stack>
                        <Badge text="9" size="md" />
                        <Badge text="9+" size="md" />
                        <Badge text="99+" size="md" />
                        <Badge text="Label" size="md" />
                    </Stack>
                </ShowcaseVariant>
                <ShowcaseVariant>
                    <Stack>
                        <Badge text="9" size="lg" />
                        <Badge text="9+" size="lg" />
                        <Badge text="99+" size="lg" />
                        <Badge text="Label" size="lg" />
                    </Stack>
                </ShowcaseVariant>
            </ShowcaseItem>
            <ShowcaseItem label="color">
                {Object.values(BADGE_COLORS).map((item) => (
                    <Badge key={item} color={item} text={item} />
                ))}
            </ShowcaseItem>
        </Showcase>
    );
};
