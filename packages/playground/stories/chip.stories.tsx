import {
    Showcase,
    ShowcaseItem,
    ShowcaseVariant,
} from '../components/Showcase';
import Chip, { ChipProps } from '../../react/src/Chip';

export const Overview = () => {
    const items: ChipProps[] = [
        { label: 'Grocery' },
        { label: 'Pharmacy' },
        { label: 'Restaurant' },
        { label: 'Hardware store' },
        { label: 'Clothing store' },
        { label: 'Coffee shop' },
        { label: 'Bookstore' },
        { label: 'Electronics store' },
        { label: 'Gas station' },
        { label: 'Bank' },
        { label: 'Post office' },
        { label: 'Dry cleaner' },
    ];

    const itemsWithIcons: ChipProps[] = [
        { label: 'Moon', icon: 'moon-16' },
        { label: 'Rocket', icon: 'rocket-16' },
        { label: 'Sun', icon: 'sun-16' },
        { label: 'Telescope', icon: 'telescope-16' },
    ];

    return (
        <Showcase>
            <ShowcaseItem>
                {items.map((item, index) => (
                    <ShowcaseVariant key={index}>
                        <Chip {...item} />
                    </ShowcaseVariant>
                ))}
            </ShowcaseItem>
            <ShowcaseItem>
                {itemsWithIcons.map((item, index) => (
                    <ShowcaseVariant key={index}>
                        <Chip {...item} />
                    </ShowcaseVariant>
                ))}
            </ShowcaseItem>
        </Showcase>
    );
};
