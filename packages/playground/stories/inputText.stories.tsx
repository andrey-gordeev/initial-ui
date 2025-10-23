import {
    Showcase,
    ShowcaseItem,
    ShowcaseVariant,
} from '../components/Showcase';
import InputText from '../../react/src/InputText';

export const Overview = () => {
    return (
        <Showcase>
            <ShowcaseItem label="default">
                <ShowcaseVariant>
                    <InputText />
                </ShowcaseVariant>
            </ShowcaseItem>
            <ShowcaseItem label="label, hint">
                <ShowcaseVariant>
                    <InputText label="First name" />
                </ShowcaseVariant>
                <ShowcaseVariant>
                    <InputText
                        label="First name"
                        placeholder="e.g. John"
                        hint="This will be your display name"
                    />
                </ShowcaseVariant>
                <ShowcaseVariant>
                    <InputText
                        label="First name"
                        placeholder="e.g. John"
                        value="John"
                        hint="Enter your given name as it appears on official documents."
                    />
                </ShowcaseVariant>
            </ShowcaseItem>
            <ShowcaseItem label="isDisabled">
                <ShowcaseVariant>
                    <InputText label="First name" isDisabled={true} />
                </ShowcaseVariant>
                <ShowcaseVariant>
                    <InputText
                        label="First name"
                        placeholder="e.g. John"
                        hint="This will be your display name"
                        isDisabled={true}
                    />
                </ShowcaseVariant>
                <ShowcaseVariant>
                    <InputText
                        label="First name"
                        placeholder="e.g. John"
                        value="John"
                        hint="Enter your given name as it appears on official documents."
                        isDisabled={true}
                    />
                </ShowcaseVariant>
            </ShowcaseItem>
            <ShowcaseItem label="error">
                <ShowcaseVariant>
                    <InputText label="First name" />
                </ShowcaseVariant>
                <ShowcaseVariant>
                    <InputText
                        label="First name"
                        placeholder="e.g. John"
                        hint="This will be your display name"
                        error="This field is required"
                    />
                </ShowcaseVariant>
                <ShowcaseVariant>
                    <InputText
                        label="First name"
                        placeholder="e.g. John"
                        value="Louis XIV, the Sun King"
                        hint="Enter your given name as it appears on official documents."
                        error="Your first name should only contain letters. Numbers and special characters are not allowed."
                    />
                </ShowcaseVariant>
            </ShowcaseItem>
        </Showcase>
    );
};
