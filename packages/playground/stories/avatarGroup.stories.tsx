import { Showcase, ShowcaseItem } from '../components/Showcase';
import AvatarGroup from '../../react/src/AvatarGroup';

export const Overview = () => {
    const avatars = [
        { content: 'AV', id: '1' },
        { content: 'AC', id: '2' },
        { content: 'NC', id: '3' },
        { content: 'KO', id: '4' },
        { content: 'ZZ', id: '5' },
    ];

    return (
        <Showcase>
            <ShowcaseItem>
                <div
                    style={{ width: 'fit-content', backgroundColor: 'orange' }}
                >
                    <AvatarGroup
                        avatars={avatars}
                        maxVisible={4}
                        overlap={16}
                        gap={1}
                        // debug={true}
                    />
                </div>
            </ShowcaseItem>
        </Showcase>
    );
};
