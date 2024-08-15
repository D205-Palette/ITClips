import React from "react";
import { SiKakaotalk } from "react-icons/si";
import { API_BASE_URL } from "../../config";
import kakao_logo from "../../assets/images/kakao_logo.svg"

const KakaoLoginButton = () => {
  const KAKAO_AUTH_URL = `${API_BASE_URL}:8084/oauth2/authorize/kakao`;

  const loginWithKakao = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <button
      onClick={loginWithKakao}
      type="button"
      className="btn btn-outline bg-base-100 w-3/4"
    >      
      <img className="w-8 h-8" src={kakao_logo} alt="" />
      <p>Kakao 로그인</p>
    </button>
  );
};

export default KakaoLoginButton;
