import React from "react";
import GoogleLoginButton from "../components/nav/GoogleLoginButton";
import GithubLoginButton from "../components/nav/GithubLoginButton";
import NaverLoginButton from "../components/nav/NaverLoginButton";

import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  // const showEmailLogin = useAuthStore((state) => state.showEmailLogin);

  const handleEmailLoginClick = () => {
    // showEmailLogin();
    navigate('/login/email');
  }
  return (
    <div className="container mx-auto bg-base-200 border w-2/4">      
      <h2 className="text-3xl font-semibold mb-6 text-center">ITClips</h2>
      <GoogleLoginButton />
      <GithubLoginButton />
      <NaverLoginButton />      
      <div>카카오 로그인</div>

      <button>이메일 로그인</button> <button onClick={handleEmailLoginClick}>Email Login</button>
    </div>
  );
}
