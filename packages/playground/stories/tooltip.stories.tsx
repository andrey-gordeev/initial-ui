import { Showcase, ShowcaseItem } from '../components/Showcase';
import Tooltip from '../../react/src/Tooltip';

export const Overview = () => {
    return (
        <Showcase>
            <ShowcaseItem>
                <Tooltip text="Save changes now" />
            </ShowcaseItem>
            <ShowcaseItem>
                <Tooltip text="This is a longer tooltip example to demonstrate how the tooltip adjusts its width and padding dynamically based on the content inside it." />
            </ShowcaseItem>
        </Showcase>
    );
};
