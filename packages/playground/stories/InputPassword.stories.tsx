import {
    Showcase,
    ShowcaseItem,
    ShowcaseVariant,
} from '../components/Showcase';
import InputPassword from '../../react/src/InputPassword';

export const Overview = () => {
    return (
        <Showcase>
            <ShowcaseItem label="default">
                <ShowcaseVariant>
                    <InputPassword />
                </ShowcaseVariant>
            </ShowcaseItem>
            <ShowcaseItem label="label, hint">
                <ShowcaseVariant>
                    <InputPassword label="Password" />
                </ShowcaseVariant>
                <ShowcaseVariant>
                    <InputPassword
                        label="Password"
                        placeholder="Enter your password"
                        hint="Must be at least 8 characters long"
                    />
                </ShowcaseVariant>
                <ShowcaseVariant>
                    <InputPassword
                        label="Password"
                        placeholder="Enter your password"
                        value="MySecurePassword123!"
                        hint="Use a combination of letters, numbers, and special characters."
                    />
                </ShowcaseVariant>
            </ShowcaseItem>
            <ShowcaseItem label="isDisabled">
                <ShowcaseVariant>
                    <InputPassword label="Password" isDisabled={true} />
                </ShowcaseVariant>
                <ShowcaseVariant>
                    <InputPassword
                        label="Password"
                        placeholder="Enter your password"
                        hint="Must be at least 8 characters long"
                        isDisabled={true}
                    />
                </ShowcaseVariant>
                <ShowcaseVariant>
                    <InputPassword
                        label="Password"
                        placeholder="Enter your password"
                        value="MySecurePassword123!"
                        hint="Use a combination of letters, numbers, and special characters."
                        isDisabled={true}
                    />
                </ShowcaseVariant>
            </ShowcaseItem>
            <ShowcaseItem label="error">
                <ShowcaseVariant>
                    <InputPassword label="Password" />
                </ShowcaseVariant>
                <ShowcaseVariant>
                    <InputPassword
                        label="Password"
                        placeholder="Enter your password"
                        hint="Must be at least 8 characters long"
                        error="This field is required"
                    />
                </ShowcaseVariant>
                <ShowcaseVariant>
                    <InputPassword
                        label="Password"
                        placeholder="Enter your password"
                        value="louis.xiv.the.sun.king@versailles.fr"
                        hint="Use a combination of letters, numbers, and special characters."
                        error="Password must contain at least one uppercase letter, one number, and one special character."
                    />
                </ShowcaseVariant>
            </ShowcaseItem>
        </Showcase>
    );
};
