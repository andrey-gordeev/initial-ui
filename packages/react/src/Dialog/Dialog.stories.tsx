import { useId, useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Dialog } from './Dialog';
import type { DialogRef } from './types';
import Button from '../Button';
import ButtonGroup from '../ButtonGroup';

type Story = StoryObj<typeof meta>;

const meta = {
    title: 'Components/Dialog',
    component: Dialog,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        isOpen: {
            description: 'Controlled open state.',
            control: 'boolean',
            table: { type: { summary: 'boolean' } },
        },
        onOpenChange: {
            control: false,
            description: 'Called when the open state changes.',
            table: { type: { summary: '(open: boolean) => void' } },
        },
        shouldOutsideDismiss: {
            description: 'Dismiss dialog by clicking outside.',
            control: 'boolean',
            table: { type: { summary: 'boolean' } },
        },
        shouldEscapeDismiss: {
            description: 'Dismiss dialog by pressing Escape.',
            control: 'boolean',
            table: { type: { summary: 'boolean' } },
        },
        children: {
            control: false,
            table: { type: { summary: 'ReactNode' } },
        },
    },
} satisfies Meta<typeof Dialog>;

export const Controlled: Story = {
    storyName: 'controlled',
    render: () => {
        const [isOpen, setIsOpen] = useState(false);
        const nameId = useId();
        const descId = useId();

        return (
            <>
                <Button
                    label="Open Controlled"
                    variant="primary"
                    onClick={() => setIsOpen(true)}
                />
                <Dialog
                    isOpen={isOpen}
                    onOpenChange={setIsOpen}
                    onClose={() => console.log('onClose')}
                    aria-labelledby={nameId}
                    aria-describedby={descId}
                >
                    <div className="dialog-contents">
                        <h2 id={nameId}>
                            An Appropriate Title Might Go Here
                        </h2>
                        <p id={descId}>
                            Here's where you might add a description to
                            further justify my existence.
                        </p>
                        <Button
                            label="Close"
                            variant="secondary"
                            onClick={() => setIsOpen(false)}
                        />
                    </div>
                </Dialog>
            </>
        );
    },
};

export const Uncontrolled: Story = {
    storyName: 'uncontrolled (via ref)',
    render: () => {
        const dialogRef = useRef<DialogRef>(null);
        const nameId = useId();
        const descId = useId();

        return (
            <>
                <Button
                    label="Open Uncontrolled"
                    variant="secondary"
                    onClick={() => dialogRef.current?.showModal()}
                />
                <Dialog
                    ref={dialogRef}
                    onClose={() => console.log('onClose')}
                    aria-labelledby={nameId}
                    aria-describedby={descId}
                >
                    <div className="dialog-contents">
                        <h2 id={nameId}>
                            An uncontrolled version of our Modal Dialog
                        </h2>
                        <p id={descId}>Some Lorem Ipsum if you will</p>
                        <Button
                            label="Close"
                            variant="secondary"
                            onClick={() => dialogRef.current?.close()}
                        />
                    </div>
                </Dialog>
            </>
        );
    },
};

export const ControlledAndUncontrolled: Story = {
    storyName: 'both modes',
    render: () => {
        const [isOpen, setIsOpen] = useState(false);
        const dialogRef = useRef<DialogRef>(null);

        const nameIdControlled = useId();
        const descIdControlled = useId();
        const nameIdUncontrolled = useId();
        const descIdUncontrolled = useId();

        return (
            <>
                <ButtonGroup>
                    <Button
                        label="Open Controlled"
                        variant="primary"
                        onClick={() => setIsOpen(true)}
                    />
                    <Button
                        label="Open Uncontrolled"
                        variant="secondary"
                        onClick={() => dialogRef.current?.showModal()}
                    />
                </ButtonGroup>

                <Dialog
                    isOpen={isOpen}
                    onOpenChange={setIsOpen}
                    onClose={() => console.log('onClose')}
                    aria-labelledby={nameIdControlled}
                    aria-describedby={descIdControlled}
                >
                    <div className="dialog-contents">
                        <h2 id={nameIdControlled}>
                            An Appropriate Title Might Go Here
                        </h2>
                        <p id={descIdControlled}>
                            Here's where you might add a description to
                            further justify my existence.
                        </p>
                        <Button
                            label="Close"
                            variant="secondary"
                            onClick={() => setIsOpen(false)}
                        />
                    </div>
                </Dialog>

                <Dialog
                    ref={dialogRef}
                    onClose={() => console.log('onClose')}
                    aria-labelledby={nameIdUncontrolled}
                    aria-describedby={descIdUncontrolled}
                >
                    <div className="dialog-contents">
                        <h2 id={nameIdUncontrolled}>
                            An uncontrolled version of our Modal Dialog
                        </h2>
                        <p id={descIdUncontrolled}>
                            Some Lorem Ipsum if you will
                        </p>
                        <Button
                            label="Close"
                            variant="secondary"
                            onClick={() => dialogRef.current?.close()}
                        />
                    </div>
                </Dialog>
            </>
        );
    },
};

export default meta;
