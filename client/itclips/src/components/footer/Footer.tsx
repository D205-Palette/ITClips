import React from "react";
import { useNavigate } from "react-router-dom";
import { authStore } from "../../stores/authStore";

const Footer = () => {
  const { isLoggedIn, userId } = authStore();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => () => {
    navigate(path);
  };

  return (
    <div className="bg-base-100 w-full py-3 px-6 md:px-20 text-left ">
      <div className="flex flex-col items-center justify-center gap-1">
        {/* 프로젝트명*/}
        <h1 className="font-extrabold text-sm md:text-sm alfa-slab-one-regular">
          <span className="text-sky-500 ">IT</span>Clips
        </h1>
        {/* 카피라이트 */}
        <p className="text-xs md:text-xs">
          ⓒ ITClips Corp. All rights reserved.
        </p>
        {/* 서비스 링크*/}
        <div className="flex gap-x-8 md:gap-x-16 items-start">
          <div className="hidden md:flex gap-x-4">
            <div className="flex gap-x-3 items-center">
              {!isLoggedIn ? (
                <>
                  <button
                    className="text-left text-xs hover:underline"
                    onClick={handleNavigation("/login")}
                  >
                    로그인
                  </button>
                  <button
                    className="text-left text-xs hover:underline"
                    onClick={handleNavigation("/signup")}
                  >
                    회원가입
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="text-left text-xs hover:underline"
                    onClick={handleNavigation(`/user/${userId}`)}
                  >
                    MY
                  </button>
                  <button
                    className="text-left text-xs hover:underline"
                    onClick={handleNavigation("/feed/bookmarklists")}
                  >
                    피드
                  </button>
                  <button
                    className="text-left text-xs hover:underline"
                    onClick={handleNavigation("/search")}
                  >
                    검색
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
