import { useState } from 'react';
import {
    Showcase,
    ShowcaseItem,
    ShowcaseVariant,
} from '../components/Showcase';
import SegmentedControl, { Segment } from '../../react/src/SegmentedControl';

export const Overview = () => {
    const [selectedValue, setSelectedValue] = useState<string>('Week');

    return (
        <Showcase>
            <ShowcaseItem label="with Children (uncontrolled)">
                <ShowcaseVariant>
                    <SegmentedControl>
                        <Segment label="Day" />
                        <Segment label="Week" />
                        <Segment label="Month" />
                    </SegmentedControl>
                </ShowcaseVariant>
                <ShowcaseVariant>
                    <SegmentedControl
                        segments={[
                            { label: 'Day' },
                            { label: 'Week' },
                            { label: 'Month' },
                        ]}
                    />
                </ShowcaseVariant>
            </ShowcaseItem>
            <ShowcaseItem label="isSelected (uncontrolled, like native checked)">
                <ShowcaseVariant>
                    <SegmentedControl>
                        <Segment label="Day" />
                        <Segment label="Week" isSelected={true} />
                        <Segment label="Month" />
                    </SegmentedControl>
                </ShowcaseVariant>
                <ShowcaseVariant>
                    <SegmentedControl
                        segments={[
                            { label: 'Day' },
                            { label: 'Week', isSelected: true },
                            { label: 'Month' },
                        ]}
                    />
                </ShowcaseVariant>
            </ShowcaseItem>
            <ShowcaseItem label="isDisabled (uncontrolled, like native disabled)">
                <ShowcaseVariant>
                    <SegmentedControl>
                        <Segment label="Day" />
                        <Segment label="Week" isDisabled={true} />
                        <Segment label="Month" />
                    </SegmentedControl>
                </ShowcaseVariant>
                <ShowcaseVariant>
                    <SegmentedControl
                        segments={[
                            { label: 'Day' },
                            { label: 'Week', isDisabled: true },
                            { label: 'Month' },
                        ]}
                    />
                </ShowcaseVariant>
            </ShowcaseItem>
            <ShowcaseItem label="Controlled (with state)">
                <ShowcaseVariant>
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
                </ShowcaseVariant>
                <ShowcaseVariant>
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
                </ShowcaseVariant>
            </ShowcaseItem>
            <ShowcaseItem>
                <input type="radio" name="testA" value={1} />
                <input type="radio" name="testA" value={1} checked={true} />
                <input type="radio" name="testA" value={1} checked={true} />
                <input type="radio" name="testA" value={1} checked={true} />
            </ShowcaseItem>
            <ShowcaseItem>
                <input type="radio" name="testB" />
                <input type="radio" name="testB" checked={true} />
                <input type="radio" name="testB" />
                <input type="radio" name="testB" />
            </ShowcaseItem>
        </Showcase>
    );
};
