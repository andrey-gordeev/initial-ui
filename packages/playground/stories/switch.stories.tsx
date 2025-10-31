import Showcase from '../components/Showcase';
import Switch from '../../react/src/Switch';

export const Overview = () => {
    return (
        <>
            <Showcase label="Switch">
                <Showcase.Item label="default">
                    <Switch />
                </Showcase.Item>
                <Showcase.Item label="isChecked">
                    <Switch isChecked={true} />
                </Showcase.Item>
                <Showcase.Item label="isDisabled">
                    <Switch isDisabled={true} />
                </Showcase.Item>
                <Showcase.Item label="isChecked and isDisabled">
                    <Switch isChecked={true} isDisabled={true} />
                </Showcase.Item>
            </Showcase>
            <Showcase>
                <Showcase.Item label="label">
                    <Showcase.Variant>
                        <Switch label="Notifications" />
                    </Showcase.Variant>
                    <Showcase.Variant>
                        <Switch label="Enable notifications for updates and alerts" />
                    </Showcase.Variant>
                </Showcase.Item>
                <Showcase.Item label="label and hint">
                    <Showcase.Variant>
                        <Switch
                            label="Notifications"
                            hint="Turn notifications on or off"
                        />
                    </Showcase.Variant>
                    <Showcase.Variant>
                        <Switch
                            label="Enable notifications for updates and alerts"
                            hint="Choose whether the app can send you alerts, reminders, and other updates"
                        />
                    </Showcase.Variant>
                </Showcase.Item>
                <Showcase.Item label="label, hint and isDisabled">
                    <Switch
                        label="Enable notifications for updates and alerts"
                        hint="Choose whether the app can send you alerts, reminders, and other updates"
                        isDisabled={true}
                    />
                </Showcase.Item>
            </Showcase>
        </>
    );
};
