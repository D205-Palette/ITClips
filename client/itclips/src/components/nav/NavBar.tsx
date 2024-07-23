import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom"
import { navStore } from "../../stores/navStore";
import DarkModeToggle from "./DarkModeToggle";
import NotificationButton from "./NavNotificationButton";
import LoginModal from "./LoginModal";
import FindIdModal from "./FindIdModal";

import HomeButton from "../nav/NavHomeButton";
import LogoutButton from "../nav/NavLogoutButton";
import MessageButton from "../nav/NavMessageButton";

const NavBar = () => {
  // Zustand 상태 훅
  const isLoginModalOpen = navStore((state) => state.isLoginModalOpen);
  const isFindIdModalOpen = navStore((state) => state.isFindIdModalOpen);
  const openLoginModal = navStore((state) => state.openLoginModal);
  const login = navStore((state) => state.login);
  const isLoggedIn = navStore((state) => state.isLoggedIn);

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
              <Link to='/home'>MY</Link>
              <Link to='/feed'>피드</Link>
              <Link to='/serach'>검색</Link>              
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
      {isFindIdModalOpen && <FindIdModal />}
    </>
  );
};

export default NavBar;
