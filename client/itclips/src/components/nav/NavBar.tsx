import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom"
import { navStore } from "../../stores/navStore";
import DarkModeToggle from "./DarkModeToggle";
import NotificationButton from "./NavNotificationButton";

import NavLoginModal from "./NavLoginModal";
import FindIdModal from './FindIdModal'
import FindPasswordModal from './FindPasswordModal'



import HomeButton from "../nav/NavHomeButton";
import LogoutButton from "../nav/NavLogoutButton";
import MessageButton from "../nav/NavMessageButton";

const NavBar = () => {
  // Zustand 상태 훅
  const isLoginModalOpen = navStore((state) => state.isLoginModalOpen);
  const isFindIdModalOpen = navStore((state) => state.isFindIdModalOpen);
  const isFindPasswordModalOpen = navStore((state) => state.isFindPasswordModalOpen);

  const openLoginModal = navStore((state) => state.openLoginModal);
  const login = navStore((state) => state.login);
  const isLoggedIn = navStore((state) => state.isLoggedIn);

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
              <Link to='/serach'>검색</Link>              
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
      {isFindIdModalOpen && <FindIdModal />}
      {isFindPasswordModalOpen && <FindPasswordModal />}
      

    </>
  );
};

export default NavBar;
