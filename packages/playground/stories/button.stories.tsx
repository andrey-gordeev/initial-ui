import Showcase from '../components/Showcase';
import Grid from '../components/Grid';
import Button from '../../react/src/Button';

export const Overview = () => (
    <Showcase label="Button">
        <Showcase.Item label="default">
            <Button />
            <Button />
        </Showcase.Item>
        <Showcase.Item label="variant">
            <Grid columns={4}>
                <Grid.Cell>
                    <Showcase.Variant>
                        <Button variant="primary" />
                    </Showcase.Variant>
                </Grid.Cell>
                <Grid.Cell>
                    <Showcase.Variant>
                        <Button variant="primary-light" />
                    </Showcase.Variant>
                </Grid.Cell>
                <Grid.Cell>
                    <Showcase.Variant>
                        <Button variant="secondary" />
                    </Showcase.Variant>
                </Grid.Cell>
                <Grid.Cell>
                    <Showcase.Variant>
                        <Button variant="secondary-tertiary" />
                    </Showcase.Variant>
                </Grid.Cell>
                <Grid.Cell>
                    <Showcase.Variant>
                        <Button variant="tertiary" />
                    </Showcase.Variant>
                </Grid.Cell>
                <Grid.Cell>
                    <Showcase.Variant>
                        <Button variant="danger" />
                    </Showcase.Variant>
                </Grid.Cell>
                <Grid.Cell>
                    <Showcase.Variant>
                        <Button variant="danger-secondary" />
                    </Showcase.Variant>
                </Grid.Cell>
                <Grid.Cell>
                    <Showcase.Variant>
                        <Button variant="danger-tertiary" />
                    </Showcase.Variant>
                </Grid.Cell>
                <Grid.Cell>
                    <Showcase.Variant>
                        <Button variant="link" />
                    </Showcase.Variant>
                </Grid.Cell>
                <Grid.Cell>
                    <Showcase.Variant>
                        <Button variant="light" />
                    </Showcase.Variant>
                </Grid.Cell>
            </Grid>
        </Showcase.Item>
        <Showcase.Item label="variant & isDisabled">
            <Grid columns={4}>
                <Grid.Cell>
                    <Showcase.Variant>
                        <Button variant="primary" isDisabled={true} />
                    </Showcase.Variant>
                </Grid.Cell>
                <Grid.Cell>
                    <Showcase.Variant>
                        <Button variant="secondary" isDisabled={true} />
                    </Showcase.Variant>
                </Grid.Cell>
                <Grid.Cell>
                    <Showcase.Variant>
                        <Button
                            variant="secondary-tertiary"
                            isDisabled={true}
                        />
                    </Showcase.Variant>
                </Grid.Cell>
                <Grid.Cell>
                    <Showcase.Variant>
                        <Button variant="tertiary" isDisabled={true} />
                    </Showcase.Variant>
                </Grid.Cell>
                <Grid.Cell>
                    <Showcase.Variant>
                        <Button variant="danger" isDisabled={true} />
                    </Showcase.Variant>
                </Grid.Cell>
                <Grid.Cell>
                    <Showcase.Variant>
                        <Button variant="danger-secondary" isDisabled={true} />
                    </Showcase.Variant>
                </Grid.Cell>
                <Grid.Cell>
                    <Showcase.Variant>
                        <Button variant="danger-tertiary" isDisabled={true} />
                    </Showcase.Variant>
                </Grid.Cell>
                <Grid.Cell>
                    <Showcase.Variant>
                        <Button variant="link" isDisabled={true} />
                    </Showcase.Variant>
                </Grid.Cell>
                <Grid.Cell>
                    <Showcase.Variant>
                        <Button variant="light" isDisabled={true} />
                    </Showcase.Variant>
                </Grid.Cell>
            </Grid>
        </Showcase.Item>
    </Showcase>
);
