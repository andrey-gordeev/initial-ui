import Showcase from '../components/Showcase';
import InputEmail from '../../react/src/InputEmail';

export const Overview = () => {
    return (
        <Showcase label="InputEmail">
            <Showcase.Item label="default">
                <Showcase.Variant>
                    <InputEmail />
                </Showcase.Variant>
            </Showcase.Item>
            <Showcase.Item label="label, hint">
                <Showcase.Variant>
                    <InputEmail label="Email Address" />
                </Showcase.Variant>
                <Showcase.Variant>
                    <InputEmail
                        label="Email Address"
                        placeholder="e.g. john@example.com"
                        hint="We'll use this to send you important updates"
                    />
                </Showcase.Variant>
                <Showcase.Variant>
                    <InputEmail
                        label="Email Address"
                        placeholder="e.g. john@example.com"
                        value="john.doe@example.com"
                        hint="Enter your email address as it appears on official documents."
                    />
                </Showcase.Variant>
            </Showcase.Item>
            <Showcase.Item label="isDisabled">
                <Showcase.Variant>
                    <InputEmail label="Email Address" isDisabled={true} />
                </Showcase.Variant>
                <Showcase.Variant>
                    <InputEmail
                        label="Email Address"
                        placeholder="e.g. john@example.com"
                        hint="We'll use this to send you important updates"
                        isDisabled={true}
                    />
                </Showcase.Variant>
                <Showcase.Variant>
                    <InputEmail
                        label="Email Address"
                        placeholder="e.g. john@example.com"
                        value="john.doe@example.com"
                        hint="Enter your email address as it appears on official documents."
                        isDisabled={true}
                    />
                </Showcase.Variant>
            </Showcase.Item>
            <Showcase.Item label="error">
                <Showcase.Variant>
                    <InputEmail label="Email Address" />
                </Showcase.Variant>
                <Showcase.Variant>
                    <InputEmail
                        label="Email Address"
                        placeholder="e.g. john@example.com"
                        hint="We'll use this to send you important updates"
                        error="This field is required"
                    />
                </Showcase.Variant>
                <Showcase.Variant>
                    <InputEmail
                        label="Email Address"
                        placeholder="e.g. john@example.com"
                        value=".john@example.com"
                        hint="Enter your email address as it appears on official documents."
                        error="Please enter a valid email address format."
                    />
                </Showcase.Variant>
            </Showcase.Item>
        </Showcase>
    );
};
