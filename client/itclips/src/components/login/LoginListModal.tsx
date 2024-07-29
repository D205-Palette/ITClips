import React from "react";
import { navStore } from "../../stores/navStore";
import GoogleLoginButton from "./GoogleLoginButton";
import GithubLoginButton from "./GithubLoginButton";
import NaverLoginButton from "./NaverLoginButton";
import KakaoLoginButton from "./KakaoLoginButton";
import EmailLoginButton from "./EmailLoginButton";
import EmailLoginModal from "./EmailLoginModal";
import PasswordResetModal from "./PasswordResetModal";

const LoginPage: React.FC = () => {
  const { isEmailLoginOpen, isPasswordResetOpen } = navStore();

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-100">
      <div className="text-center bg-base-100 p-8 rounded-lg shadow-md w-full max-w-md border">
        <h1 className="text-2xl font-bold mb-4">ITClips 로그인</h1>
        <div className="flex flex-col gap-2 items-center justify-center">
          <GoogleLoginButton />
          <GithubLoginButton />
          <NaverLoginButton />
          <KakaoLoginButton />
          <EmailLoginButton />
        </div>
      </div>
      {isEmailLoginOpen && <EmailLoginModal />}
      {isPasswordResetOpen && <PasswordResetModal />}
    </div>
  );
};

export default LoginPage;
