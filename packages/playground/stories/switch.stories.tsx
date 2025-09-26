import {
    Showcase,
    ShowcaseItem,
    ShowcaseVariant,
} from '../components/Showcase';
import Switch from '../../react/src/Switch';

export const Overview = () => {
    return (
        <>
            <Showcase>
                <ShowcaseItem label="default">
                    <Switch />
                </ShowcaseItem>
                <ShowcaseItem label="isChecked">
                    <Switch isChecked={true} />
                </ShowcaseItem>
                <ShowcaseItem label="isDisabled">
                    <Switch isDisabled={true} />
                </ShowcaseItem>
                <ShowcaseItem label="isChecked and isDisabled">
                    <Switch isChecked={true} isDisabled={true} />
                </ShowcaseItem>
            </Showcase>
            <Showcase>
                <ShowcaseItem label="label">
                    <ShowcaseVariant>
                        <Switch label="Notifications" />
                    </ShowcaseVariant>
                    <ShowcaseVariant>
                        <Switch label="Enable notifications for updates and alerts" />
                    </ShowcaseVariant>
                </ShowcaseItem>
                <ShowcaseItem label="label and hint">
                    <ShowcaseVariant>
                        <Switch
                            label="Notifications"
                            hint="Turn notifications on or off"
                        />
                    </ShowcaseVariant>
                    <ShowcaseVariant>
                        <Switch
                            label="Enable notifications for updates and alerts"
                            hint="Choose whether the app can send you alerts, reminders, and other updates"
                        />
                    </ShowcaseVariant>
                </ShowcaseItem>
                <ShowcaseItem label="label, hint and isDisabled">
                    <Switch
                        label="Enable notifications for updates and alerts"
                        hint="Choose whether the app can send you alerts, reminders, and other updates"
                        isDisabled={true}
                    />
                </ShowcaseItem>
            </Showcase>
        </>
    );
};
