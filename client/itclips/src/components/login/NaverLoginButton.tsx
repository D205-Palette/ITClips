import React from "react";
import { SiNaver } from "react-icons/si";
import { NAVER_API_KEY, NAVER_REDIRECT_URI } from "../../config"

export default function NaverLoginButton() {  
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_API_KEY}&state=randomtext&redirect_uri=${NAVER_REDIRECT_URI}`;

  const loginWithNaver = () => {
    window.open(NAVER_AUTH_URL, "_blank", "width=500,height=600");
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
