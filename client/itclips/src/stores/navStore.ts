import create from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ModalState {
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;

  isFindIdModalOpen: boolean;
  openFindIdModal: () => void;
  closeFindIdModal: () => void;

  isFindPasswordModalOpen: boolean;
  openFindPasswordModal: () => void;
  closeFindPasswordModal: () => void;

  isFindIdCompleteModalOpen: boolean;
  openFindIdCompleteModal: () => void;
  closeFindIdCompleteModal: () => void;

  isFindPasswordCompleteModalOpen: boolean;
  openFindPasswordCompleteModal: () => void;
  closeFindPasswordCompleteModal: () => void;
}

interface StoreState {
  login: () => void;
  logout: () => void;
  isLoggedIn: boolean;
  modalState: ModalState;
}

export const navStore = create<StoreState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      login: () => set({ isLoggedIn: true }),
      logout: () => set({ isLoggedIn: false }),

      modalState: {
        isLoginModalOpen: false,
        openLoginModal: () => set((state) => ({ modalState: { ...state.modalState, isLoginModalOpen: true } })),
        closeLoginModal: () => set((state) => ({ modalState: { ...state.modalState, isLoginModalOpen: false } })),

        isFindIdModalOpen: false,
        openFindIdModal: () => set((state) => ({ modalState: { ...state.modalState, isFindIdModalOpen: true } })),
        closeFindIdModal: () => set((state) => ({ modalState: { ...state.modalState, isFindIdModalOpen: false } })),

        isFindPasswordModalOpen: false,
        openFindPasswordModal: () => set((state) => ({ modalState: { ...state.modalState, isFindPasswordModalOpen: true } })),
        closeFindPasswordModal: () => set((state) => ({ modalState: { ...state.modalState, isFindPasswordModalOpen: false } })),

        isFindIdCompleteModalOpen: false,
        openFindIdCompleteModal: () => set((state) => ({ modalState: { ...state.modalState, isFindIdCompleteModalOpen: true } })),
        closeFindIdCompleteModal: () => set((state) => ({ modalState: { ...state.modalState, isFindIdCompleteModalOpen: false } })),

        isFindPasswordCompleteModalOpen: false,
        openFindPasswordCompleteModal: () => set((state) => ({ modalState: { ...state.modalState, isFindPasswordCompleteModalOpen: true } })),
        closeFindPasswordCompleteModal: () => set((state) => ({ modalState: { ...state.modalState, isFindPasswordCompleteModalOpen: false } })),
      },
    }),
    {
      name: "nav-store", // 로컬 스토리지에 저장할 키 이름
      storage: createJSONStorage(() => localStorage), // 로컬 스토리지 사용
      partialize: (state) => ({ isLoggedIn: state.isLoggedIn }), // isLoggedIn만 저장
    }
  )
);
