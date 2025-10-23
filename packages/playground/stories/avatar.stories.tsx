import {
    Showcase,
    ShowcaseItem,
    ShowcaseVariant,
} from '../components/Showcase';
import Avatar from '../../react/src/Avatar';
import {
    AVATAR_BADGE_PLACEMENTS,
    AVATAR_SIZES,
} from '../../react/src/Avatar/constants';
import { AvatarSize, AvatarBadgeProps } from '../../react/src/Avatar/types';

export const Overview = () => {
    const badgeCentrePoint = (
        <div
            style={{
                inlineSize: '12px',
                blockSize: '12px',
                content: '',
                backgroundColor: 'crimson',
                borderRadius: '50%',
            }}
        />
    );

    return (
        <Showcase>
            <ShowcaseItem label="size">
                {(Object.keys(AVATAR_SIZES) as AvatarSize[]).map((item) => (
                    <ShowcaseVariant label={item}>
                        <Avatar size={item} label={`Size: '${item}' `} />
                    </ShowcaseVariant>
                ))}
            </ShowcaseItem>
            <ShowcaseItem label="badges">
                <div
                    style={{ width: 'fit-content', backgroundColor: 'orange' }}
                >
                    <Avatar
                        size="lg"
                        badges={Object.keys(AVATAR_BADGE_PLACEMENTS).map(
                            (item) =>
                                ({
                                    placement: item,
                                    gap: 4,
                                    content: badgeCentrePoint,
                                }) as AvatarBadgeProps,
                        )}
                    >
                        [AV]
                    </Avatar>
                </div>
            </ShowcaseItem>
            <ShowcaseItem label="halo">
                <Avatar
                    badges={{ placement: 'top-end', content: badgeCentrePoint }}
                    halo={true}
                >
                    [AV]
                </Avatar>
            </ShowcaseItem>
            <ShowcaseItem label="inset">
                <Avatar
                    badges={{ placement: 'top-end', content: badgeCentrePoint }}
                    inset={true}
                >
                    [AV]
                </Avatar>
            </ShowcaseItem>
            <ShowcaseItem label="Add button">
                <Avatar type="add-button">AV</Avatar>
            </ShowcaseItem>
        </Showcase>
    );
};
