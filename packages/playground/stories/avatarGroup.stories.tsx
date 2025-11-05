import Showcase from '../components/Showcase';
import AvatarGroup from '../../react/src/AvatarGroup';

export const Overview = () => {
    const avatars = [
        { id: '1', content: 'AV' },
        { id: '2', content: 'AC' },
        { id: '3', content: 'DC' },
        { id: '4', content: 'KO' },
        { id: '5', content: 'AI' },
        { id: '6', content: 'VR' },
        { id: '7', content: 'DJ' },
        { id: '8', content: 'PR' },
        { id: '9', content: 'HR' },
        { id: '10', content: 'XL' },
    ];

    return (
        <Showcase label="AvatarGroup">
            <Showcase.Item label="default">
                <div
                    style={{ width: 'fit-content', backgroundColor: 'orange' }}
                >
                    <AvatarGroup avatars={avatars} />
                </div>
            </Showcase.Item>
            <Showcase.Item label="maxVisible">
                <Showcase.Variant label="default (5)">
                    <div
                        style={{
                            width: 'fit-content',
                            backgroundColor: 'orange',
                        }}
                    >
                        <AvatarGroup avatars={avatars} maxVisible={4} />
                    </div>
                </Showcase.Variant>
                <Showcase.Variant label="99">
                    <div
                        style={{
                            width: 'fit-content',
                            backgroundColor: 'orange',
                        }}
                    >
                        <AvatarGroup avatars={avatars} maxVisible={99} />
                    </div>
                </Showcase.Variant>
            </Showcase.Item>
            <Showcase.Item label="overlap & gap">
                <Showcase.Variant label="overlap (16)">
                    <div
                        style={{
                            width: 'fit-content',
                            backgroundColor: 'orange',
                        }}
                    >
                        <AvatarGroup avatars={avatars} overlap={16} />
                    </div>
                </Showcase.Variant>
                <Showcase.Variant label="overlap (16), gap (4)">
                    <div
                        style={{
                            width: 'fit-content',
                            backgroundColor: 'orange',
                        }}
                    >
                        <AvatarGroup avatars={avatars} overlap={16} gap={4} />
                    </div>
                </Showcase.Variant>
                <Showcase.Variant label="overlap (16), gap (0)">
                    <div
                        style={{
                            width: 'fit-content',
                            backgroundColor: 'orange',
                        }}
                    >
                        <AvatarGroup avatars={avatars} overlap={16} gap={0} />
                    </div>
                </Showcase.Variant>
            </Showcase.Item>
            <Showcase.Item label="size (sm)">
                <div
                    style={{ width: 'fit-content', backgroundColor: 'orange' }}
                >
                    <AvatarGroup avatars={avatars} size="sm" />
                </div>
            </Showcase.Item>
            <Showcase.Item label="showOverflow (false)">
                <div
                    style={{ width: 'fit-content', backgroundColor: 'orange' }}
                >
                    <AvatarGroup
                        avatars={avatars}
                        maxVisible={4}
                        showOverflow={false}
                    />
                </div>
            </Showcase.Item>
        </Showcase>
    );
};
