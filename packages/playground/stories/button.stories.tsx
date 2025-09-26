import {
    Showcase,
    ShowcaseItem,
    ShowcaseVariant,
} from '../components/Showcase';
import Button from '../../react/src/Button';

export const Overview = () => (
    <Showcase>
        <ShowcaseItem label="default">
            <Button />
        </ShowcaseItem>
        <ShowcaseItem label="variant">
            <ShowcaseVariant>
                <Button variant="primary" />
            </ShowcaseVariant>
            <ShowcaseVariant>
                <Button variant="primary-light" />
            </ShowcaseVariant>
            <ShowcaseVariant>
                <Button variant="secondary" />
            </ShowcaseVariant>
            <ShowcaseVariant>
                <Button variant="secondary-tertiary" />
            </ShowcaseVariant>
            <ShowcaseVariant>
                <Button variant="tertiary" />
            </ShowcaseVariant>
            <ShowcaseVariant>
                <Button variant="danger" />
            </ShowcaseVariant>
            <ShowcaseVariant>
                <Button variant="danger-secondary" />
            </ShowcaseVariant>
            <ShowcaseVariant>
                <Button variant="danger-tertiary" />
            </ShowcaseVariant>
            <ShowcaseVariant>
                <Button variant="link" />
            </ShowcaseVariant>
            <ShowcaseVariant>
                <Button variant="light" />
            </ShowcaseVariant>
        </ShowcaseItem>
        <ShowcaseItem label="variant & isDisabled">
            <ShowcaseVariant>
                <Button variant="primary" isDisabled={true} />
            </ShowcaseVariant>
            <ShowcaseVariant>
                <Button variant="secondary" isDisabled={true} />
            </ShowcaseVariant>
            <ShowcaseVariant>
                <Button variant="secondary-tertiary" isDisabled={true} />
            </ShowcaseVariant>
            <ShowcaseVariant>
                <Button variant="tertiary" isDisabled={true} />
            </ShowcaseVariant>
            <ShowcaseVariant>
                <Button variant="danger" isDisabled={true} />
            </ShowcaseVariant>
            <ShowcaseVariant>
                <Button variant="danger-secondary" isDisabled={true} />
            </ShowcaseVariant>
            <ShowcaseVariant>
                <Button variant="danger-tertiary" isDisabled={true} />
            </ShowcaseVariant>
            <ShowcaseVariant>
                <Button variant="link" isDisabled={true} />
            </ShowcaseVariant>
            <ShowcaseVariant>
                <Button variant="light" isDisabled={true} />
            </ShowcaseVariant>
        </ShowcaseItem>
    </Showcase>
);
