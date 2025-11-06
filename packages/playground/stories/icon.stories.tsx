import Showcase from '../components/Showcase';
import Grid from '../components/Grid';
import { Icon, ICON_NAMES } from '../../react/src/Icon';

export const Overview = () => {
    return (
        <Showcase label="Icon">
            <Showcase.Item>
                <Grid columns={6}>
                    {Object.values(ICON_NAMES).map((item) => (
                        <Grid.Cell>
                            <Showcase.Variant label={item}>
                                <Icon name={item} size="md" />
                            </Showcase.Variant>
                        </Grid.Cell>
                    ))}
                </Grid>
            </Showcase.Item>
        </Showcase>
    );
};
