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

import { FaHome } from "react-icons/fa";
import { MdOutlineFeed } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

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
      <nav ref={navbarRef} className="fixed top-0 left-0 w-full flex justify-between items-center p-4 h-16 bg-base-100 z-40">
        {/* 좌측 네비게이션 링크들 */}
        <div className="flex items-center gap-4">
          <HomeButton />
          {/* 로그인 시에만 보임 */}
          {isLoggedIn && (
            <ul className="gap-4 list-none hidden md:flex">
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
        <div className="flex items-center gap-4">
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

          {/* 모바일창 nav */}
      {isLoggedIn && (
            <ul className="px-10 py-4 gap-4 list-none flex justify-between md:hidden fixed bottom-0 left-0 w-full z-50 bg-base-100 border h-20">
              <NavLink
                to={userId ? `/user/${userId}` : "/login"}
                className={({ isActive }) =>
                  isActive ? "text-sky-500 font-bold" : textColor + " font-bold"
                }
              >
                <FaHome size={24}/>
                MY
              </NavLink>
              <NavLink
                to="feed/bookmarklists"
                className={({ isActive }) =>
                  isActive ? "text-sky-500 font-bold" : textColor + " font-bold"
                }
              >
                <MdOutlineFeed size={24}/>
                피드
              </NavLink>
              <NavLink
                to="search"
                className={({ isActive }) =>
                  isActive ? "text-sky-500 font-bold" : textColor + " font-bold"
                }
              >
                <FaSearch size={24}/>
                검색
              </NavLink>
            </ul>
          )}



      {/* 메세지창 */}
      {isMessageOpen && (
        <div className="fixed top-[var(--navbar-height)] right-0 z-50">
          <MessageLayout />
        </div>
      )}
    </div>
  );
};

export default NavBar;
