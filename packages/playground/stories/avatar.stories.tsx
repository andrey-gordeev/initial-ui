import { Showcase, ShowcaseItem } from '../components/Showcase';
import Avatar from '../../react/src/Avatar';

export const Overview = () => {
    return (
        <Showcase>
            <ShowcaseItem>
                <div
                    style={{ backgroundColor: 'orange', width: 'fit-content' }}
                >
                    <Avatar
                        avatarContent={'AV'}
                        size={500}
                        badges={[
                            {
                                placement: 'top',
                                gap: 1,
                            },
                            {
                                placement: 'top-start',
                                gap: 2,
                            },
                            {
                                placement: 'top-end',
                                gap: 3,
                            },
                            {
                                placement: 'right',
                                gap: 4,
                            },
                            {
                                placement: 'bottom-end',
                                gap: 5,
                            },
                            {
                                placement: 'bottom',
                                gap: 6,
                            },
                            {
                                placement: 'bottom-start',
                                gap: 7,
                            },
                            {
                                placement: 'left',
                                gap: 8,
                            },
                        ]}
                    />
                </div>
            </ShowcaseItem>
        </Showcase>
    );
};
