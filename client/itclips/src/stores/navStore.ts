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
  login: () => void; // 추가된 함수
  logout: () => void; // 추가된 함수
  isLoggedIn: boolean; // 추가된 필드

  modalState: ModalState;

  };


export const navStore = create<StoreState>((set) => ({
  isLoggedIn: false,
  login: () => set({ isLoggedIn: true }), // 로그인 함수
  logout: () => set({ isLoggedIn: false }), // 로그아웃 함수

  // 모달 상태 관리
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
}));
