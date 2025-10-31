import Showcase from '../components/Showcase';
import InputPassword from '../../react/src/InputPassword';

export const Overview = () => {
    return (
        <Showcase label="InputPassword">
            <Showcase.Item label="default">
                <Showcase.Variant>
                    <InputPassword />
                </Showcase.Variant>
            </Showcase.Item>
            <Showcase.Item label="label, hint">
                <Showcase.Variant>
                    <InputPassword label="Password" />
                </Showcase.Variant>
                <Showcase.Variant>
                    <InputPassword
                        label="Password"
                        placeholder="Enter your password"
                        hint="Must be at least 8 characters long"
                    />
                </Showcase.Variant>
                <Showcase.Variant>
                    <InputPassword
                        label="Password"
                        placeholder="Enter your password"
                        value="MySecurePassword123!"
                        hint="Use a combination of letters, numbers, and special characters."
                    />
                </Showcase.Variant>
            </Showcase.Item>
            <Showcase.Item label="isDisabled">
                <Showcase.Variant>
                    <InputPassword label="Password" isDisabled={true} />
                </Showcase.Variant>
                <Showcase.Variant>
                    <InputPassword
                        label="Password"
                        placeholder="Enter your password"
                        hint="Must be at least 8 characters long"
                        isDisabled={true}
                    />
                </Showcase.Variant>
                <Showcase.Variant>
                    <InputPassword
                        label="Password"
                        placeholder="Enter your password"
                        value="MySecurePassword123!"
                        hint="Use a combination of letters, numbers, and special characters."
                        isDisabled={true}
                    />
                </Showcase.Variant>
            </Showcase.Item>
            <Showcase.Item label="error">
                <Showcase.Variant>
                    <InputPassword label="Password" />
                </Showcase.Variant>
                <Showcase.Variant>
                    <InputPassword
                        label="Password"
                        placeholder="Enter your password"
                        hint="Must be at least 8 characters long"
                        error="This field is required"
                    />
                </Showcase.Variant>
                <Showcase.Variant>
                    <InputPassword
                        label="Password"
                        placeholder="Enter your password"
                        value="louis.xiv.the.sun.king@versailles.fr"
                        hint="Use a combination of letters, numbers, and special characters."
                        error="Password must contain at least one uppercase letter, one number, and one special character."
                    />
                </Showcase.Variant>
            </Showcase.Item>
        </Showcase>
    );
};
