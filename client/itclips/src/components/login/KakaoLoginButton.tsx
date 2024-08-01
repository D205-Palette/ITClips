import React from "react";
import { SiKakaotalk } from "react-icons/si";
import { KAKAO_API_KEY, KAKAO_REDIRECT_URI } from "../../config"
import { useNavigate } from "react-router-dom";

export default function NaverLoginButton() {  
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
  const navigate = useNavigate()

  const loginWithKakao = () => {
    // navigate('https://i11d205.p.ssafy.io/oauth2/authorize/kakao')
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
