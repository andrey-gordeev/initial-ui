import { Showcase, ShowcaseItem } from '../components/Showcase';
import {
    Action,
    Body,
    Caption,
    Display,
    Headline,
    Label,
    Meta,
    Overline,
    Title,
} from '../../react/src/Typography';

export const Overview = () => {
    const sample = 'Lorem ipsum dolor sit amet, consectetur adipiscing.';

    return (
        <Showcase>
            <ShowcaseItem label="Heading">
                <ShowcaseItem label="Display">
                    <Display>{sample}</Display>
                </ShowcaseItem>
                <ShowcaseItem label="Headline">
                    <Headline>{sample}</Headline>
                </ShowcaseItem>
                <ShowcaseItem label="Title">
                    <Title>{sample}</Title>
                </ShowcaseItem>
            </ShowcaseItem>
            <ShowcaseItem label="Body">
                <Body>{sample}</Body>
            </ShowcaseItem>
            <ShowcaseItem label="Label">
                <Label>{sample}</Label>
            </ShowcaseItem>
            <ShowcaseItem label="Action">
                <Action>{sample}</Action>
            </ShowcaseItem>
            <ShowcaseItem label="Overline">
                <Overline>{sample}</Overline>
            </ShowcaseItem>
            <ShowcaseItem label="Meta">
                <Meta>{sample}</Meta>
            </ShowcaseItem>
            <ShowcaseItem label="Caption">
                <Caption>{sample}</Caption>
            </ShowcaseItem>
        </Showcase>
    );
};
