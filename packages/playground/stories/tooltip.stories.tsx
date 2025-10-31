import Showcase from '../components/Showcase';
import Tooltip from '../../react/src/Tooltip';

export const Overview = () => {
    return (
        <Showcase label="Tooltip">
            <Showcase.Item>
                <Tooltip text="Save changes now" />
            </Showcase.Item>
            <Showcase.Item>
                <Tooltip text="This is a longer tooltip example to demonstrate how the tooltip adjusts its width and padding dynamically based on the content inside it." />
            </Showcase.Item>
        </Showcase>
    );
};
