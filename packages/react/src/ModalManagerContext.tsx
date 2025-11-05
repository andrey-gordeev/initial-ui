// ModalManagerContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';
import { createPortal } from 'react-dom';

type ModalItem = {
    id: string;
    element: ReactNode;
};

const ModalManagerContext = createContext<{
    modals: ModalItem[];
    openModal: (element: ReactNode) => string;
    closeModal: (id: string) => void;
}>({
    modals: [],
    openModal: () => '',
    closeModal: () => {},
});

export function ModalProvider({ children }: { children: ReactNode }) {
    const [modals, setModals] = useState<ModalItem[]>([]);

    const openModal = (element: ReactNode) => {
        const id = Math.random().toString(36).slice(2);
        setModals((prev) => [...prev, { id, element }]);
        document.body.style.overflow = 'hidden'; // scroll lock
        return id;
    };

    const closeModal = (id: string) => {
        setModals((prev) => {
            const next = prev.filter((m) => m.id !== id);
            if (next.length === 0) document.body.style.overflow = '';
            return next;
        });
    };

    return (
        <ModalManagerContext.Provider value={{ modals, openModal, closeModal }}>
            {children}

            {/* Рендер всех модалов в портале */}
            {createPortal(
                modals.map(({ id, element }) => (
                    <div key={id} data-modal-id={id}>
                        {element}
                    </div>
                )),
                document.body,
            )}
        </ModalManagerContext.Provider>
    );
}

export const useModalManager = () => useContext(ModalManagerContext);
