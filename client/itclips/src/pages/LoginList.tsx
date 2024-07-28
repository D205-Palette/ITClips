import React, { useState } from "react";
import GoogleLoginButton from "../components/login/GoogleLoginButton";
import GithubLoginButton from "../components/login/GithubLoginButton";
import NaverLoginButton from "../components/login/NaverLoginButton";
import KakaoLoginButton from "../components/login/KakaoLoginButton";
import { useNavigate } from "react-router-dom";
import EmailLoginModal from "./EmailLoginView";

export default function Login() {
  const [isEmailLoginModal, setIsEmailLoginModal] = useState(false);

  const navigate = useNavigate();

  const handleEmailLoginClick = () => {
    setIsEmailLoginModal(true);
  };
  return (
    <div className="bg-base-100 p-8 rounded-lg shadow-lg flex flex-col justify-content items-center container mx-auto border w-2/4">
      <h2 className="text-3xl font-semibold mb-6 text-center">ITClips</h2>

      <GoogleLoginButton />
      <GithubLoginButton />
      <NaverLoginButton />
      <KakaoLoginButton />

      <button
        onClick={handleEmailLoginClick}
        type="button"
        className="btn bg-base-100 w-3/4"
      >
        이메일 로그인
      </button>

      {isEmailLoginModal && <EmailLoginModal />}
    </div>
  );
}
