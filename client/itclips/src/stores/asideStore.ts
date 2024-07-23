import create from "zustand";

interface Store {
  isMessageOpen: boolean;
  toggleMessage: () => void;
}

export const asideStore = create<Store>(set => ({
  isMessageOpen: false,
  toggleMessage: () => set((state) => ({ isMessageOpen: !state.isMessageOpen })),
}));