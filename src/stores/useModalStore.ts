import { create } from 'zustand';

interface ModalStore {
  content: React.ReactNode;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  content: null,
  openModal: (content: React.ReactNode) => set({ content }),
  closeModal: () => set({ content: null }),
}));
