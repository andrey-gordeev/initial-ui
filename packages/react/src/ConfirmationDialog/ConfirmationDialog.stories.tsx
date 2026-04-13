import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { ConfirmationDialog } from './ConfirmationDialog';
import type { ConfirmationDialogState } from './types';
import Button from '../Button';

type Story = StoryObj<typeof meta>;

const meta = {
    title: 'Components/ConfirmationDialog',
    component: ConfirmationDialog,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        severity: {
            description: 'Visual severity level of the confirmation.',
            control: 'select',
            options: ['low', 'medium', 'high', 'critical'],
            table: {
                type: {
                    summary: "'low' | 'medium' | 'high' | 'critical'",
                },
            },
        },
        title: {
            description: 'Dialog title.',
            control: 'text',
            table: { type: { summary: 'string' } },
        },
        description: {
            description: 'Supporting description.',
            control: 'text',
            table: { type: { summary: 'string' } },
        },
        state: {
            description: 'Async state of the confirm action.',
            control: 'select',
            options: ['idle', 'pending', 'loading', 'error'],
            table: {
                type: {
                    summary: "'idle' | 'pending' | 'loading' | 'error'",
                },
            },
        },
        isOpen: {
            control: false,
            table: { type: { summary: 'boolean' } },
        },
        onOpenChange: {
            control: false,
            table: { type: { summary: '(open: boolean) => void' } },
        },
        confirm: {
            control: false,
            table: {
                type: {
                    summary:
                        '{ label: string; onAction: () => void | Promise<void> }',
                },
            },
        },
        dismiss: {
            control: false,
            table: {
                type: {
                    summary: '{ label?: string; onAction?: () => void }',
                },
            },
        },
    },
} satisfies Meta<typeof ConfirmationDialog>;

export const Low: Story = {
    storyName: 'severity: low (Archive)',
    render: () => {
        const [isOpen, setIsOpen] = useState(false);
        return (
            <>
                <Button
                    label="Archive item"
                    variant="secondary"
                    onClick={() => setIsOpen(true)}
                />
                <ConfirmationDialog
                    isOpen={isOpen}
                    onOpenChange={setIsOpen}
                    severity="low"
                    title="Archive this item?"
                    description="You can restore it later from the archive."
                    confirm={{
                        label: 'Archive',
                        onAction: () => {
                            console.log('archived');
                            setIsOpen(false);
                        },
                    }}
                />
            </>
        );
    },
};

export const Medium: Story = {
    storyName: 'severity: medium (Remove)',
    render: () => {
        const [isOpen, setIsOpen] = useState(false);
        return (
            <>
                <Button
                    label="Remove member"
                    variant="danger"
                    onClick={() => setIsOpen(true)}
                />
                <ConfirmationDialog
                    isOpen={isOpen}
                    onOpenChange={setIsOpen}
                    severity="medium"
                    title="Remove team member?"
                    description="They will lose access to all shared resources."
                    confirm={{
                        label: 'Remove',
                        onAction: () => {
                            console.log('removed');
                            setIsOpen(false);
                        },
                    }}
                />
            </>
        );
    },
};

export const High: Story = {
    storyName: 'severity: high (Delete project)',
    render: () => {
        const [isOpen, setIsOpen] = useState(false);
        return (
            <>
                <Button
                    label="Delete project"
                    variant="danger"
                    onClick={() => setIsOpen(true)}
                />
                <ConfirmationDialog
                    isOpen={isOpen}
                    onOpenChange={setIsOpen}
                    severity="high"
                    title="Delete this project?"
                    description="All data will be permanently removed. This action cannot be undone."
                    confirm={{
                        label: 'Delete',
                        onAction: () => {
                            console.log('deleted');
                            setIsOpen(false);
                        },
                    }}
                />
            </>
        );
    },
};

export const Critical: Story = {
    storyName: 'severity: critical (Delete account)',
    render: () => {
        const [isOpen, setIsOpen] = useState(false);
        return (
            <>
                <Button
                    label="Delete account"
                    variant="danger"
                    onClick={() => setIsOpen(true)}
                />
                <ConfirmationDialog
                    isOpen={isOpen}
                    onOpenChange={setIsOpen}
                    severity="critical"
                    title="Delete your account?"
                    description="This will permanently delete your account, all projects, and all associated data. This action is irreversible."
                    confirm={{
                        label: 'Delete my account',
                        onAction: () => {
                            console.log('account deleted');
                            setIsOpen(false);
                        },
                    }}
                />
            </>
        );
    },
};

export const Async: Story = {
    storyName: 'async confirm',
    render: () => {
        const [isOpen, setIsOpen] = useState(false);
        const [state, setState] = useState<ConfirmationDialogState>('idle');

        async function handleConfirm() {
            setState('loading');
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setState('idle');
            setIsOpen(false);
        }

        return (
            <>
                <Button
                    label="Delete with async"
                    variant="danger"
                    onClick={() => setIsOpen(true)}
                />
                <ConfirmationDialog
                    isOpen={isOpen}
                    onOpenChange={setIsOpen}
                    severity="high"
                    title="Delete item?"
                    description="This may take a moment."
                    state={state}
                    confirm={{
                        label: 'Delete',
                        onAction: handleConfirm,
                    }}
                />
            </>
        );
    },
};

export default meta;
