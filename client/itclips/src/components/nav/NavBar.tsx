import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { navStore } from "../../stores/navStore";
import DarkModeToggle from "./DarkModeToggle";
import NotificationButton from "./NavNotificationButton";

import NavLoginModal from "./NavLoginModal";

import HomeButton from "../nav/NavHomeButton";
import LogoutButton from "../nav/NavLogoutButton";
import MessageButton from "../nav/NavMessageButton";

const NavBar = () => {
  const {
    login,
    modalState,
    isLoggedIn,
  } = navStore();
  
  const {
    isLoginModalOpen,
    openLoginModal,    
  } = modalState;


  const messageRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <nav className="flex justify-between items-center p-4 h-16">
        {/* 좌측 네비게이션 링크들 */}
        <div className="flex items-center gap-4">
          <HomeButton />
          {/* 로그인 시에만 보임 */}
          {isLoggedIn && (
            <ul className="flex gap-4 list-none">
              <Link to='/home'>MY</Link>
              <Link to='/feed'>피드</Link>
              <Link to='/search'>검색</Link>
            </ul>
          )}
        </div>

        {/* 우측 네비게이션 링크들 */}
        <div className="flex items-center gap-4">
          <DarkModeToggle />

          {/* 로그인 전 */}
          {!isLoggedIn ? (
            <>
              <button
                onClick={openLoginModal}
                className="transition-colors duration-300 hover:text-gray-400"
              >
                로그인
              </button>

              <a
                href="/signup"
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
            // 로그인 후
            <>
              <MessageButton />
              <NotificationButton />
              <LogoutButton />
            </>
          )}
        </div>
      </nav>

      {/* 로그인, 아이디찾기, 비밀번호찾기 모달창 */}
      {isLoginModalOpen && <NavLoginModal />}
    </>
  );
};

export default NavBar;
