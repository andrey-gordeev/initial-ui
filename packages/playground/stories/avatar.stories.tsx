import Showcase from '../components/Showcase';
import Grid from '../components/Grid';
import Avatar from '../../react/src/Avatar';
import {
    AVATAR_BADGE_PLACEMENTS,
    AVATAR_SIZES,
} from '../../react/src/Avatar/constants';
import { AvatarSize, AvatarBadgeProps } from '../../react/src/Avatar/types';
import Badge from '../../react/src/Badge';

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
        <Showcase label="Avatar">
            <Showcase.Item label="size">
                <Grid columns={4}>
                    {(Object.keys(AVATAR_SIZES) as AvatarSize[]).map((item) => (
                        <Showcase.Variant label={item}>
                            <Avatar size={item} label={`Size: '${item}' `} />
                        </Showcase.Variant>
                    ))}
                </Grid>
            </Showcase.Item>
            <Showcase.Item label="badges">
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
            </Showcase.Item>
            <Showcase.Item label="halo">
                <Avatar
                    badges={{
                        placement: 'top-end',
                        content: <Badge text="9" />,
                    }}
                    halo={true}
                >
                    [AV]
                </Avatar>
            </Showcase.Item>
            <Showcase.Item label="inset">
                <Avatar
                    badges={{
                        placement: 'top-end',
                        content: <Badge text="9" />,
                    }}
                    inset={true}
                >
                    [AV]
                </Avatar>
            </Showcase.Item>
            <Showcase.Item label="Add button">
                <Avatar type="add-button">AV</Avatar>
            </Showcase.Item>
        </Showcase>
    );
};
