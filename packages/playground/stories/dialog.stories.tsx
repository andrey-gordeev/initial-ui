import React from 'react';
import {
    ModalProvider,
    useModalManager,
} from '../../react/src/ModalManagerContext';
import { ModalRoot } from '../../react/src/ModalRoot';
import { Drawer } from '../../react/src/Drawer';
import Button from '../../react/src/Button';

const DialogContent = () => {
    const { openModal, closeModal } = useModalManager();

    const openDialog = () => {
        const id = openModal(
            <ModalRoot onClose={() => closeModal(id)}>
                <h2>Hello!</h2>
                <p>This is a dialog.</p>
            </ModalRoot>,
        );
    };

    const openDrawer = () => {
        const id = openModal(
            <Drawer
                isOpen={true}
                onClose={() => closeModal(id)}
            >
                <h2>Settings</h2>
                <p>Drawer content</p>
            </Drawer>,
        );
    };

    return (
        <>
            <div>
                <Button onClick={openDialog} />
            </div>
            <div>
                <Button onClick={openDrawer} />
            </div>
        </>
    );
};

export const Overview = () => {
    return (
        <ModalProvider>
            <DialogContent />
        </ModalProvider>
    );
};
