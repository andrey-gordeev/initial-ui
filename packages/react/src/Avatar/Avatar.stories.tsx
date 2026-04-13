import type { Meta, StoryObj } from '@storybook/react-vite';

import Showcase from '../../../playground/components/Showcase';
import Grid from '../../../playground/components/Grid';
import { Avatar } from './Avatar';
import { AVATAR_BADGE_PLACEMENTS, AVATAR_SIZES } from './constants';
import type { AvatarBadgeProps } from './types';
import Badge from '../Badge';

type Story = StoryObj<typeof meta>;

const meta = {
    title: 'Components/Avatar',
    component: Avatar,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Avatar>;

export const Overview: Story = {
    render: () => {
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
                        {Object.values(AVATAR_SIZES).map((item) => (
                            <Showcase.Variant label={item}>
                                <Avatar
                                    size={item}
                                    label={`Size: '${item}' `}
                                />
                            </Showcase.Variant>
                        ))}
                    </Grid>
                </Showcase.Item>
                <Showcase.Item label="badges">
                    <div
                        style={{
                            width: 'fit-content',
                            backgroundColor: 'orange',
                        }}
                    >
                        <Avatar
                            size="lg"
                            badges={Object.values(
                                AVATAR_BADGE_PLACEMENTS,
                            ).map(
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
                    <Avatar type="add-button">+1</Avatar>
                </Showcase.Item>
            </Showcase>
        );
    },
};

export default meta;
