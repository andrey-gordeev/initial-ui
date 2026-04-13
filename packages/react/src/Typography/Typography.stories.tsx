import type { Meta, StoryObj } from '@storybook/react-vite';

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
    Meta as MetaText,
    Overline,
    Title1,
    Title2,
    Title3,
} from './Typography';

type Story = StoryObj<typeof meta>;

const meta = {
    title: 'Components/Typography',
    component: Body,
    parameters: {
        layout: 'padded',
    },
} satisfies Meta<typeof Body>;

const SAMPLE = 'Lorem ipsum dolor sit amet, consectetur adipiscing.';

const ROW_STYLE = {
    display: 'grid',
    gridTemplateColumns: '120px 1fr',
    alignItems: 'baseline',
    gap: 16,
    paddingBlock: 8,
    borderBlockEnd: '1px dashed #e5e7eb',
} as const;

const LABEL_STYLE = {
    fontFamily: 'monospace',
    fontSize: 12,
    color: '#6b7280',
} as const;

const Row = ({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) => (
    <div style={ROW_STYLE}>
        <span style={LABEL_STYLE}>{label}</span>
        <div>{children}</div>
    </div>
);

export const AllVariants: Story = {
    storyName: 'all variants',
    render: () => (
        <div style={{ inlineSize: 720 }}>
            <Row label="Display 1">
                <Display1>{SAMPLE}</Display1>
            </Row>
            <Row label="Display 2">
                <Display2>{SAMPLE}</Display2>
            </Row>
            <Row label="Headline 1">
                <Headline1>{SAMPLE}</Headline1>
            </Row>
            <Row label="Headline 2">
                <Headline2>{SAMPLE}</Headline2>
            </Row>
            <Row label="Title 1">
                <Title1>{SAMPLE}</Title1>
            </Row>
            <Row label="Title 2">
                <Title2>{SAMPLE}</Title2>
            </Row>
            <Row label="Title 3">
                <Title3>{SAMPLE}</Title3>
            </Row>
            <Row label="Body">
                <Body>{SAMPLE}</Body>
            </Row>
            <Row label="Label 1">
                <Label1>{SAMPLE}</Label1>
            </Row>
            <Row label="Label 2">
                <Label2>{SAMPLE}</Label2>
            </Row>
            <Row label="Label 3">
                <Label3>{SAMPLE}</Label3>
            </Row>
            <Row label="Action">
                <Action>{SAMPLE}</Action>
            </Row>
            <Row label="Overline">
                <Overline>{SAMPLE}</Overline>
            </Row>
            <Row label="Meta">
                <MetaText>{SAMPLE}</MetaText>
            </Row>
            <Row label="Caption">
                <Caption>{SAMPLE}</Caption>
            </Row>
        </div>
    ),
};

export default meta;
