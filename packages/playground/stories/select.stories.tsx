import Showcase from '../components/Showcase';
import Select from '../../react/src/Select';
import Stack from '../../react/src/Stack';
import Input from '../../react/src/Input';
import FormControl from '../../react/src/FormControl';

export const Overview = () => {
    return (
        <Showcase label="Select">
            <Showcase.Item>
                <Showcase.Variant>
                    <Stack>
                        <Select />
                        <Input value="Select" />
                    </Stack>
                </Showcase.Variant>
            </Showcase.Item>
            <Showcase.Item>
                <Showcase.Variant>
                    <FormControl label={'Select'} error={'error'}>
                        <Select />
                    </FormControl>
                </Showcase.Variant>
            </Showcase.Item>
        </Showcase>
    );
};
