import React from "react";
import { SiNaver } from "react-icons/si";
import { API_BASE_URL } from '../../config';

export default function NaverLoginButton() {  
  const NAVER_AUTH_URL = `${API_BASE_URL}:8084/oauth2/authorize/naver`

  const loginWithNaver = () => {
    window.location.href = NAVER_AUTH_URL;
  };

  return (
    <button
      onClick={loginWithNaver}
      type="button"
      className="btn btn-outline bg-base-100 w-3/4"
    >
      <SiNaver className="w-5 h-5 text-green-500"/>
      <p>네이버 로그인</p>
    </button>
  );
}

