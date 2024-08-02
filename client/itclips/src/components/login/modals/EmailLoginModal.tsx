import React, { useEffect, useState } from "react";
import { navStore } from "../../../stores/navStore";
import { authStore } from "../../../stores/authStore";
import { useNavigate } from "react-router-dom";
import { emailLogin, checkUserInfo } from "../../../api/authApi";

const EmailLoginModal: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setLoginListOpen, setEmailLoginOpen, setPasswordResetOpen } =
    navStore();
  const { login, userInfo, fetchUserInfo, fetchUserToken } = authStore();
  const [errorMessage, setErrorMessage] = useState("");

  const closeEmailLoginModal = () => {
    setEmailLoginOpen(false);
    setLoginListOpen(true);
  };

  // 이메일 로그인 로직
  const handleEmailLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailLogin(email, password)
      .then((response: any) => {
        console.log(response);
        if (response.status === 200) {
          setErrorMessage(""); // 에러 메시지 초기화
          fetchUserToken(response.data.accesstoken); // 로컬 스토리지에 유저 토큰 업데이트
          login(); // 로그인 상태 업데이트

          const userId = response.headers.userid;

          // 유저 정보 가져오기
          return checkUserInfo(email);
        }
        throw new Error("로그인에 실패했습니다.");
      })
      .then((userInfoResponse) => {
        fetchUserInfo(userInfoResponse.data); // 로컬 스토리지에 유저 정보 업데이트
        window.alert(`환영합니다 ${userInfoResponse.data.nickname}님!`);
        navigate(`/user/${userInfoResponse.data.id}`); // 로그인 후 페이지 이동
      })
      .catch((error: any) => {
        console.error(error);
        setErrorMessage("아이디 또는 비밀번호가 잘못되었습니다.");
      });
  };

  const openPasswordResetModal = () => {
    setPasswordResetOpen(true);
    setEmailLoginOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-base-100">
      <div className="border bg-base-100 p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-xl text-center font-bold mb-4">이메일 로그인</h2>

        <form onSubmit={handleEmailLoginSubmit}>
          <label id="email" htmlFor="email" className="label">
            <span className="label-text">아이디</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="이메일을 입력해주세요."
            className="input input-bordered w-full mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="">
            <span className="label-text">비밀번호</span>
          </label>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요."
            className="input input-bordered w-full mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* 로그인 실패 시 에러 메시지 표시 */}
          {errorMessage && (
            <p className="text-red-500 text-center">{errorMessage}</p>
          )}

          <button className="btn btn-primary w-full mb-2" type="submit">
            이메일 로그인
          </button>
        </form>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 ">
          <button className="btn bg-base-100" onClick={openPasswordResetModal}>
            비밀번호 찾기
          </button>

          <button
            className="btn bg-base-100"
            onClick={() => navigate("/signup")}
          >
            회원가입
          </button>
        </div>

        <div className="flex justify-end">
          <button className="btn btn-ghost mt-2" onClick={closeEmailLoginModal}>
            뒤로가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailLoginModal;
