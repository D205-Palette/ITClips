import React, { useState } from "react";
import { navStore } from "../../../stores/navStore";
import { useNavigate } from "react-router-dom";
import { emailLogin } from '../../../api/authApi';

const EmailLoginModal: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setLoginListOpen, setEmailLoginOpen, setPasswordResetOpen, login } =
    navStore();
  const [errorMessage, setErrorMessage] = useState("");

  const closeEmailLoginModal = () => {
    setEmailLoginOpen(false);
    setLoginListOpen(true);
  };

  // 이메일 로그인 로직
  const handleEmailLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    emailLogin(email, password)
      .then((response:any) => {
        if (response.status === 200) {
          setErrorMessage(""); // 에러 메시지 초기화
          login();
          navigate("/user/:user_id");
        } else {
          setErrorMessage(
            "아이디 또는 비밀번호가 잘못 되었습니다. 아이디와 비밀번호를 정확히 입력해 주세요."
          );
        }
      })
      .catch((error:any) => {
        // 로그인 실패 시 에러 메시지 설정
        setErrorMessage(error.message || "아이디 또는 비밀번호가 잘못 되었습니다.");
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
