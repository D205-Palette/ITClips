import React, { useState, useEffect, useRef } from "react";
import { useStore } from "../stores/authStore";
import DarkModeToggle from "./DarkModeToggle";
import NotificationButton from "./NavNotificationButton";
import LoginModal from "./LoginModal";
import HomeButton from "./NavHomeButton";
import LogoutButton from "./NavLogoutButton";
import MessageButton from "./NavMessageButton";
import NavGotoButton from "./NavGotoButton";


const NavBar = () => {
  // Zustand 상태 훅
  const isLoginModalOpen = useStore((state) => state.isLoginModalOpen);
  const openLoginModal = useStore((state) => state.openLoginModal);
  const login = useStore((state) => state.login);
  const isLoggedIn = useStore((state) => state.isLoggedIn);

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);

  const toggleNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  // 클릭 외부 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="flex justify-between items-center p-4 h-16">
        {/* 좌측 네비게이션 링크들 */}
        <div className="flex items-center gap-4">
          <HomeButton />
          {isLoggedIn && (
            <ul className="flex gap-4 list-none">
              <NavGotoButton path="home" name="MY" />
              <NavGotoButton path="feed" name="피드" />
              <NavGotoButton path="search" name="검색" />
            </ul>
          )}
        </div>

        {/* 우측 네비게이션 링크들 */}
        <div className="flex items-center gap-4">
          <DarkModeToggle />

          {!isLoggedIn ? (
            <>
              <button
                onClick={openLoginModal}
                className="transition-colors duration-300 hover:text-gray-400"
              >
                로그인
              </button>
              <a
                href="/SignUpView"
                className="transition-colors duration-300 hover:text-gray-400"
              >
                회원가입
              </a>
              <button
                onClick={login}
                className="transition-colors duration-300 hover:text-gray-400"
              >
                임시 로그인 버튼
              </button>
            </>
          ) : (
            <>
              <MessageButton />
              <NotificationButton />
              <LogoutButton />
            </>
          )}
        </div>
      </nav>
      {isLoginModalOpen && <LoginModal />}
    </>
  );
};

export default NavBar;
