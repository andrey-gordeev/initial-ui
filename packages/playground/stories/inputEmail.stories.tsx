import {
    Showcase,
    ShowcaseItem,
    ShowcaseVariant,
} from '../components/Showcase';
import InputEmail from '../../react/src/InputEmail';

export const Overview = () => {
    return (
        <Showcase>
            <ShowcaseItem label="default">
                <ShowcaseVariant>
                    <InputEmail />
                </ShowcaseVariant>
            </ShowcaseItem>
            <ShowcaseItem label="label, hint">
                <ShowcaseVariant>
                    <InputEmail label="Email Address" />
                </ShowcaseVariant>
                <ShowcaseVariant>
                    <InputEmail
                        label="Email Address"
                        placeholder="e.g. john@example.com"
                        hint="We'll use this to send you important updates"
                    />
                </ShowcaseVariant>
                <ShowcaseVariant>
                    <InputEmail
                        label="Email Address"
                        placeholder="e.g. john@example.com"
                        value="john.doe@example.com"
                        hint="Enter your email address as it appears on official documents."
                    />
                </ShowcaseVariant>
            </ShowcaseItem>
            <ShowcaseItem label="isDisabled">
                <ShowcaseVariant>
                    <InputEmail label="Email Address" isDisabled={true} />
                </ShowcaseVariant>
                <ShowcaseVariant>
                    <InputEmail
                        label="Email Address"
                        placeholder="e.g. john@example.com"
                        hint="We'll use this to send you important updates"
                        isDisabled={true}
                    />
                </ShowcaseVariant>
                <ShowcaseVariant>
                    <InputEmail
                        label="Email Address"
                        placeholder="e.g. john@example.com"
                        value="john.doe@example.com"
                        hint="Enter your email address as it appears on official documents."
                        isDisabled={true}
                    />
                </ShowcaseVariant>
            </ShowcaseItem>
            <ShowcaseItem label="error">
                <ShowcaseVariant>
                    <InputEmail label="Email Address" />
                </ShowcaseVariant>
                <ShowcaseVariant>
                    <InputEmail
                        label="Email Address"
                        placeholder="e.g. john@example.com"
                        hint="We'll use this to send you important updates"
                        error="This field is required"
                    />
                </ShowcaseVariant>
                <ShowcaseVariant>
                    <InputEmail
                        label="Email Address"
                        placeholder="e.g. john@example.com"
                        value=".john@example.com"
                        hint="Enter your email address as it appears on official documents."
                        error="Please enter a valid email address format."
                    />
                </ShowcaseVariant>
            </ShowcaseItem>
        </Showcase>
    );
};
