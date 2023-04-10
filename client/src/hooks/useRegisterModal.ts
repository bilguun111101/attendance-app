import { create } from 'zustand';

interface registerModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useRegisterModal = create<registerModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))