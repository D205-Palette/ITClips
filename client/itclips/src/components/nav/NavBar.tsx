import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import { authStore } from "../../stores/authStore";
import DarkModeToggle from "./DarkModeToggle";
import NotificationButton from "./NavNotificationButton";

import HomeButton from "../nav/NavHomeButton";
import LogoutButton from "../nav/NavLogoutButton";
import MessageButton from "../nav/NavMessageButton";
import tabStore from "../../stores/categoriesStore";
import darkModeStore from "../../stores/darkModeStore";

const NavBar = () => {
  const { isLoggedIn, userInfo } = authStore();
  const messageRef = useRef<HTMLDivElement>(null);

  const isDark = darkModeStore((state) => state.isDark);
  const textColor = isDark ? "text-slate-300" : "text-slate-900";

  return (
    <>
      <nav className="fixed top-0 left-0 w-full flex justify-between items-center p-4 h-16 bg-base-100 z-50">
        {/* 좌측 네비게이션 링크들 */}
        <div className="flex items-center gap-4">
          <HomeButton />
          {/* 로그인 시에만 보임 */}
          {isLoggedIn && (
            <ul className="flex gap-4 list-none">
              <NavLink
                to={userInfo ? `/user/${userInfo.id}` : "/login"}
                className={({ isActive }) =>
                  isActive ? "text-sky-500 font-bold" : textColor + " font-bold"
                }
              >
                MY
              </NavLink>
              <NavLink
                to="feed"
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
    </>
  );
};

export default NavBar;
