import Showcase from '../components/Showcase';
import InputText from '../../react/src/InputText';

export const Overview = () => {
    return (
        <Showcase>
            <Showcase.Item label="default">
                <Showcase.Variant>
                    <InputText />
                </Showcase.Variant>
            </Showcase.Item>
            <Showcase.Item label="label, hint">
                <Showcase.Variant>
                    <InputText label="First name" />
                </Showcase.Variant>
                <Showcase.Variant>
                    <InputText
                        label="First name"
                        placeholder="e.g. John"
                        hint="This will be your display name"
                    />
                </Showcase.Variant>
                <Showcase.Variant>
                    <InputText
                        label="First name"
                        placeholder="e.g. John"
                        value="John"
                        hint="Enter your given name as it appears on official documents."
                    />
                </Showcase.Variant>
            </Showcase.Item>
            <Showcase.Item label="isDisabled">
                <Showcase.Variant>
                    <InputText label="First name" isDisabled={true} />
                </Showcase.Variant>
                <Showcase.Variant>
                    <InputText
                        label="First name"
                        placeholder="e.g. John"
                        hint="This will be your display name"
                        isDisabled={true}
                    />
                </Showcase.Variant>
                <Showcase.Variant>
                    <InputText
                        label="First name"
                        placeholder="e.g. John"
                        value="John"
                        hint="Enter your given name as it appears on official documents."
                        isDisabled={true}
                    />
                </Showcase.Variant>
            </Showcase.Item>
            <Showcase.Item label="error">
                <Showcase.Variant>
                    <InputText label="First name" />
                </Showcase.Variant>
                <Showcase.Variant>
                    <InputText
                        label="First name"
                        placeholder="e.g. John"
                        hint="This will be your display name"
                        error="This field is required"
                    />
                </Showcase.Variant>
                <Showcase.Variant>
                    <InputText
                        label="First name"
                        placeholder="e.g. John"
                        value="Louis XIV, the Sun King"
                        hint="Enter your given name as it appears on official documents."
                        error="Your first name should only contain letters. Numbers and special characters are not allowed."
                    />
                </Showcase.Variant>
            </Showcase.Item>
        </Showcase>
    );
};
