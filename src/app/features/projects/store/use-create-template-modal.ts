import { create } from "zustand";

type CreateTemplateModalState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useCreateTemplateModal = create<CreateTemplateModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
