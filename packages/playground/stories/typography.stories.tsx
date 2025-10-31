import Showcase from '../components/Showcase';
import {
    Action,
    Body,
    Caption,
    Display1,
    Display2,
    Headline1,
    Headline2,
    Label1,
    Label2,
    Label3,
    Meta,
    Overline,
    Title1,
    Title2,
    Title3,
} from '../../react/src/Typography';

export const Overview = () => {
    const sample = 'Lorem ipsum dolor sit amet, consectetur adipiscing.';

    return (
        <Showcase label="Typography">
            <Showcase.Item label="Display 1">
                <Display1>{sample}</Display1>
            </Showcase.Item>
            <Showcase.Item label="Display 2">
                <Display2>{sample}</Display2>
            </Showcase.Item>
            <Showcase.Item label="Headline 1">
                <Headline1>{sample}</Headline1>
            </Showcase.Item>
            <Showcase.Item label="Headline 2">
                <Headline2>{sample}</Headline2>
            </Showcase.Item>
            <Showcase.Item label="Title 1">
                <Title1>{sample}</Title1>
            </Showcase.Item>
            <Showcase.Item label="Title 2">
                <Title2>{sample}</Title2>
            </Showcase.Item>
            <Showcase.Item label="Title 3">
                <Title3>{sample}</Title3>
            </Showcase.Item>
            <Showcase.Item label="Body">
                <Body>{sample}</Body>
            </Showcase.Item>
            <Showcase.Item label="Label 1">
                <Label1>{sample}</Label1>
            </Showcase.Item>
            <Showcase.Item label="Label 2">
                <Label2>{sample}</Label2>
            </Showcase.Item>
            <Showcase.Item label="Label 3">
                <Label3>{sample}</Label3>
            </Showcase.Item>
            <Showcase.Item label="Action">
                <Action>{sample}</Action>
            </Showcase.Item>
            <Showcase.Item label="Overline">
                <Overline>{sample}</Overline>
            </Showcase.Item>
            <Showcase.Item label="Meta">
                <Meta>{sample}</Meta>
            </Showcase.Item>
            <Showcase.Item label="Caption">
                <Caption>{sample}</Caption>
            </Showcase.Item>
        </Showcase>
    );
};
