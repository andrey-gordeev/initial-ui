import Showcase from '../components/Showcase';
import Checkbox from '../../react/src/Checkbox';

export const Overview = () => {
    return (
        <Showcase>
            <Showcase.Item label="default">
                <Checkbox />
            </Showcase.Item>
            <Showcase.Item label="isChecked">
                <Checkbox isChecked={true} />
            </Showcase.Item>
            <Showcase.Item label="isIndeterminate">
                <Checkbox isIndeterminate={true} />
            </Showcase.Item>
            <Showcase.Item label="isDisabled">
                <Checkbox isDisabled={true} />
            </Showcase.Item>
            <Showcase.Item label="isChecked and isDisabled">
                <Checkbox isChecked={true} isDisabled={true} />
            </Showcase.Item>
        </Showcase>
    );
};
