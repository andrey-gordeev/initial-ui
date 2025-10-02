import {
    Showcase,
    ShowcaseItem,
    ShowcaseVariant,
} from '../components/Showcase';
import Avatar from '../../react/src/Avatar';

export const Overview = () => {
    return (
        <Showcase>
            <ShowcaseItem label="size">
                <ShowcaseVariant label="sm">
                    <Avatar size="sm" content="SM" />
                </ShowcaseVariant>
                <ShowcaseVariant label="md">
                    <Avatar size="md" content="MD" />
                </ShowcaseVariant>
                <ShowcaseVariant label="lg">
                    <Avatar size="lg" content="LG" />
                </ShowcaseVariant>
                <ShowcaseVariant label="jumbo">
                    <Avatar size="jumbo" content="JUMBO" />
                </ShowcaseVariant>
            </ShowcaseItem>
            <ShowcaseItem label="badges">
                <div
                    style={{ backgroundColor: 'orange', width: 'fit-content' }}
                >
                    <Avatar
                        size="jumbo"
                        badges={[
                            {
                                placement: 'top',
                                gap: 0,
                            },
                            {
                                placement: 'top-start',
                                gap: 2,
                                content: (
                                    <div
                                        style={{
                                            padding: '4px',
                                            fontSize: '11px',
                                            backgroundColor: 'crimson',
                                            borderRadius: 'inherit',
                                        }}
                                    ></div>
                                ),
                            },
                            {
                                placement: 'top-end',
                                gap: 2,
                            },
                            {
                                placement: 'right',
                                gap: 3,
                            },
                            {
                                placement: 'bottom-end',
                                gap: 4,
                            },
                            {
                                placement: 'bottom',
                                gap: 5,
                            },
                            {
                                placement: 'bottom-start',
                                gap: 6,
                            },
                            {
                                placement: 'left',
                                gap: 7,
                            },
                        ]}
                    >
                        [AV]
                    </Avatar>
                </div>
            </ShowcaseItem>
            <ShowcaseItem label="halo">
                <Avatar badges={{ placement: 'top-end' }} halo={true}>
                    [AV]
                </Avatar>
            </ShowcaseItem>
            <ShowcaseItem label="inset">
                <Avatar badges={{ placement: 'top-end' }} inset={true}>
                    [AV]
                </Avatar>
            </ShowcaseItem>
        </Showcase>
    );
};
