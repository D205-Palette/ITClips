import React from "react";
import { SiKakaotalk } from "react-icons/si";

export default function NaverLoginButton() {
  const KAKAO_REDIRECT_URI = "http://localhost:3000/oauth/callback/kakao";
  const KAKAO_REST_API_KEY = "0ffb6325ec02c9bed0743e31418cc885";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

  const loginWithKakao = () => {
    window.open(KAKAO_AUTH_URL, "_blank", "width=500,height=600");
  };

  return (
    <button
      onClick={loginWithKakao}
      type="button"
      className="btn btn-outline bg-base-100 w-3/4"
    >      
      <SiKakaotalk className="w-5 h-5 text-yellow-400 bg-black rounded-sm"/>
      <p>카카오 로그인</p>
    </button>
  );
}
