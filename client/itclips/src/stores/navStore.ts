import create from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'

interface StoreState {
  login: () => void;          // 추가된 함수
  logout: () => void;         // 추가된 함수
  isLoggedIn: boolean;  // 추가된 필드

  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;

  isFindIdModalOpen: boolean;
  openFindIdModal: () => void;
  closeFindIdModal: () => void;
  
  isFindPasswordModalOpen: boolean;
  openFindPasswordModal: () => void;
  closeFindPasswordModal: () => void;
  
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  
}


export const navStore = create<StoreState>((set) => ({
  isLoggedIn: false,
  login: () => set({ isLoggedIn: true }),  // 로그인 함수
  logout: () => set({ isLoggedIn: false }), // 로그아웃 함수

  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),

  // 로그인 모달 상태 관리
  isLoginModalOpen: false,
  openLoginModal: () => set({ isLoginModalOpen: true }),
  closeLoginModal: () => set({ isLoginModalOpen: false }),

  // 아이디 찾기 모달 상태 관리
  isFindIdModalOpen: false,
  openFindIdModal: () => set({ isFindIdModalOpen: true }),
  closeFindIdModal: () => set({ isFindIdModalOpen: false }),

  // 비밀번호 찾기 모달 상태 관리
  isFindPasswordModalOpen: false,
  openFindPasswordModal: () => set({ isFindPasswordModalOpen: true }),
  closeFindPasswordModal: () => set({ isFindPasswordModalOpen: false }),
}));
