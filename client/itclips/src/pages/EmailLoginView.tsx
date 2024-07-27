import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { navStore } from "../stores/navStore";
import axios from "axios";

// import FindIdModal from "./FindIdModal";
// import FindPasswordModal from "./FindPasswordModal";

const LoginModal = () => {
  const navigate = useNavigate();

  const { modalState } = navStore();

  const {
    isFindIdModalOpen,
    isFindPasswordModalOpen,
    openFindIdModal,
    openFindPasswordModal,
    closeLoginModal,
  } = modalState;

  // 로그인 에러 메세지
  const [errorMessage, setErrorMessage] = useState("");

  // 모달 밖 클릭 시 모달 종료 로직
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeLoginModal();
    }
  };

  const handleSignUpClick = () => {
    navigate("/signup");
    closeLoginModal();
  };

  // 로그인 제출 시 로직
  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    // api 로그인 요청
    axios
      .post("loginApiUrl위치", {
        username,
        password,
      })
      .then((response) => {
        if (response.status === 200) {
          setErrorMessage(""); // 에러 메시지 초기화
          closeLoginModal();
        } else {
          setErrorMessage(
            "아이디 또는 비밀번호가 잘못 되었습니다. 아이디와 비밀번호를 정확히 입력해 주세요."
          );
        }
      })
      .catch((error) => {
        // 로그인 실패 시 에러 메시지 설정
        setErrorMessage(
          "아이디 또는 비밀번호가 잘못 되었습니다. 아이디와 비밀번호를 정확히 입력해 주세요."
        );
      });
  };

  
  
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-base-100 p-8 rounded-lg shadow-lg relative w-[801px] h-[654px]">
        <h2 className="text-3xl font-semibold mb-6 text-center">로그인</h2>

        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div className="form-control">
            <label id="username" htmlFor="username" className="label">
              <span className="label-text">아이디</span>
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              className="input input-bordered"
              placeholder="아이디를 입력해주세요."
            />
          </div>
          <div className="form-control">
            <label htmlFor="password" className="label">
              <span className="label-text">비밀번호</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="input input-bordered"
              placeholder="비밀번호를 입력해주세요."
            />
          </div>

          {/* 로그인 실패 시 에러 메시지 표시 */}
          {errorMessage && (
            <div className="text-red-500 text-center">{errorMessage}</div>
          )}

          <button type="submit" className="btn btn-primary w-full">
            로그인
          </button>
        </form>

        

        <div className="grid grid-cols-1 sm:grid-cols-3 mx-10">
          <button className="btn btn-ghost" onClick={openFindIdModal}>
            아이디 찾기
          </button>
          <button className="btn btn-ghost" onClick={openFindPasswordModal}>
            비밀번호 찾기
          </button>
          <button className="btn btn-ghost" onClick={handleSignUpClick}>
            회원가입
          </button>
        </div>
        <button
          onClick={closeLoginModal}
          className="absolute top-2 right-2 btn btn-ghost"
        >
          ×
        </button>
      </div>

      {/* 아이디 찾기, 비밀번호 찾기 모달 */}
      {/* {isFindIdModalOpen && <FindIdModal />}
      {isFindPasswordModalOpen && <FindPasswordModal />} */}
    </div>
  );
};

export default LoginModal;
