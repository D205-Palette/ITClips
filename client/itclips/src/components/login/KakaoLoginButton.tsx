import React from "react";
import { SiKakaotalk } from "react-icons/si";
import { API_BASE_URL } from "../../config";

const KakaoLoginButton = () => {
  const KAKAO_AUTH_URL = `${API_BASE_URL}/oauth2/authorize/kakao`;

  const loginWithKakao = () => {
    window.open(KAKAO_AUTH_URL, "_blank", "width=500,height=600");
  };

  return (
    <button
      onClick={loginWithKakao}
      type="button"
      className="btn btn-outline bg-base-100 w-3/4"
    >
      <SiKakaotalk className="w-5 h-5 text-yellow-400 bg-black rounded-sm" />
      <p>카카오 로그인</p>
    </button>
  );
};

export default KakaoLoginButton;
