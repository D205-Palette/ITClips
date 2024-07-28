import React from 'react';
import { navStore } from '../stores/navStore';
import GoogleLoginButton from '../components/login/GoogleLoginButton';
import GithubLoginButton from '../components/login/GithubLoginButton';
import NaverLoginButton from '../components/login/NaverLoginButton';
import KakaoLoginButton from '../components/login/KakaoLoginButton';
import EmailLoginModal from '../components/login/EmailLoginModal';
import PasswordResetModal from '../components/login/PasswordResetModal';

const LoginPage: React.FC = () => {
  const { isEmailLoginOpen, isPasswordResetOpen, toggleEmailLogin } = navStore();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <GoogleLoginButton />
        <GithubLoginButton />
        <NaverLoginButton />
        <KakaoLoginButton />
        <button
          className="btn btn-primary mt-4 w-full"
          onClick={toggleEmailLogin}
        >
          Email Login
        </button>
      </div>
      {isEmailLoginOpen && <EmailLoginModal />}
      {isPasswordResetOpen && <PasswordResetModal />}
    </div>
  );
};

export default LoginPage;
