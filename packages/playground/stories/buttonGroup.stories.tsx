import { Showcase, ShowcaseItem } from '../components/Showcase';
import ButtonGroup from '../../react/src/ButtonGroup';
import Button from '../../react/src/Button';

export const Overview = () => {
    return (
        <Showcase>
            <ShowcaseItem>
                <ButtonGroup>
                    <Button variant="primary" />
                    <Button variant="secondary" />
                </ButtonGroup>
            </ShowcaseItem>
        </Showcase>
    );
};
