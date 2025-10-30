import Showcase from '../components/Showcase';
import Grid from '../components/Grid';
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
        <Showcase label="Chip">
            <Showcase.Item label="label">
                <Grid columns={4}>
                    {items.map((item, index) => (
                        <Grid.Cell>
                            <Showcase.Variant key={index}>
                                <Chip {...item} />
                            </Showcase.Variant>
                        </Grid.Cell>
                    ))}
                </Grid>
            </Showcase.Item>
            <Showcase.Item label="icon">
                <Grid columns={4}>
                    {itemsWithIcons.map((item, index) => (
                        <Grid.Cell>
                            <Showcase.Variant key={index}>
                                <Chip {...item} />
                            </Showcase.Variant>
                        </Grid.Cell>
                    ))}
                </Grid>
            </Showcase.Item>
        </Showcase>
    );
};
