import Showcase from '../components/Showcase';
import ButtonGroup from '../../react/src/ButtonGroup';
import Button from '../../react/src/Button';

export const Overview = () => {
    return (
        <Showcase label="ButtonGroup">
            <Showcase.Item>
                <ButtonGroup>
                    <Button variant="primary" />
                    <Button variant="secondary" />
                </ButtonGroup>
            </Showcase.Item>
        </Showcase>
    );
};
