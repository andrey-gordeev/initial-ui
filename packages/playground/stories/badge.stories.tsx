import Showcase from '../components/Showcase';
import Grid from '../components/Grid';
import Badge, { BADGE_COLORS } from '../../react/src/Badge';

export const Overview = () => {
    return (
        <Showcase>
            <Showcase.Item label="text">
                <Grid columns={16}>
                    <Grid.Cell>
                        <Showcase.Variant>
                            <Badge text="1" />
                        </Showcase.Variant>
                    </Grid.Cell>
                    <Grid.Cell>
                        <Showcase.Variant>
                            <Badge text="12" />
                        </Showcase.Variant>
                    </Grid.Cell>
                    <Grid.Cell>
                        <Showcase.Variant>
                            <Badge text="99+" />
                        </Showcase.Variant>
                    </Grid.Cell>
                    <Grid.Cell>
                        <Showcase.Variant>
                            <Badge text="999+" />
                        </Showcase.Variant>
                    </Grid.Cell>
                </Grid>
            </Showcase.Item>
            <Showcase.Item label="icon">
                <Grid columns={16}>
                    <Grid.Cell>
                        <Showcase.Variant>
                            <Badge icon="sun-16" />
                        </Showcase.Variant>
                    </Grid.Cell>
                </Grid>
            </Showcase.Item>
            <Showcase.Item label="size">
                <Grid columns={16}>
                    <Grid.Cell>
                        <Showcase.Variant>
                            <Badge text="9" size="sm" />
                        </Showcase.Variant>
                    </Grid.Cell>
                    <Grid.Cell>
                        <Showcase.Variant>
                            <Badge text="9+" size="sm" />
                        </Showcase.Variant>
                    </Grid.Cell>
                    <Grid.Cell>
                        <Showcase.Variant>
                            <Badge text="99+" size="sm" />
                        </Showcase.Variant>
                    </Grid.Cell>
                    <Grid.Cell>
                        <Showcase.Variant>
                            <Badge text="Label" size="sm" />
                        </Showcase.Variant>
                    </Grid.Cell>
                </Grid>
                <Grid columns={16}>
                    <Grid.Cell>
                        <Showcase.Variant>
                            <Badge text="9" size="md" />
                        </Showcase.Variant>
                    </Grid.Cell>
                    <Grid.Cell>
                        <Showcase.Variant>
                            <Badge text="9+" size="md" />
                        </Showcase.Variant>
                    </Grid.Cell>
                    <Grid.Cell>
                        <Showcase.Variant>
                            <Badge text="99+" size="md" />
                        </Showcase.Variant>
                    </Grid.Cell>
                    <Grid.Cell>
                        <Showcase.Variant>
                            <Badge text="Label" size="md" />
                        </Showcase.Variant>
                    </Grid.Cell>
                </Grid>
                <Grid columns={16}>
                    <Grid.Cell>
                        <Showcase.Variant>
                            <Badge text="9" size="lg" />
                        </Showcase.Variant>
                    </Grid.Cell>
                    <Grid.Cell>
                        <Showcase.Variant>
                            <Badge text="9+" size="lg" />
                        </Showcase.Variant>
                    </Grid.Cell>
                    <Grid.Cell>
                        <Showcase.Variant>
                            <Badge text="99+" size="lg" />
                        </Showcase.Variant>
                    </Grid.Cell>
                    <Grid.Cell>
                        <Showcase.Variant>
                            <Badge text="Label" size="lg" />
                        </Showcase.Variant>
                    </Grid.Cell>
                </Grid>
            </Showcase.Item>
            <Showcase.Item label="color">
                <Grid columns={16}>
                    {Object.values(BADGE_COLORS).map((item) => (
                        <Grid.Cell>
                            <Showcase.Variant>
                                <Badge key={item} color={item} text={item} />
                            </Showcase.Variant>
                        </Grid.Cell>
                    ))}
                </Grid>
            </Showcase.Item>
        </Showcase>
    );
};
