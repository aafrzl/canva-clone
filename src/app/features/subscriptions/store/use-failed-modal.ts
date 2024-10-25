import { create } from "zustand";

type FailedModalState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useFailedModal = create<FailedModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
