import React from "react";
import { API_BASE_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import { authStore } from "../../stores/authStore";
const Footer = () => {
  const { isLoggedIn, userId } = authStore();
  const navigate = useNavigate();
  const handleNavigation = (path: string) => () => {
    navigate(path);
  };
  return (
    <div className="bg-black w-full text-white py-3 px-20 text-left">
      <div className="flex justify-between">
        <div className="flex flex-col justify-between">
          <h1 className="font-extrabold text-2xl">
            <span className="text-sky-500">IT</span> Clips
          </h1>
          <p>ⓒ ITCLips Corp. All rights reserved.</p>
        </div>

        <div className="flex gap-x-16 items-start">
          <div className="flex gap-x-4">
            <h3 className="font-bold text-xl">서비스</h3>
            <div className="flex gap-x-3 items-center">
              {!isLoggedIn ? (
                <>
                  <button
                    className="text-left hover:underline"
                    onClick={handleNavigation("/")}
                  >
                    홈
                  </button>
                  <button
                    className="text-left hover:underline"
                    onClick={handleNavigation("/login")}
                  >
                    로그인
                  </button>
                  <button
                    className="text-left hover:underline"
                    onClick={handleNavigation("/signup")}
                  >
                    회원가입
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="text-left hover:underline"
                    onClick={handleNavigation(`/user/${userId}`)}
                  >
                    MY
                  </button>
                  <button
                    className="text-left hover:underline"
                    onClick={handleNavigation("/feed/bookmarklists")}
                  >
                    피드
                  </button>
                  <button
                    className="text-left hover:underline"
                    onClick={handleNavigation("/search")}
                  >
                    검색
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="flex gap-x-5">
            <h3 className="font-bold mb-2 text-xl">팀 팔레트</h3>
            <div className="flex flex-col">
              <div className="flex gap-x-3">
                <div className="flex flex-col ">
                  <p className="font-bold">Backend</p>
                  <p className="font-bold">Frontend</p>
                </div>
                <div className="flex flex-col">
                  <p>정진규 팀장</p>
                  <p>김동준 팀원</p>
                </div>
                <div className="flex flex-col">
                  <p>김민솔 팀원</p>
                  <p>김세진 팀원</p>
                </div>
                <div className="flex flex-col">
                  <p>김수정 팀원</p>
                  <p>최형우 팀원</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
