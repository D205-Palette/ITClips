import create from 'zustand';

interface StoreState {
  isLoginModalOpen: boolean;
  isLoggedIn: boolean;  // 추가된 필드
  openLoginModal: () => void;
  closeLoginModal: () => void;
  login: () => void;          // 추가된 함수
  logout: () => void;         // 추가된 함수
}

export const useStore = create<StoreState>(set => ({
  isLoginModalOpen: false,
  isLoggedIn: false,   // 초기 상태는 false
  openLoginModal: () => set({ isLoginModalOpen: true }),
  closeLoginModal: () => set({ isLoginModalOpen: false }),
  login: () => set({ isLoggedIn: true }),  // 로그인 함수
  logout: () => set({ isLoggedIn: false }), // 로그아웃 함수
}));
