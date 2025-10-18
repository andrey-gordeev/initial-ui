import { Showcase, ShowcaseItem } from '../components/Showcase';
import {
    Action,
    Body,
    Caption,
    Display1,
    Display2,
    Headline1,
    Headline2,
    Label,
    Meta,
    Overline,
    Title1,
    Title2,
    Title3,
} from '../../react/src/Typography';

export const Overview = () => {
    const sample = 'Lorem ipsum dolor sit amet, consectetur adipiscing.';

    return (
        <Showcase>
            <ShowcaseItem label="Display 1">
                <Display1>{sample}</Display1>
            </ShowcaseItem>
            <ShowcaseItem label="Display 2">
                <Display2>{sample}</Display2>
            </ShowcaseItem>
            <ShowcaseItem label="Headline 1">
                <Headline1>{sample}</Headline1>
            </ShowcaseItem>
            <ShowcaseItem label="Headline 2">
                <Headline2>{sample}</Headline2>
            </ShowcaseItem>
            <ShowcaseItem label="Title 1">
                <Title1>{sample}</Title1>
            </ShowcaseItem>
            <ShowcaseItem label="Title 2">
                <Title2>{sample}</Title2>
            </ShowcaseItem>
            <ShowcaseItem label="Title 3">
                <Title3>{sample}</Title3>
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
