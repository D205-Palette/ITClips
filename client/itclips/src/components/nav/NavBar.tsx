import React, { useRef, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { authStore } from "../../stores/authStore";
import DarkModeToggle from "./DarkModeToggle";
import NotificationButton from "./NavNotificationButton";
import MessageLayout from "../aside/MessageLayout";

import HomeButton from "../nav/NavHomeButton";
import LogoutButton from "../nav/NavLogoutButton";
import MessageButton from "../nav/NavMessageButton";
// import tabStore from "../../stores/categoriesStore";
import darkModeStore from "../../stores/darkModeStore";
import { asideStore } from "../../stores/asideStore";

const NavBar = () => {
  const { isLoggedIn, userId } = authStore();

  const isDark = darkModeStore((state) => state.isDark);
  const textColor = isDark ? "text-slate-300" : "text-slate-900";
  const isMessageOpen = asideStore((state) => state.isMessageOpen);
  const navbarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Navbar의 높이를 계산하여 MessageLayout의 위치를 설정
    if (navbarRef.current) {
      const navbarHeight = navbarRef.current.offsetHeight;
      document.documentElement.style.setProperty('--navbar-height', `${navbarHeight}px`);
    }
  }, []);

  return (
    <div>
      <nav ref={navbarRef} className="fixed top-0 left-0 w-full flex justify-between items-center py-4 px-12 h-16 bg-base-100 z-40">
        {/* 좌측 네비게이션 링크들 */}
        <div className="flex items-center gap-4 ">
          <HomeButton />
          {/* 로그인 시에만 보임 */}
          {isLoggedIn && (
            <ul className="flex gap-6 list-none">
              <NavLink
                to={userId ? `/user/${userId}` : "/login"}
                className={({ isActive }) =>
                  isActive ? "text-sky-500 font-bold" : textColor + " font-bold"
                }
              >
                MY
              </NavLink>
              <NavLink
                to="feed/bookmarklists"
                className={({ isActive }) =>
                  isActive ? "text-sky-500 font-bold" : textColor + " font-bold"
                }
              >
                피드
              </NavLink>
              <NavLink
                to="search"
                className={({ isActive }) =>
                  isActive ? "text-sky-500 font-bold" : textColor + " font-bold"
                }
              >
                검색
              </NavLink>
            </ul>
          )}
        </div>

        {/* 우측 네비게이션 링크들 */}
        <div className="flex items-center gap-4 ">
          <DarkModeToggle />

          {/* 로그인 전 */}
          {!isLoggedIn ? (
            <>
              <NavLink
                to="login"
                className={({ isActive }) =>
                  isActive ? "text-sky-500 font-bold" : textColor + " font-bold"
                }
              >
                로그인
              </NavLink>

              <NavLink
                to="signup"
                className={({ isActive }) =>
                  isActive ? "text-sky-500 font-bold" : textColor + " font-bold"
                }
              >
                회원가입
              </NavLink>
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
      {/* 메세지창 */}
      {isMessageOpen && (
        <div className="fixed top-[var(--navbar-height)] right-20 z-50">
          <MessageLayout />
        </div>
      )}
    </div>
  );
};

export default NavBar;
