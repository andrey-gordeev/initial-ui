import type { Meta, StoryObj } from '@storybook/react-vite';

import Button from '../Button';
import { ButtonGroup } from './ButtonGroup';

type Story = StoryObj<typeof meta>;

const meta = {
    title: 'Components/ButtonGroup',
    component: ButtonGroup,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        children: {
            control: false,
        },
    },
} satisfies Meta<typeof ButtonGroup>;

export const Default: Story = {
    args: {
        children: [
            <Button key="primary" label="Button" variant="primary" />,
            <Button key="secondary" label="Button" variant="secondary" />,
        ],
    },
};

export default meta;
