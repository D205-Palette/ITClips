import React, { useRef, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { authStore } from "../../stores/authStore";
import DarkModeToggle from "./DarkModeToggle";
import NotificationButton from "./NavNotificationButton";
import MessageLayout from "../aside/MessageLayout";
import HomeButton from "../nav/NavHomeButton";
import LogoutButton from "../nav/NavLogoutButton";
import MessageButton from "../nav/NavMessageButton";
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
  const [borderColor, setBorderColor] = useState("border-gray-300"); // 기본 보더 색상

  useEffect(() => {
    // localStorage에서 theme 값을 가져와서 border 색상을 설정
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setBorderColor("border-gray-900"); // 다크 모드일 때 보더 색상
    } else {
      setBorderColor("border-gray-300"); // 라이트 모드일 때 보더 색상
    }

    // Navbar의 높이를 계산하여 MessageLayout의 위치를 설정
    if (navbarRef.current) {
      const navbarHeight = navbarRef.current.offsetHeight;
      document.documentElement.style.setProperty(
        "--navbar-height",
        `${navbarHeight}px`
      );
    }
  }, [isDark]);

  return (
    <div>
      <nav
        ref={navbarRef}
        className="fixed top-0 left-0 w-full flex justify-between items-center py-4 px-6 md:px-12 h-16 bg-base-100 z-40"
      >
        {/* 좌측 네비게이션 링크들 */}
        <div className="flex items-center gap-4 ">
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
        <div className="flex items-center gap-4 ">
          <DarkModeToggle />

          {/* 로그인 전 */}
          {!isLoggedIn ? (
            <>
              <NavLink
                to="login"
                className={({ isActive }) =>
                  isActive ? "text-sky-500 font-bold " : textColor + " text-sm md:text-md font-bold"
                }
              >
                로그인
              </NavLink>

              <NavLink
                to="signup"
                className={({ isActive }) =>
                  isActive ? "text-sky-500 font-bold " : textColor + " text-sm md:text-md font-bold"
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
        <ul
          className={`px-10 list-none flex items-center justify-between md:hidden fixed bottom-0 left-0 w-full z-50 bg-base-100 h-16 border ${borderColor}`}
        >
          <NavLink
            to={userId ? `/user/${userId}` : "/login"}
            className={({ isActive }) =>
              isActive ? "text-sky-500 font-bold" : textColor + " font-bold"
            }
          >
            <FaHome size={24} />
            <p className="mt-1 text-xs text-center">MY</p>
          </NavLink>
          <NavLink
            to="feed/bookmarklists"
            className={({ isActive }) =>
              isActive ? "text-sky-500 font-bold" : textColor + " font-bold"
            }
          >
            <MdOutlineFeed size={24} />
            <p className="mt-1 text-xs text-center">피드</p>
          </NavLink>
          <NavLink
            to="search"
            className={({ isActive }) =>
              isActive ? "text-sky-500 font-bold" : textColor + " font-bold"
            }
          >
            <FaSearch size={24} />
            <p className="mt-1 text-xs text-center">검색</p>
          </NavLink>
        </ul>
      )}

      {/* 메세지창 */}
      {isMessageOpen && (
        <div className="fixed inset-0 z-40 top-[var(--navbar-height)] md:right-20 md:left-auto md:bottom-auto">
          <MessageLayout />
        </div>
      )}
    </div>
  );
};

export default NavBar;
