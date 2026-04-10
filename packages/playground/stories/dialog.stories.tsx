import { useId, useRef, useState } from 'react';
import Dialog, { type DialogRef } from '../../react/src/Dialog';
import ConfirmationDialog from '../../react/src/ConfirmationDialog';
import type { ConfirmationDialogState } from '../../react/src/ConfirmationDialog';
import Button from '../../react/src/Button';
import ButtonGroup from '../../react/src/ButtonGroup';

export const Overview = () => {
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
                        Here's where you might add a description to further
                        justify my existence.
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
                    <p id={descIdUncontrolled}>Some Lorem Ipsum if you will</p>
                    <Button
                        label="Close"
                        variant="secondary"
                        onClick={() => dialogRef.current?.close()}
                    />
                </div>
            </Dialog>
        </>
    );
};

export const ConfirmLow = () => {
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
};

ConfirmLow.storyName = 'Archive (Low severity)';

export const ConfirmMedium = () => {
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
};

export const ConfirmHigh = () => {
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
};

export const ConfirmCritical = () => {
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
};

export const ConfirmAsync = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [confirmState, setConfirmState] = useState<ConfirmationDialogState>('idle');

    async function handleConfirm() {
        setConfirmState('loading');
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setConfirmState('idle');
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
                state={confirmState}
                confirm={{
                    label: 'Delete',
                    onAction: handleConfirm,
                }}
            />
        </>
    );
};
