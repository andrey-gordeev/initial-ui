import { useState } from 'react';
import Showcase from '../components/Showcase';
import SegmentedControl, { Segment } from '../../react/src/SegmentedControl';

export const Overview = () => {
    const [selectedValue, setSelectedValue] = useState<string>('Week');

    return (
        <Showcase label="SegmentedControl">
            <Showcase.Item label="with Children (uncontrolled)">
                <Showcase.Variant>
                    <SegmentedControl>
                        <Segment label="Day" />
                        <Segment label="Week" />
                        <Segment label="Month" />
                    </SegmentedControl>
                </Showcase.Variant>
                <Showcase.Variant>
                    <SegmentedControl
                        segments={[
                            { label: 'Day' },
                            { label: 'Week' },
                            { label: 'Month' },
                        ]}
                    />
                </Showcase.Variant>
            </Showcase.Item>
            <Showcase.Item label="isSelected (uncontrolled, like native checked)">
                <Showcase.Variant>
                    <SegmentedControl>
                        <Segment label="Day" />
                        <Segment label="Week" isSelected={true} />
                        <Segment label="Month" />
                    </SegmentedControl>
                </Showcase.Variant>
                <Showcase.Variant>
                    <SegmentedControl
                        segments={[
                            { label: 'Day' },
                            { label: 'Week', isSelected: true },
                            { label: 'Month' },
                        ]}
                    />
                </Showcase.Variant>
            </Showcase.Item>
            <Showcase.Item label="isDisabled (uncontrolled, like native disabled)">
                <Showcase.Variant>
                    <SegmentedControl>
                        <Segment label="Day" />
                        <Segment label="Week" isDisabled={true} />
                        <Segment label="Month" />
                    </SegmentedControl>
                </Showcase.Variant>
                <Showcase.Variant>
                    <SegmentedControl
                        segments={[
                            { label: 'Day' },
                            { label: 'Week', isDisabled: true },
                            { label: 'Month' },
                        ]}
                    />
                </Showcase.Variant>
            </Showcase.Item>
            <Showcase.Item label="Controlled (with state)">
                <Showcase.Variant>
                    <div>
                        <p>Selected: {selectedValue}</p>
                        <SegmentedControl
                            value={selectedValue}
                            onChange={(value) => setSelectedValue(value!)}
                        >
                            <Segment label="Day" value="Day" />
                            <Segment label="Week" value="Week" />
                            <Segment label="Month" value="Month" />
                        </SegmentedControl>
                    </div>
                </Showcase.Variant>
                <Showcase.Variant>
                    <div>
                        <p>Selected: {selectedValue}</p>
                        <SegmentedControl
                            value={selectedValue}
                            onChange={(value) => setSelectedValue(value!)}
                            segments={[
                                { label: 'Day', value: 'Day' },
                                { label: 'Week', value: 'Week' },
                                { label: 'Month', value: 'Month' },
                            ]}
                        />
                    </div>
                </Showcase.Variant>
            </Showcase.Item>
            <Showcase.Item>
                <input type="radio" name="testA" value={1} />
                <input type="radio" name="testA" value={1} checked={true} />
                <input type="radio" name="testA" value={1} checked={true} />
                <input type="radio" name="testA" value={1} checked={true} />
            </Showcase.Item>
            <Showcase.Item>
                <input type="radio" name="testB" />
                <input type="radio" name="testB" checked={true} />
                <input type="radio" name="testB" />
                <input type="radio" name="testB" />
            </Showcase.Item>
        </Showcase>
    );
};
