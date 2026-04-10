import { useId, useRef, useState } from 'react';
import Dialog, { type DialogRef } from '../../react/src/Dialog';
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

export const ConfirmationDialog = () => {
    const [isOpen, setIsOpen] = useState(false);
    const titleId = useId();
    const descId = useId();

    function onDelete() {
        console.log('deleted!');
        setIsOpen(false);
    }

    return (
        <>
            <Button
                label="Delete"
                variant="danger"
                onClick={() => setIsOpen(true)}
            />

            <Dialog
                isOpen={isOpen}
                onOpenChange={setIsOpen}
                aria-labelledby={titleId}
                aria-describedby={descId}
            >
                <div className="dialog-contents">
                    <h2 id={titleId}>Confirm deletion</h2>
                    <p id={descId}>
                        Are you sure? This action cannot be undone.
                    </p>
                    <ButtonGroup>
                        <Button
                            label="Cancel"
                            variant="secondary"
                            onClick={() => setIsOpen(false)}
                        />
                        <Button
                            label="Delete"
                            variant="danger"
                            onClick={onDelete}
                        />
                    </ButtonGroup>
                </div>
            </Dialog>
        </>
    );
};
