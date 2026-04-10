import Showcase from '../components/Showcase';
import Grid from '../components/Grid';
import Button, { BUTTON_VARIANT } from '../../react/src/Button';

export const Overview = () => {
    return (
        <Showcase label="Button">
            <Showcase.Item label="default">
                <Button label="Button" />
                <Button label="Button" />
            </Showcase.Item>
            <Showcase.Item label="variant">
                <Grid columns={4}>
                    {Object.values(BUTTON_VARIANT).map((item) => (
                        <Grid.Cell key={`btn-variant-${item}`}>
                            <Showcase.Variant>
                                <Button label={item} variant={item} />
                            </Showcase.Variant>
                        </Grid.Cell>
                    ))}
                </Grid>
            </Showcase.Item>
            <Showcase.Item label="variant & isDisabled">
                <Grid columns={4}>
                    {Object.values(BUTTON_VARIANT).map((item) => (
                        <Grid.Cell key={`btn-variant-${item}-disabled`}>
                            <Showcase.Variant>
                                <Button
                                    label={item}
                                    variant={item}
                                    isDisabled={true}
                                />
                            </Showcase.Variant>
                        </Grid.Cell>
                    ))}
                </Grid>
            </Showcase.Item>
            <Showcase.Item label="with icon">
                <Button label="Add" icon="plus-24" />
                <Button label="Search" icon="search-24" variant="secondary" />
            </Showcase.Item>
        </Showcase>
    );
};
