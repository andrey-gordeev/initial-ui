import type { Meta, StoryObj } from '@storybook/react-vite';
import StoryBox from '../../../../.storybook/StoryBox';

import { Stack } from './Stack';

type Story = StoryObj<typeof meta>;

const meta = {
    title: 'Primitives/Stack',
    component: Stack,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        children: {
            control: false,
        },
        direction: {
            control: 'select',
            options: ['horizontal', 'vertical'],
        },
    },
} satisfies Meta<typeof Stack>;

export const Default: Story = {
    args: {
        children: [
            <StoryBox key={0.0} inlineSize={150} />,
            <StoryBox key={0.1} inlineSize={150} />,
        ],
        direction: 'horizontal',
    },
};

export const Vertical: Story = {
    storyName: 'direction: "vertical"',
    args: {
        children: [
            <StoryBox key={1.0} inlineSize={250} />,
            <StoryBox key={1.1} inlineSize={250} />,
            <StoryBox key={1.2} inlineSize={250} />,
        ],
        direction: 'vertical',
    },
};

export default meta;
